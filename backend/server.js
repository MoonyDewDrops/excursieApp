import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import bezienswaardighedenRoutes from "./routes/bezienswaardigheden.js";
import activiteitenRoutes from "./routes/activiteiten.js";
import praktischRoutes from "./routes/praktisch.js";

dotenv.config();

//creates the server
const app = express();

//makes it so that react can communicate with backend
app.use(cors());
//Gives express glasses to read braille (see the json)
app.use(express.json());

app.use("/api/bezienswaardigheden", bezienswaardighedenRoutes);
app.use("/api/activiteiten", activiteitenRoutes);
app.use("/api/praktisch", praktischRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});