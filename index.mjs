import dotenv from "dotenv";
import cors from "cors";
import express, { json, urlencoded } from "express";
import connectDB from "./connectDB.mjs";
import Note from "./models/Note.mjs";

const PORT = process.env.PORT || 8000
const app = express()
dotenv.config()
app.use(cors());
app.use(json())
app.use(urlencoded({ extended: true }))
connectDB()

app.get("/", (req, res) => {
    res.json("Hello from server!");
});

// GET all notes
app.get("/api/notes", async (req, res) => {
    try {
        const data = await Note.find({});

        if (!data) {
            throw new Error("An error occurred while fetching notes.");
        }

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching notes..." });
    }
});

// GET note by id
app.get("/api/notes/:id", async (req, res) => {
    const noteId = req.params.id
    try {
        const data = await Note.findById(noteId);

        if (!data) {
            throw new Error("An error occurred while fetching notes.");
        }

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching notes..." });
    }
});

// POST a note
app.post("/api/notes", async (req, res) => {
    try {
        const { title, description } = req.body
        const data = await Note.create({ title, description });
        if (!data) {
            throw new Error("An error occurred while creating a note.");
        }

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating a notes..." });
    }
});

// UPDATE a note
app.put("/api/notes/:id", async (req, res) => {
    const noteId = req.params.id
    try {
        const { title, description } = req.body
        const data = await Note.findByIdAndUpdate(noteId, { title, description });
        if (!data) {
            throw new Error("An error occurred while updating a note.");
        }

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating a notes..." });
    }
});

// DELETE a note
app.delete("/api/notes/:id", async (req, res) => {
    const noteId = req.params.id
    try {
        const { title, description } = req.body
        const data = await Note.findByIdAndDelete(noteId);
        if (!data) {
            throw new Error("An error occurred while deleting a note.");
        }

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting a notes..." });
    }
});

app.get("*", (req, res) => {
    res.sendStatus("404");
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})