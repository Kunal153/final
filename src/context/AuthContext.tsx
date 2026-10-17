import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { validateMobileNumber, validateName, cleanMobileNumber } from '../utils/mobileValidator';

interface LoginCredentials {
  name: string;
  mobileNumber: string;
  branch: string;
  semester?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginWithMobile: (data: LoginCredentials) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isBookmarkSaved: (noteId: string) => boolean;
  toggleUserBookmark: (noteId: string) => void;
  recordNoteDownload: (noteId: string) => void;
}

const STORAGE_KEY = 'enginotes_student_session_v1';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      // Clear any outdated fake demo sessions
      localStorage.removeItem('enginotes_user');
      localStorage.removeItem('enginotes_user_v4');

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.name && parsed.mobileNumber) {
          return parsed;
        }
      }
    } catch {
      // ignore JSON parse error
    }
    // Strictly null by default — user MUST log in through the front login page!
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const loginWithMobile = (data: LoginCredentials): { success: boolean; error?: string } => {
    // 1. Validate Name
    const nameValidation = validateName(data.name);
    if (!nameValidation.isValid) {
      return { success: false, error: nameValidation.error };
    }

    // 2. Validate Mobile (Strict check against sequences like 1234567890, dummy patterns, etc.)
    const mobileValidation = validateMobileNumber(data.mobileNumber);
    if (!mobileValidation.isValid) {
      return { success: false, error: mobileValidation.error };
    }

    // 3. Clean cleaned mobile
    const cleanedNumber = cleanMobileNumber(data.mobileNumber);

    const newUser: User = {
      id: 'student-' + Date.now(),
      name: data.name.trim(),
      mobileNumber: cleanedNumber,
      branch: data.branch || 'Computer Engineering',
      semester: data.semester || 1,
      role: 'student',
      reputationPoints: 100, // 100 bonus reputation points on signup
      savedNoteIds: [],
      downloadedNoteIds: [],
      upvotedNoteIds: [],
      uploadedNoteIds: [],
      joinedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('enginotes_user');
      localStorage.removeItem('enginotes_user_v4');
    } catch (e) {
      console.error('Error clearing session:', e);
    }
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
  };

  const isBookmarkSaved = (noteId: string) => {
    return user?.savedNoteIds?.includes(noteId) || false;
  };

  const toggleUserBookmark = (noteId: string) => {
    if (!user) return;
    const saved = user.savedNoteIds || [];
    const isSaved = saved.includes(noteId);
    const newSaved = isSaved
      ? saved.filter((id) => id !== noteId)
      : [...saved, noteId];

    setUser({
      ...user,
      savedNoteIds: newSaved
    });
  };

  const recordNoteDownload = (noteId: string) => {
    if (!user) return;
    const downloads = user.downloadedNoteIds || [];
    if (!downloads.includes(noteId)) {
      setUser({
        ...user,
        downloadedNoteIds: [...downloads, noteId],
        reputationPoints: (user.reputationPoints || 0) + 10
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginWithMobile,
        logout,
        updateProfile,
        isBookmarkSaved,
        toggleUserBookmark,
        recordNoteDownload
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
