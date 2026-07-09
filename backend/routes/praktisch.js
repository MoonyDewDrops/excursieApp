import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                praktisch.*,
                gebruikers.name AS name
            FROM praktisch
            JOIN gebruikers
            ON praktisch.user_id = gebruikers.id
        `);

        res.json(rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Kon praktische informatie niet ophalen"
        });
    }
});

export default router;