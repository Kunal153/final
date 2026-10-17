import React, { useState } from 'react';
import {
  Bookmark,
  Upload,
  Download,
  Award,
  Settings,
  LogOut,
  GraduationCap,
  ShieldCheck,
  Trash2,
  Eye,
  CheckCircle,
  Edit3,
  AlertTriangle,
  FileText,
  RotateCcw,
  X,
  Phone,
  Palette,
  Check
} from 'lucide-react';
import { Note, SectionType } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';
import { useTheme, THEME_OPTIONS } from '../context/ThemeContext';
import { INITIAL_NOTES } from '../data/seedNotes';
import { NoteCard } from './NoteCard';
import { validateMobileNumber, validateName, cleanMobileNumber } from '../utils/mobileValidator';

interface MyAccountSectionProps {
  onNavigate: (section: SectionType) => void;
  onPreviewNote: (note: Note) => void;
  onOpenAuthModal: () => void;
  initialTab?: 'saved' | 'uploads' | 'history' | 'settings';
}

export const MyAccountSection: React.FC<MyAccountSectionProps> = ({
  onNavigate,
  onPreviewNote,
  onOpenAuthModal,
  initialTab
}) => {
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const { notes, deleteNote, deleteAllUploadedNotes, restoreDefaultNotes } = useNotes();
  const { theme, setTheme, currentThemeConfig } = useTheme();

  const [activeTab, setActiveTab] = useState<'saved' | 'uploads' | 'history' | 'settings'>(initialTab || 'saved');
  const [themeFilter, setThemeFilter] = useState<'All' | 'Dark' | 'Light' | 'Colourful'>('All');

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Deletion modal & feedback states
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Edit profile states
  const [editName, setEditName] = useState(user?.name || '');
  const [editMobile, setEditMobile] = useState(user?.mobileNumber || '');
  const [editBranch, setEditBranch] = useState(user?.branch || 'Computer Engineering');
  const [editSemester, setEditSemester] = useState<number>(user?.semester || 1);
  const [editError, setEditError] = useState<string | null>(null);
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  // Filter user's saved notes
  const savedNotes = notes.filter((n) => user?.savedNoteIds.includes(n.id));

  // Filter user's uploaded notes
  const myUploadedNotes = notes.filter(
    (n) =>
      n.isUserUploaded === true ||
      !INITIAL_NOTES.some((inNote) => inNote.id === n.id) ||
      (user && (n.author.id === user.id || user.uploadedNoteIds.includes(n.id)))
  );

  // Filter user's downloaded notes
  const downloadedNotes = notes.filter((n) => user?.downloadedNoteIds.includes(n.id));

  const handleConfirmDeleteSingle = () => {
    if (!noteToDelete) return;
    const title = noteToDelete.title;
    deleteNote(noteToDelete.id);
    setNoteToDelete(null);
    setFeedbackToast(`"${title}" deleted successfully.`);
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  const handleConfirmDeleteAll = () => {
    const count = myUploadedNotes.length;
    deleteAllUploadedNotes();
    setShowDeleteAllModal(false);
    setFeedbackToast(`All ${count} uploaded file(s) were deleted.`);
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  const handleConfirmReset = () => {
    restoreDefaultNotes();
    setShowResetModal(false);
    setFeedbackToast('Library reset to original standard notes.');
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);

    const nameCheck = validateName(editName);
    if (!nameCheck.isValid) {
      setEditError(nameCheck.error || 'Please enter a valid name.');
      return;
    }

    const mobileCheck = validateMobileNumber(editMobile);
    if (!mobileCheck.isValid) {
      setEditError(mobileCheck.error || 'Please enter a valid 10-digit mobile number.');
      return;
    }

    updateProfile({
      name: editName.trim(),
      mobileNumber: cleanMobileNumber(editMobile),
      branch: editBranch,
      semester: editSemester
    });
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#2F2F2F] border border-[#424242] text-white flex items-center justify-center mx-auto shadow-md">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Student Profile Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-[#9E9E9E] mt-1 max-w-md mx-auto">
            Please log in to manage your bookmarks, track downloaded notes, and view study materials.
          </p>
        </div>

        <div className="max-w-xs mx-auto pt-2">
          <button
            onClick={onOpenAuthModal}
            className="w-full py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-[#171717] font-semibold text-xs transition-colors cursor-pointer"
          >
            Student Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* User Profile Card Header */}
      <div className="bg-[#2F2F2F] border border-[#424242] rounded-2xl p-6 sm:p-7 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-[#424242]"
                />
              ) : (
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#212121] border border-[#424242] flex items-center justify-center text-white">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-bold text-white">
                  {user.name}
                </h1>
                <span className="text-[11px] font-medium text-[#10A37F] bg-[#212121] px-2 py-0.5 rounded border border-[#424242] capitalize">
                  {user.role}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-[#9E9E9E]">
                <span className="font-mono text-white font-medium">+91 {user.mobileNumber}</span>
                <span aria-hidden="true">·</span>
                <span>{user.branch}</span>
                {user.semester && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Sem {user.semester}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={() => onNavigate('upload')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-neutral-200 text-[#171717] text-xs font-semibold transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Note</span>
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#212121] hover:bg-[#282828] text-[#F87171] border border-[#424242] transition-colors text-xs font-medium cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* User Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-[#424242]">
          <div className="p-3 rounded-xl bg-[#212121] border border-[#424242]">
            <span className="text-xs text-[#9E9E9E] flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#B4B4B4]" />
              Reputation
            </span>
            <div className="text-lg font-bold text-white mt-0.5 font-mono tabular-nums">
              {user.reputationPoints} <span className="text-xs text-[#8E8E8E] font-normal">pts</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#212121] border border-[#424242]">
            <span className="text-xs text-[#9E9E9E] flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-[#B4B4B4]" />
              Saved Notes
            </span>
            <div className="text-lg font-bold text-white mt-0.5 font-mono tabular-nums">
              {user.savedNoteIds.length}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#212121] border border-[#424242]">
            <span className="text-xs text-[#9E9E9E] flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5 text-[#B4B4B4]" />
              My Uploads
            </span>
            <div className="text-lg font-bold text-white mt-0.5 font-mono tabular-nums">
              {myUploadedNotes.length}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#212121] border border-[#424242]">
            <span className="text-xs text-[#9E9E9E] flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-[#B4B4B4]" />
              Downloads
            </span>
            <div className="text-lg font-bold text-white mt-0.5 font-mono tabular-nums">
              {user.downloadedNoteIds.length}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-[#303030] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'saved'
              ? 'bg-white text-[#171717] font-semibold'
              : 'text-[#9E9E9E] hover:text-white hover:bg-[#2F2F2F]'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Saved Notes ({savedNotes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('uploads')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'uploads'
              ? 'bg-white text-[#171717] font-semibold'
              : 'text-[#9E9E9E] hover:text-white hover:bg-[#2F2F2F]'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>My Uploads ({myUploadedNotes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'history'
              ? 'bg-white text-[#171717] font-semibold'
              : 'text-[#9E9E9E] hover:text-white hover:bg-[#2F2F2F]'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Downloaded ({downloadedNotes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-white text-[#171717] font-semibold'
              : 'text-[#9E9E9E] hover:text-white hover:bg-[#2F2F2F]'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Profile Settings</span>
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {/* Saved Notes Tab */}
        {activeTab === 'saved' && (
          <div className="space-y-4">
            {savedNotes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {savedNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onPreview={onPreviewNote}
                    variant="grid"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-[#2F2F2F] rounded-2xl border border-[#424242] p-8 max-w-md mx-auto">
                <Bookmark className="w-8 h-8 text-[#787878] mx-auto mb-2.5" />
                <h3 className="text-sm font-semibold text-white">No saved notes yet</h3>
                <p className="text-xs text-[#9E9E9E] mt-1">
                  Click the bookmark icon on any note card to save it for quick revision.
                </p>
                <button
                  onClick={() => onNavigate('browse')}
                  className="mt-4 px-3.5 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-[#171717] font-semibold text-xs transition-colors cursor-pointer"
                >
                  Browse Notes
                </button>
              </div>
            )}
          </div>
        )}

        {/* My Uploads Tab */}
        {activeTab === 'uploads' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#2F2F2F] border border-[#424242]">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  My Uploaded Notes ({myUploadedNotes.length})
                </h3>
                <p className="text-xs text-[#9E9E9E] mt-0.5">
                  All study materials and PDF files you have contributed.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('upload')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-[#171717] font-semibold text-xs transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload More</span>
                </button>

                {myUploadedNotes.length > 0 && (
                  <button
                    onClick={() => setShowDeleteAllModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#212121] hover:bg-[#2A1F21] text-[#F87171] border border-[#424242] text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete All</span>
                  </button>
                )}
              </div>
            </div>

            {feedbackToast && (
              <div className="p-3 rounded-xl bg-[#212121] border border-[#424242] text-white text-xs font-medium flex items-center justify-between animate-in fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#10A37F] shrink-0" />
                  <span>{feedbackToast}</span>
                </div>
                <button
                  onClick={() => setFeedbackToast(null)}
                  className="text-[#8E8E8E] hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {myUploadedNotes.length > 0 ? (
              <div className="space-y-3">
                {myUploadedNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 rounded-xl bg-[#2F2F2F] border border-[#424242] hover:border-[#676767] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-[#9E9E9E]">
                        <span className="font-semibold text-white">{note.branch}</span>
                        <span aria-hidden="true">·</span>
                        <span>Sem {note.semester}</span>
                        <span aria-hidden="true">·</span>
                        <span>{note.category}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white">
                        {note.title}
                      </h4>
                      <p className="text-xs text-[#8E8E8E]">
                        {note.subject} · {note.downloads} downloads · {note.upvotes} upvotes
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onPreviewNote(note)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#212121] hover:bg-[#383838] border border-[#424242] text-white text-xs font-medium transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#B4B4B4]" />
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={() => setNoteToDelete(note)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#212121] hover:bg-[#2A1F21] text-[#F87171] border border-[#424242] text-xs font-medium transition-colors cursor-pointer"
                        title="Delete this note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-[#2F2F2F] rounded-2xl border border-[#424242] p-8 max-w-md mx-auto">
                <Upload className="w-8 h-8 text-[#787878] mx-auto mb-2.5" />
                <h3 className="text-sm font-semibold text-white">No uploaded files in library</h3>
                <p className="text-xs text-[#9E9E9E] mt-1">
                  You haven't uploaded any notes yet.
                </p>
                <button
                  onClick={() => onNavigate('upload')}
                  className="mt-4 px-3.5 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-[#171717] font-semibold text-xs transition-colors cursor-pointer"
                >
                  Upload Your First Note
                </button>
              </div>
            )}
          </div>
        )}

        {/* Downloaded History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {downloadedNotes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {downloadedNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onPreview={onPreviewNote}
                    variant="grid"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-[#2F2F2F] rounded-2xl border border-[#424242] p-8 max-w-md mx-auto">
                <Download className="w-8 h-8 text-[#787878] mx-auto mb-2.5" />
                <h3 className="text-sm font-semibold text-white">No download history</h3>
                <p className="text-xs text-[#9E9E9E] mt-1">
                  Notes you download will appear here for fast re-access.
                </p>
                <button
                  onClick={() => onNavigate('browse')}
                  className="mt-4 px-3.5 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-[#171717] font-semibold text-xs transition-colors cursor-pointer"
                >
                  Explore Notes
                </button>
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-xl space-y-5">
            {/* Theme & Appearance Card */}
            <div className="bg-[#2F2F2F] border border-[#424242] rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Palette className="w-4 h-4 text-[#A1A1A1]" />
                    <span>Theme & Appearance</span>
                  </h3>
                  <p className="text-xs text-[#8E8E8E] mt-0.5">
                    Customize your workspace styling. All themes adapt smoothly across the app.
                  </p>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#212121] text-white border border-[#424242]">
                  {currentThemeConfig.name}
                </span>
              </div>

              {/* Theme Category Filters */}
              <div className="flex items-center gap-1.5 border-b border-[#383838] pb-3">
                {(['All', 'Dark', 'Light', 'Colourful'] as const).map((cat) => {
                  const isActive = themeFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setThemeFilter(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#212121] text-white border border-[#424242]'
                          : 'text-[#8E8E8E] hover:text-white hover:bg-[#262626]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Theme Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {THEME_OPTIONS.filter((t) => themeFilter === 'All' || t.category === themeFilter).map((t) => {
                  const isSelected = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTheme(t.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                        isSelected
                          ? 'bg-[#212121] border-white ring-1 ring-white/40 shadow-sm'
                          : 'bg-[#212121] border-[#424242] hover:border-[#8E8E8E]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 p-1 rounded-md bg-[#2A2A2A] border border-[#424242]">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20"
                            style={{ backgroundColor: t.previewBg }}
                            title="Background"
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20"
                            style={{ backgroundColor: t.previewCard }}
                            title="Surface"
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20"
                            style={{ backgroundColor: t.previewAccent }}
                            title="Accent"
                          />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-[#8E8E8E] px-1.5 py-0.2 rounded bg-[#2A2A2A] border border-[#383838]">
                            {t.category}
                          </span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-xs font-semibold text-white">
                          {t.name}
                        </h5>
                        <p className="text-[11px] text-[#8E8E8E] mt-0.5 line-clamp-1">
                          {t.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Live Preview Box */}
              <div className="mt-3 p-3.5 rounded-xl bg-[#212121] border border-[#383838] space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#8E8E8E]">
                  <span>Live Preview</span>
                  <span className="font-mono">{currentThemeConfig.name}</span>
                </div>
                <div
                  className="p-3 rounded-lg border flex items-center justify-between gap-3 transition-colors"
                  style={{
                    backgroundColor: currentThemeConfig.previewCard,
                    borderColor: currentThemeConfig.previewAccent + '40',
                    color: currentThemeConfig.isDark ? '#F3F4F6' : '#18181B'
                  }}
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate">Engineering Mathematics III - Unit 1</p>
                    <p className="text-[11px] opacity-75 truncate">Computer Eng · Verified SPPU 2024</p>
                  </div>
                  <div
                    className="px-2.5 py-1 rounded text-xs font-medium shrink-0 cursor-default"
                    style={{
                      backgroundColor: currentThemeConfig.previewAccent,
                      color: currentThemeConfig.isDark ? '#111827' : '#FFFFFF'
                    }}
                  >
                    Preview Note
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Settings Card */}
            <div className="bg-[#2F2F2F] border border-[#424242] rounded-2xl p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-[#A1A1A1]" />
                  <span>Academic Profile Settings</span>
                </h3>
                {isSavedNotice && (
                  <span className="text-xs text-[#10A37F] font-medium">
                    Profile updated!
                  </span>
                )}
              </div>

            {editError && (
              <div className="p-3 rounded-xl bg-[#2A1F21] border border-[#6B3238] text-[#F87171] text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{editError}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#A1A1A1] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Your Full Name"
                  className="w-full bg-[#212121] text-xs sm:text-sm text-white px-3.5 py-2.5 rounded-xl border border-[#424242] focus:border-[#676767] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A1A1A1] mb-1">
                  Mobile Number (10 Digits)
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-xs font-medium text-[#8E8E8E] border-r border-[#424242] pr-2">
                    +91
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={editMobile}
                    onChange={(e) => setEditMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit mobile number"
                    className="w-full bg-[#212121] font-mono text-xs sm:text-sm text-white pl-14 pr-4 py-2.5 rounded-xl border border-[#424242] focus:border-[#676767] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#A1A1A1] mb-1">
                    Branch
                  </label>
                  <select
                    value={editBranch}
                    onChange={(e) => setEditBranch(e.target.value)}
                    className="w-full bg-[#212121] text-xs text-[#ECECEC] px-3 py-2.5 rounded-xl border border-[#424242] focus:border-[#676767] focus:outline-none cursor-pointer"
                  >
                    {[
                      'Computer Engineering',
                      'Information Technology',
                      'AI & Data Science',
                      'Electronics & Telecommunication',
                      'Mechanical Engineering',
                      'Civil Engineering',
                      'Electrical Engineering',
                      'First Year (FE - Common)'
                    ].map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A1A1A1] mb-1">
                    Current Semester
                  </label>
                  <select
                    value={editSemester}
                    onChange={(e) => setEditSemester(Number(e.target.value))}
                    className="w-full bg-[#212121] text-xs text-[#ECECEC] px-3 py-2.5 rounded-xl border border-[#424242] focus:border-[#676767] focus:outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>
                        Semester {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-[#171717] font-semibold text-xs transition-colors cursor-pointer"
              >
                Save Profile Changes
              </button>
            </form>

            {/* Data & Storage Management Card */}
            <div className="pt-4 border-t border-[#424242] space-y-3">
              <h4 className="text-xs font-semibold text-white">
                Data & Storage Management
              </h4>

              <div className="space-y-2 pt-1">
                <div className="p-3.5 rounded-xl bg-[#212121] border border-[#424242] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div>
                    <h5 className="text-xs font-medium text-white">
                      Delete All Uploaded Files
                    </h5>
                    <p className="text-[11px] text-[#8E8E8E] mt-0.5">
                      Wipes all {myUploadedNotes.length} uploaded files from device storage.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDeleteAllModal(true)}
                    disabled={myUploadedNotes.length === 0}
                    className="px-3 py-1.5 rounded-lg bg-[#2F2F2F] hover:bg-[#2A1F21] text-[#F87171] border border-[#424242] text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
                  >
                    Delete All ({myUploadedNotes.length})
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-[#212121] border border-[#424242] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div>
                    <h5 className="text-xs font-medium text-white">
                      Reset Library to Default
                    </h5>
                    <p className="text-[11px] text-[#8E8E8E] mt-0.5">
                      Restores standard seed notes and resets custom state.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowResetModal(true)}
                    className="px-3 py-1.5 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] text-white border border-[#424242] text-xs font-medium transition-colors cursor-pointer shrink-0"
                  >
                    Reset Library
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

      {/* Modal: Single Note Delete Confirmation */}
      {noteToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#2F2F2F] border border-[#424242] rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[#212121] text-[#F87171] border border-[#424242] flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-white">
              Delete This Note?
            </h3>

            <p className="text-xs text-[#9E9E9E] leading-relaxed">
              Are you sure you want to delete <strong>"{noteToDelete.title}"</strong>?
            </p>

            <div className="pt-2 flex items-center justify-center gap-2.5">
              <button
                onClick={() => setNoteToDelete(null)}
                className="w-full py-2 rounded-xl bg-[#212121] hover:bg-[#383838] border border-[#424242] text-[#B4B4B4] font-medium text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDeleteSingle}
                className="w-full py-2 rounded-xl bg-[#F87171] hover:bg-red-500 text-black font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Delete All Uploaded Files Confirmation */}
      {showDeleteAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#2F2F2F] border border-[#424242] rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[#212121] text-[#F87171] border border-[#424242] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-white">
              Delete All Uploaded Files?
            </h3>

            <p className="text-xs text-[#9E9E9E] leading-relaxed">
              Are you sure you want to delete all <strong className="text-white">{myUploadedNotes.length} uploaded files</strong>? This action cannot be undone.
            </p>

            <div className="pt-2 flex items-center justify-center gap-2.5">
              <button
                onClick={() => setShowDeleteAllModal(false)}
                className="w-full py-2 rounded-xl bg-[#212121] hover:bg-[#383838] border border-[#424242] text-[#B4B4B4] font-medium text-xs transition-colors cursor-pointer"
              >
                Keep Files
              </button>
              <button
                onClick={handleConfirmDeleteAll}
                className="w-full py-2 rounded-xl bg-[#F87171] hover:bg-red-500 text-black font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete All</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Reset Library Confirmation */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#2F2F2F] border border-[#424242] rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[#212121] text-white border border-[#424242] flex items-center justify-center mx-auto">
              <RotateCcw className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-white">
              Reset Notes Library?
            </h3>

            <p className="text-xs text-[#9E9E9E] leading-relaxed">
              This will restore all standard engineering seed notes to default.
            </p>

            <div className="pt-2 flex items-center justify-center gap-2.5">
              <button
                onClick={() => setShowResetModal(false)}
                className="w-full py-2 rounded-xl bg-[#212121] hover:bg-[#383838] border border-[#424242] text-[#B4B4B4] font-medium text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="w-full py-2 rounded-xl bg-white hover:bg-neutral-200 text-[#171717] font-semibold text-xs transition-colors cursor-pointer"
              >
                Reset Library
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
