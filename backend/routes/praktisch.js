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


router.post("/", async (req, res) => {
    const { section, label, value, user_id } = req.body;

    if (!section || !label || !value || !user_id) {
        return res.status(400).json({
            message: "Vul alle verplichte velden in."
        });
    }

    try {
        await db.query(`
            INSERT INTO praktisch
                (section, label, value, user_id)
            VALUES
                (?, ?, ?, ?)
        `, [
            section,
            label,
            value,
            user_id
        ]);

        res.status(201).json({
            message: "Praktische informatie toegevoegd."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Toevoegen mislukt."
        });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { section, label, value, user_id } = req.body;

    try {
        await db.query(`
            UPDATE praktisch
            SET
                section = ?,
                label = ?,
                value = ?,
                user_id = ?
            WHERE id = ?
        `, [
            section,
            label,
            value,
            user_id,
            id
        ]);

        res.json({
            message: "Praktische informatie gewijzigd."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Wijzigen mislukt."
        });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await db.query(`
            DELETE FROM praktisch
            WHERE id = ?
        `, [id]);

        res.json({
            message: "Praktische informatie verwijderd."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Verwijderen mislukt."
        });
    }
});

export default router;