import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import bezienswaardighedenRoutes from "./routes/bezienswaardigheden.js";

dotenv.config();

//creates the server
const app = express();

//makes it so that react can communicate with backend
app.use(cors());
//Gives express glasses to read braille
app.use(express.json());

app.use("/api/bezienswaardigheden", bezienswaardighedenRoutes);

//test route to see if backend is working
app.get("/api/pizza", (req, res) => {
    res.json({
        message: "Backend is working!"
    });
});

app.get("/api/database-test", async (req, res) => {
    try {
        const [result] = await db.query("SELECT 1");

        res.json({
            message: "Database connected!",
            result
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Database connection failed"
        });
    }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});