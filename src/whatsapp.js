import wppconnect from "@wppconnect-team/wppconnect";

let client = null;

export async function initializeWhatsApp() {
  client = await wppconnect.create({
    session: "leetcode-bot",

    // EC2 has no graphical display
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
    },

    puppeteerOptions: {
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-first-run",
        "--no-zygote",
        "--single-process"
      ]
    }
  });

  console.log("✅ WhatsApp Connected");
}

export function getClient() {
  return client;
}