import wppconnect from "@wppconnect-team/wppconnect";

let client = null;
let reconnecting = false;

export async function initializeWhatsApp() {
  if (reconnecting) return;

  reconnecting = true;

  try {
    console.log("🔄 Initializing WhatsApp...");

    client = await wppconnect.create({
      session: "leetcode-bot",

      headless: true,
      useChrome: true,
      debug: false,

      catchQR: (base64Qr, asciiQR) => {
        console.clear();
        console.log(asciiQR);
        console.log("📱 Scan the QR code above with WhatsApp.");
      },

      statusFind: (status) => {
        console.log("WhatsApp Status:", status);

        if (status === "browserClose") {
          console.log("⚠️ WhatsApp browser closed.");
          client = null;

          setTimeout(() => {
            reconnecting = false;
            initializeWhatsApp();
          }, 5000);
        }
      },

      puppeteerOptions: {
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
          "--no-first-run",
          "--no-zygote"
        ]
      }
    });

    console.log("✅ WhatsApp Connected");
    reconnecting = false;

  } catch (error) {
    console.error("❌ WhatsApp initialization failed:", error);

    client = null;
    reconnecting = false;

    setTimeout(() => {
      initializeWhatsApp();
    }, 10000);
  }
}

export function getClient() {
  return client;
}
