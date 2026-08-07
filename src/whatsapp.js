import wppconnect from "@wppconnect-team/wppconnect";

let client = null;

export async function initializeWhatsApp() {

    client = await wppconnect.create({

        session: "leetcode-bot",

        headless: false,

        useChrome: true,

        debug: false,

        catchQR: (base64Qr, asciiQR) => {

            console.log(asciiQR);

        },

        statusFind: (status) => {

            console.log("Status:", status);

        }

    });

    console.log("✅ WhatsApp Connected");
}

export function getClient() {
    return client;
}