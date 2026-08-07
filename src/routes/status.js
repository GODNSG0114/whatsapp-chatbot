import express from "express";
import { getClient } from "../whatsapp.js";

const router = express.Router();

router.get("/", async (req, res) => {

    const client = getClient();

    if (!client) {
        return res.status(500).json({
            connected: false
        });
    }

    res.json({
        connected: true
    });

});

export default router;