import axios from 'axios';
import { Note } from '../types';

const API_URL = 'http://localhost:5000';

// Create API instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all notes
export const fetchNotes = async (): Promise<Note[]> => {
  try {
    const response = await api.get('/notes');
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

// Create a new note
export const createNote = async (noteData: { title: string; content: string }): Promise<Note> => {
  try {
    const response = await api.post('/notes', noteData);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

// Delete a note
export const deleteNote = async (id: string): Promise<void> => {
  try {
    await api.delete(`/notes/${id}`);
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};