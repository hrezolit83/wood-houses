// Simple in-memory rate limiter
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // max requests per window per IP

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now - record.start > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { start: now, count: 1 });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) return false;
  record.count++;
  return true;
}

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimit) {
    if (now - record.start > RATE_LIMIT_WINDOW) rateLimit.delete(ip);
  }
}, RATE_LIMIT_WINDOW);

function sanitize(str) {
  if (typeof str !== "string") return "";
  return str.replace(/[<>&]/g, "").trim();
}

async function notifyError(botToken, chatId, errorText) {
  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `⚠️ Помилка на сайті:\n${errorText}`,
      }),
    });
  } catch {
    // не блокуємо основний потік
  }
}

export async function POST(req) {
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: "Забагато запитів. Спробуйте пізніше." }),
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const ADMIN_CHAT = process.env.TELEGRAM_CHAT_ID_1;

  try {
    const data = await req.json();

    const name = sanitize(data.name);
    const phone = sanitize(data.phone);
    const message = sanitize(data.message).slice(0, 1000);

    if (!name || name.length > 100) {
      return new Response(
        JSON.stringify({ error: "Невалідне ім'я" }),
        { status: 400 },
      );
    }

    if (!phone || !/^\+?[0-9\s\-()]{10,20}$/.test(phone)) {
      return new Response(
        JSON.stringify({ error: "Невалідний номер телефону" }),
        { status: 400 },
      );
    }

    const CHAT_IDS = [
      process.env.TELEGRAM_CHAT_ID_1, // Vitaliy
      process.env.TELEGRAM_CHAT_ID_2, // Volodymyr
      process.env.TELEGRAM_CHAT_ID_3, // Vadym
    ].filter(Boolean);

    if (!BOT_TOKEN || CHAT_IDS.length === 0) {
      const err = "Telegram not configured: missing BOT_TOKEN or CHAT_IDS";
      console.error(err);
      return new Response(
        JSON.stringify({ error: "Сервіс тимчасово недоступний" }),
        { status: 503 },
      );
    }

    const telegramText =
      `Нова заявка з сайту:\n` +
      `Ім'я: ${name}\n` +
      `Телефон: ${phone}\n` +
      `Повідомлення: ${message || "—"}`;

    // Надсилаємо всім чатам одночасно
    const results = await Promise.all(
      CHAT_IDS.map(async (id) => {
        const response = await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: id,
              text: telegramText,
            }),
          },
        );

        const result = await response.json();

        if (!result.ok) {
          console.error("Telegram error for chat", id, result);
        }

        return result;
      }),
    );

    const delivered = results.filter((r) => r.ok);
    const failed = results.filter((r) => !r.ok);

    if (failed.length > 0) {
      const failedDetails = failed
        .map((r) => `${r.description} (код: ${r.error_code || "?"})`)
        .join("\n");
      const status =
        delivered.length === 0
          ? `Заявку НЕ доставлено нікому!`
          : `Заявку доставлено ${delivered.length}/${results.length} учасникам`;
      await notifyError(
        BOT_TOKEN,
        ADMIN_CHAT,
        `${status}\nДані: ${name}, ${phone}\nПомилки:\n${failedDetails}\n\nПорада: учасники мають натиснути /start у чаті з ботом`,
      );
    }

    if (delivered.length === 0) {
      return new Response(
        JSON.stringify({ error: "Не вдалося надіслати повідомлення" }),
        { status: 502 },
      );
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    await notifyError(
      BOT_TOKEN,
      ADMIN_CHAT,
      `Критична помилка в /api/lead:\n${err.message}`,
    );
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
