import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Note, NoteCategory } from '../types';

const INITIAL_NOTES: Note[] = [
  {
    id: '1',
    category: 'action',
    title: 'Finalize UI kit for mobile',
    content: 'Sarah will complete the migration of all legacy components to the new 4px grid system by Oct 28.',
    priority: 'high',
    assignee: 'Sarah Jenkins',
    dueDate: 'Oct 28',
    createdAt: Date.now() - 3600000 * 24,
  },
  {
    id: '2',
    category: 'action',
    title: 'Refine API documentation',
    content: 'Marcus needs to update the developer portal with the new authentication endpoints before end of sprint.',
    priority: 'medium',
    assignee: 'Marcus Chen',
    dueDate: 'Oct 31',
    createdAt: Date.now() - 3600000 * 20,
  },
  {
    id: '3',
    category: 'decision',
    title: 'Cloud Vendor: AWS Selected',
    content: 'Unanimous agreement to proceed with AWS for infrastructure scaling. This decision was finalized after comparing costs with GCP.',
    createdAt: Date.now() - 3600000 * 48,
  },
  {
    id: '4',
    category: 'decision',
    title: 'Bi-weekly Release Schedule',
    content: 'We decided on bi-weekly sprints with feature flags for all new experimental modules. Approved by the entire eng team.',
    createdAt: Date.now() - 3600000 * 46,
  },
  {
    id: '5',
    category: 'problem',
    title: 'DB Latency in Production',
    content: 'PostgreSQL queries are exceeding 200ms during peak load, affecting dashboard refresh rates. Blocking the mobile release.',
    type: 'Tech Blocker',
    reportedBy: 'Elena Glass',
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: '6',
    category: 'discussion',
    title: 'Should we reconsider sidebar navigation on tablets?',
    content: 'User feedback from the latest beta suggests the sidebar takes up too much real estate on 10-inch screens. We explored moving to a bottom nav or collapsible rail. Several trade-offs were discussed.',
    author: 'Aria Stark',
    votes: 14,
    replies: 8,
    createdAt: Date.now() - 3600000 * 3,
  },
];

interface NotesContextValue {
  notes: Note[];
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  getByCategory: (category: NoteCategory) => Note[];
}

const NotesContext = createContext<NotesContextValue | null>(null);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const saved = localStorage.getItem('debrief_notes');
      return saved ? JSON.parse(saved) : INITIAL_NOTES;
    } catch {
      return INITIAL_NOTES;
    }
  });

  useEffect(() => {
    localStorage.setItem('debrief_notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = useCallback((note: Note) => {
    setNotes(prev => [note, ...prev]);
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  }, []);

  const getByCategory = useCallback((category: NoteCategory) => {
    return notes.filter(n => n.category === category);
  }, [notes]);

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, getByCategory }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotes must be used within NotesProvider');
  return ctx;
};
