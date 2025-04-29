import React from 'react';
import { Trash2 } from 'lucide-react';
import { Note } from '../types';

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => Promise<void>;
  isDeleting: boolean;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete, isDeleting }) => {
  const formattedDate = new Date(note.createdAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 transition-all duration-300 hover:shadow-md border border-gray-100">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-gray-800 mb-2">{note.title}</h3>
        <button
          onClick={() => onDelete(note._id)}
          disabled={isDeleting}
          className="text-gray-500 hover:text-red-600 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
          aria-label="Delete note"
        >
          {isDeleting ? (
            <svg className="animate-spin h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <Trash2 className="h-5 w-5" />
          )}
        </button>
      </div>
      
      <div className="text-gray-600 whitespace-pre-wrap mb-3 text-sm">
        {note.content}
      </div>
      
      <div className="text-xs text-gray-500 border-t pt-2 mt-2 border-gray-100">
        {formattedDate}
      </div>
    </div>
  );
};

export default NoteItem;