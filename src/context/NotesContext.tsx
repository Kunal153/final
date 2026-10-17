import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Note, NoteCategory } from '../types';
import { INITIAL_NOTES } from '../data/seedNotes';
import { useAuth } from './AuthContext';
import { removeOriginalFile, clearAllOriginalFiles } from '../utils/fileStorage';

interface NotesContextType {
  notes: Note[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedBranch: string;
  setSelectedBranch: (b: string) => void;
  selectedSemester: number | null;
  setSelectedSemester: (s: number | null) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  sortBy: 'popular' | 'upvotes' | 'newest' | 'pages';
  setSortBy: (s: 'popular' | 'upvotes' | 'newest' | 'pages') => void;
  filteredNotes: Note[];
  addNote: (noteData: Partial<Note>) => Note;
  toggleUpvote: (noteId: string) => void;
  recordDownload: (noteId: string) => void;
  rateNote: (noteId: string, ratingValue: number) => void;
  deleteNote: (noteId: string) => void;
  deleteAllUploadedNotes: () => void;
  restoreDefaultNotes: () => void;
  resetFilters: () => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, updateProfile } = useAuth();

  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      localStorage.removeItem('enginotes_data_v3');
      localStorage.removeItem('enginotes_data_v2');
      const deletedJson = localStorage.getItem('enginotes_deleted_v4');
      const deletedIds: string[] = deletedJson ? JSON.parse(deletedJson) : [];

      const stored = localStorage.getItem('enginotes_data_v4');
      if (stored) {
        const parsed: Note[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const initialAvailable = INITIAL_NOTES.filter((inNote) => !deletedIds.includes(inNote.id));
          const userCustomNotes = parsed.filter(
            (pn) => !INITIAL_NOTES.some((inNote) => inNote.id === pn.id) && !deletedIds.includes(pn.id)
          );
          return [...initialAvailable, ...userCustomNotes];
        }
      }
      return INITIAL_NOTES.filter((inNote) => !deletedIds.includes(inNote.id));
    } catch {
      // fallback
    }
    return INITIAL_NOTES;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState<'popular' | 'upvotes' | 'newest' | 'pages'>('popular');

  // Persist notes safely
  useEffect(() => {
    try {
      // Exclude giant base64 data URLs from localStorage to prevent QuotaExceededError
      const safeNotesToStore = notes.map((n) => {
        if (n.fileDataUrl && n.fileDataUrl.length > 100000) {
          const { fileDataUrl, ...rest } = n;
          return rest;
        }
        return n;
      });
      localStorage.setItem('enginotes_data_v4', JSON.stringify(safeNotesToStore));
    } catch {
      // ignore quota limits
    }
  }, [notes]);

  const addNote = (noteData: Partial<Note>): Note => {
    const newNote: Note = {
      id: 'note-' + Date.now(),
      title: noteData.title || 'Untitled Engineering Notes',
      subject: noteData.subject || 'General Engineering',
      branch: noteData.branch || 'CSE',
      semester: noteData.semester || 1,
      category: (noteData.category as NoteCategory) || 'Lecture Notes',
      description: noteData.description || 'Uploaded study materials and notes.',
      author: noteData.author || {
        id: user?.id || 'anon',
        name: user?.name || 'Anonymous Contributor',
        college: user?.college || 'Engineering College',
        avatarUrl: user?.avatar,
        verified: user?.role === 'topper' || user?.role === 'educator',
        role: user?.role === 'topper' ? 'Topper' : 'Student Contributor'
      },
      fileName: noteData.fileName || 'Notes_Document.pdf',
      fileSize: noteData.fileSize || '4.2 MB',
      pages: noteData.pages || 12,
      format: noteData.format || 'pdf',
      downloads: 0,
      upvotes: 0,
      isVerified: true,
      isFeatured: false,
      isUserUploaded: true,
      tags: noteData.tags && noteData.tags.length > 0 ? noteData.tags : ['Notes', noteData.branch || 'CSE'],
      createdAt: new Date().toISOString().split('T')[0],
      syllabusUnitsCovered: noteData.syllabusUnitsCovered || ['Unit 1', 'Unit 2'],
      previewPages: noteData.previewPages && noteData.previewPages.length > 0
        ? noteData.previewPages
        : [
            {
              pageNumber: 1,
              title: `${noteData.title || 'Notes'} - Overview`,
              content: noteData.description || 'Comprehensive notes and exam revision material.',
              keyPoints: [
                'Key definitions and formulas',
                'Worked examples and university question solutions',
                'Quick revision summaries for semester exams'
              ]
            }
          ]
    };

    setNotes((prev) => [newNote, ...prev]);

    // Update user's uploaded list & reputation points
    if (user) {
      updateProfile({
        uploadedNoteIds: [...user.uploadedNoteIds, newNote.id],
        reputationPoints: user.reputationPoints + 50
      });
    }

    return newNote;
  };

  const toggleUpvote = (noteId: string) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id !== noteId) return n;
        const isUpvoted = user?.upvotedNoteIds.includes(noteId);
        return {
          ...n,
          upvotes: isUpvoted ? Math.max(0, n.upvotes - 1) : n.upvotes + 1
        };
      })
    );

    if (user) {
      const isUpvoted = user.upvotedNoteIds.includes(noteId);
      const newUpvoted = isUpvoted
        ? user.upvotedNoteIds.filter((id) => id !== noteId)
        : [...user.upvotedNoteIds, noteId];
      updateProfile({ upvotedNoteIds: newUpvoted });
    }
  };

  const recordDownload = (noteId: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, downloads: n.downloads + 1 } : n))
    );

    if (user && !user.downloadedNoteIds.includes(noteId)) {
      updateProfile({
        downloadedNoteIds: [...user.downloadedNoteIds, noteId]
      });
    }
  };

  const rateNote = (noteId: string, ratingValue: number) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id !== noteId) return n;
        const currentRating = n.rating ?? 5.0;
        const currentCount = n.reviewsCount ?? 0;
        const totalScore = currentRating * currentCount + ratingValue;
        const newCount = currentCount + 1;
        return {
          ...n,
          rating: Number((totalScore / newCount).toFixed(2)),
          reviewsCount: newCount
        };
      })
    );
  };

  const deleteNote = (noteId: string) => {
    // 1. Record ID in deleted list so it stays deleted even after reload
    try {
      const deletedJson = localStorage.getItem('enginotes_deleted_v4');
      const deletedIds: string[] = deletedJson ? JSON.parse(deletedJson) : [];
      if (!deletedIds.includes(noteId)) {
        deletedIds.push(noteId);
        localStorage.setItem('enginotes_deleted_v4', JSON.stringify(deletedIds));
      }
    } catch {
      // ignore
    }

    // 2. Remove binary file from IndexedDB & memory cache
    removeOriginalFile(noteId);

    // 3. Remove from active notes state
    setNotes((prev) => prev.filter((n) => n.id !== noteId));

    // 4. Update user lists if authenticated
    if (user) {
      updateProfile({
        uploadedNoteIds: user.uploadedNoteIds.filter((id) => id !== noteId),
        savedNoteIds: user.savedNoteIds.filter((id) => id !== noteId),
        downloadedNoteIds: user.downloadedNoteIds.filter((id) => id !== noteId)
      });
    }
  };

  const deleteAllUploadedNotes = () => {
    // Identify all uploaded or custom notes
    const uploaded = notes.filter(
      (n) =>
        n.isUserUploaded === true ||
        !INITIAL_NOTES.some((inNote) => inNote.id === n.id) ||
        (user && (n.author.id === user.id || user.uploadedNoteIds.includes(n.id)))
    );
    const uploadedIds = uploaded.map((n) => n.id);

    try {
      const deletedJson = localStorage.getItem('enginotes_deleted_v4');
      const deletedIds: string[] = deletedJson ? JSON.parse(deletedJson) : [];
      const updatedDeleted = Array.from(new Set([...deletedIds, ...uploadedIds]));
      localStorage.setItem('enginotes_deleted_v4', JSON.stringify(updatedDeleted));
    } catch {
      // ignore
    }

    // Clean up all IndexedDB files
    uploadedIds.forEach((id) => {
      removeOriginalFile(id);
    });

    // Update notes state
    setNotes((prev) => prev.filter((n) => !uploadedIds.includes(n.id)));

    // Clean up user profile
    if (user) {
      updateProfile({
        uploadedNoteIds: user.uploadedNoteIds.filter((id) => !uploadedIds.includes(id)),
        savedNoteIds: user.savedNoteIds.filter((id) => !uploadedIds.includes(id)),
        downloadedNoteIds: user.downloadedNoteIds.filter((id) => !uploadedIds.includes(id))
      });
    }
  };

  const restoreDefaultNotes = () => {
    try {
      localStorage.removeItem('enginotes_deleted_v4');
      localStorage.removeItem('enginotes_data_v4');
      localStorage.removeItem('enginotes_deleted_v3');
      localStorage.removeItem('enginotes_data_v3');
      clearAllOriginalFiles();
    } catch {
      // ignore
    }
    setNotes(INITIAL_NOTES);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedBranch('ALL');
    setSelectedSemester(null);
    setSelectedCategory('ALL');
    setSortBy('popular');
  };

  const filteredNotes = useMemo(() => {
    let result = [...notes];

    // Branch filter
    if (selectedBranch && selectedBranch !== 'ALL') {
      result = result.filter(
        (n) => n.branch.toUpperCase() === selectedBranch.toUpperCase()
      );
    }

    // Semester filter
    if (selectedSemester !== null) {
      result = result.filter((n) => n.semester === selectedSemester);
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'ALL') {
      result = result.filter((n) => n.category === selectedCategory);
    }

    // Search query filter (search across title, subject, branch, tags, author, description)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.subject.toLowerCase().includes(q) ||
          n.branch.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q) ||
          n.author.name.toLowerCase().includes(q) ||
          n.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'popular') {
      result.sort((a, b) => b.downloads - a.downloads);
    } else if (sortBy === 'upvotes') {
      result.sort((a, b) => b.upvotes - a.upvotes);
    } else if (sortBy === 'newest') {
      result.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortBy === 'pages') {
      result.sort((a, b) => b.pages - a.pages);
    }

    return result;
  }, [notes, selectedBranch, selectedSemester, selectedCategory, searchQuery, sortBy]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        searchQuery,
        setSearchQuery,
        selectedBranch,
        setSelectedBranch,
        selectedSemester,
        setSelectedSemester,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        filteredNotes,
        addNote,
        toggleUpvote,
        recordDownload,
        rateNote,
        deleteNote,
        deleteAllUploadedNotes,
        restoreDefaultNotes,
        resetFilters
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
