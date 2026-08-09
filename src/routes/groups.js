import express from "express";
import { getClient } from "../whatsapp.js";

const router = express.Router();

router.get("/", async (req, res) => {

    try {

        const client = getClient();

        const chats = await client.listChats();

        const groups = chats.filter(chat => chat.isGroup);

        res.json(groups);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

export default router;
