import React, { useEffect, useState } from 'react';
import { fetchNotes, createNote, deleteNote } from './services/api';
import { Note } from './types';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { StickyNote } from 'lucide-react';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch notes on component mount
  useEffect(() => {
    const loadNotes = async () => {
      try {
        setIsLoading(true);
        const data = await fetchNotes();
        setNotes(data);
        setError(null);
      } catch (err) {
        setError('Failed to load notes. Please try again later.');
        console.error('Error loading notes:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();
  }, []);

  // Handle note creation
  const handleAddNote = async (noteData: { title: string; content: string }) => {
    try {
      setIsSubmitting(true);
      const newNote = await createNote(noteData);
      setNotes((prevNotes) => [newNote, ...prevNotes]);
      setError(null);
    } catch (err) {
      setError('Failed to create note. Please try again.');
      throw err; // Re-throw to be caught by the form component
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle note deletion
  const handleDeleteNote = async (id: string) => {
    try {
      setDeletingNoteId(id);
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete note. Please try again.');
      console.error('Error deleting note:', err);
    } finally {
      setDeletingNoteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-teal-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center">
            <StickyNote className="h-8 w-8 mr-3" />
            <h1 className="text-2xl font-bold">Mini Notes</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        )}

        <NoteForm onAddNote={handleAddNote} isLoading={isSubmitting} />

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Notes
          </h2>
          <NoteList 
            notes={notes} 
            isLoading={isLoading} 
            onDeleteNote={handleDeleteNote}
            deletingNoteId={deletingNoteId}
          />
        </div>
      </main>

      <footer className="bg-gray-100 py-4 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Mini Notes App
        </div>
      </footer>
    </div>
  );
}

export default App;