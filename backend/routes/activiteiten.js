import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                activiteiten.*,
                gebruikers.name AS name
            FROM activiteiten
            JOIN gebruikers
            ON activiteiten.user_id = gebruikers.id
        `);

        res.json(rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Kon activiteiten niet ophalen"
        });
    }
});

router.post("/", async (req, res) => {
    const { title, description, image, time, user_id } = req.body;

    if (!title || !description || !time || !user_id) {
        return res.status(400).json({
            message: "Vul alle verplichte velden in."
        });
    }

    try {
        await db.query(`
            INSERT INTO activiteiten
                (title, description, image, time, user_id)
            VALUES
                (?, ?, ?, ?, ?)
        `, [
            title,
            description,
            image,
            time,
            user_id
        ]);

        res.status(201).json({
            message: "Activiteit toegevoegd."
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
    const { title, description, image, time, user_id } = req.body;

    try {
        await db.query(`
            UPDATE activiteiten
            SET
                title = ?,
                description = ?,
                image = ?,
                time = ?,
                user_id = ?
            WHERE id = ?
        `, [
            title,
            description,
            image,
            time,
            user_id,
            id
        ]);

        res.json({
            message: "Activiteit gewijzigd."
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
            DELETE FROM activiteiten
            WHERE id = ?
        `, [id]);

        res.json({
            message: "Activiteit verwijderd."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Verwijderen mislukt."
        });
    }
});

export default router;