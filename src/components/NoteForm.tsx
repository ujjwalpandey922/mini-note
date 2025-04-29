import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface NoteFormProps {
  onAddNote: (noteData: { title: string; content: string }) => Promise<void>;
  isLoading: boolean;
}

const NoteForm: React.FC<NoteFormProps> = ({ onAddNote, isLoading }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }
    
    setError('');
    
    try {
      await onAddNote({ title, content });
      // Reset form after successful submission
      setTitle('');
      setContent('');
    } catch (error) {
      setError('Failed to add note. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Note</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
            placeholder="Note title"
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors min-h-[100px]"
            placeholder="Write your note here..."
            disabled={isLoading}
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-70"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </span>
          ) : (
            <span className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Note
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;