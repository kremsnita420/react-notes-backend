import mongoose from 'mongoose';
const { Schema, model, models } = mongoose

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    userId: {
        type: String
    }
});

const Note = models.Note || model("Note", NoteSchema);

export default Note;