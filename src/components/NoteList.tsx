import React from 'react';
import NoteItem from './NoteItem';
import { Note } from '../types';
import { FileX2 } from 'lucide-react';

interface NoteListProps {
  notes: Note[];
  isLoading: boolean;
  onDeleteNote: (id: string) => Promise<void>;
  deletingNoteId: string | null;
}

const NoteList: React.FC<NoteListProps> = ({ 
  notes, 
  isLoading, 
  onDeleteNote,
  deletingNoteId 
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="animate-pulse flex space-x-2 mb-4">
          <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
          <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
          <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
        </div>
        <p className="text-gray-500">Loading notes...</p>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-500">
        <FileX2 size={48} className="mb-4 text-gray-400" />
        <p className="text-xl font-medium mb-2">No notes yet</p>
        <p className="text-sm">Create your first note above to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteItem
          key={note._id}
          note={note}
          onDelete={onDeleteNote}
          isDeleting={deletingNoteId === note._id}
        />
      ))}
    </div>
  );
};

export default NoteList;