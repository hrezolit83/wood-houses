export async function POST(req) {
  try {
    const data = await req.json();

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_IDS = [
      process.env.TELEGRAM_CHAT_ID_1, // Vitaliy
      process.env.TELEGRAM_CHAT_ID_2, // Vadim
    ];

    const message = `
  Нова заявка з сайту:
  Ім'я: ${data.name}
  Телефон: ${data.phone}
  Повідомлення: ${data.message || "-"}
      `;

    // Надсилаємо всім чатам одночасно
    await Promise.all(
      CHAT_IDS.map((id) =>
        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: id, text: message }),
        })
      )
    );

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
