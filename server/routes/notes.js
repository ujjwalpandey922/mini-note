import express from 'express';
import { Note } from '../models/Note.js';

const router = express.Router();

// GET all notes (sorted by createdAt descending)
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new note
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  
  try {
    const newNote = new Note({
      title,
      content,
      createdAt: new Date()
    });
    
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a note
router.delete('/:id', async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const notesRouter = router;