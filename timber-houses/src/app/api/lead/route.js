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
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const ADMIN_CHAT = process.env.TELEGRAM_CHAT_ID_1;

  try {
    const data = await req.json();

    const name = data.name?.trim();
    const phone = data.phone?.trim();

    if (!name || !phone) {
      return new Response(
        JSON.stringify({ error: "Ім'я та телефон обов'язкові" }),
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

    const message =
      `Нова заявка з сайту:\n` +
      `Ім'я: ${name}\n` +
      `Телефон: ${phone}\n` +
      `Повідомлення: ${data.message?.trim() || "—"}`;

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
              text: message,
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

    const delivered = results.some((r) => r.ok);

    if (!delivered) {
      const failed = results.map((r) => r.description).join("; ");
      await notifyError(
        BOT_TOKEN,
        ADMIN_CHAT,
        `Заявку не доставлено жодному учаснику.\nДані: ${name}, ${phone}\nПомилки: ${failed}`,
      );
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
