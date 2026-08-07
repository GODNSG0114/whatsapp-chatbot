import express from "express";
import { getClient } from "../whatsapp.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {

        const { chatId, message } = req.body;

        if (!chatId || !message) {
            return res.status(400).json({
                success: false,
                message: "chatId and message are required"
            });
        }

        const client = getClient();

        await client.sendText(
            chatId,
            message
        );

        res.json({
            success: true,
            message: "Message sent"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });

    }
});

export default router;