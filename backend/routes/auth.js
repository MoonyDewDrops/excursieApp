import express from "express";
import db from "../db.js";
import bcrypt from "bcrypt";

const router = express.Router();
router.post("/login", async (req, res) => {

    const { email, password } = req.body;
    try {

        const [users] = await db.query(
            "SELECT * FROM gebruikers WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: "Gebruiker bestaat niet"
            });
        }

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({
                message: "Verkeerd wachtwoord"
            });
        }

        res.json({
            id: user.id,
            name: user.name,
            email: user.email
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error"
        });
    }
});

export default router;