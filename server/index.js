import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { notesRouter } from './routes/notes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://ujjwalpandey922:ujjwalpandey922@cluster0.jqs5pye.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/notes', notesRouter);

// Health Check
app.get('/', (req, res) => {
  res.send('Mini Notes API is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});