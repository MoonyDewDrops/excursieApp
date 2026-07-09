import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                bezienswaardigheden.*,
                gebruikers.name AS name
            FROM bezienswaardigheden
            JOIN gebruikers
            ON bezienswaardigheden.user_id = gebruikers.id
        `);

        res.json(rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Kon bezienswaardigheden niet ophalen"
        });
    }
});

export default router;