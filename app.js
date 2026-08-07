import express from "express";
import dotenv from "dotenv";

import { initializeWhatsApp } from "./src/whatsapp.js";

import sendRoute from "./src/routes/send.js";
import groupsRoute from "./src/routes/groups.js";
import statusRoute from "./src/routes/status.js";

dotenv.config();

const app = express();

app.use(express.json());

await initializeWhatsApp();

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "WhatsApp API Running 🚀"
    });
});

app.use("/send", sendRoute);
app.use("/groups", groupsRoute);
app.use("/status", statusRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});