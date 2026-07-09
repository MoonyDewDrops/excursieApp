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

router.post("/", async (req, res) => {
    const { title, description, image, location, user_id } = req.body;

    if (!title || !description || !location || !user_id) {
        return res.status(400).json({
            message: "Vul alle verplichte velden in."
        });
    }

    try {
        await db.query(`
            INSERT INTO bezienswaardigheden
                (title, description, image, location, user_id)
            VALUES
                (?, ?, ?, ?, ?)
        `, [
            title,
            description,
            image,
            location,
            user_id
        ]);

        res.status(201).json({
            message: "Bezienswaardigheid toegevoegd."
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
    const { title, description, image, location, user_id } = req.body;

    try {
        await db.query(`
            UPDATE bezienswaardigheden
            SET
                title = ?,
                description = ?,
                image = ?,
                location = ?,
                user_id = ?
            WHERE id = ?
        `, [
            title,
            description,
            image,
            location,
            user_id,
            id
        ]);

        res.json({
            message: "Bezienswaardigheid gewijzigd."
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
            DELETE FROM bezienswaardigheden
            WHERE id = ?
        `, [id]);

        res.json({
            message: "Bezienswaardigheid verwijderd."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Verwijderen mislukt."
        });
    }
});

export default router;