import React, { useState } from 'react';
import {
  Upload,
  CheckCircle,
  AlertCircle,
  Eye,
  Plus,
  X,
  FileCheck,
  Award,
  ArrowRight,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { Note, NoteCategory, SectionType } from '../types';
import { BRANCHES_DATA, NOTE_CATEGORIES } from '../data/branchesData';
import { INITIAL_NOTES } from '../data/seedNotes';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';
import { saveOriginalFile } from '../utils/fileStorage';
import { NoteCard } from './NoteCard';

interface UploadNotesSectionProps {
  onNavigate: (section: SectionType) => void;
  onPreviewNote: (note: Note) => void;
  onOpenAuthModal: () => void;
}

export const UploadNotesSection: React.FC<UploadNotesSectionProps> = ({
  onNavigate,
  onPreviewNote,
  onOpenAuthModal
}) => {
  const { user, isAuthenticated } = useAuth();
  const { notes, addNote, deleteNote, deleteAllUploadedNotes } = useNotes();

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [branch, setBranch] = useState(user?.branch || 'CSE');
  const [semester, setSemester] = useState<number>(user?.semester || 3);
  const [category, setCategory] = useState<NoteCategory>('Handwritten Notes');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['ExamReady', 'UnitWise']);
  const [keyConcept, setKeyConcept] = useState('');

  // Deletion modal states
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [deleteToast, setDeleteToast] = useState<string | null>(null);

  // Compute all user uploaded notes
  const myUploadedNotes = notes.filter(
    (n) =>
      n.isUserUploaded === true ||
      !INITIAL_NOTES.some((inNote) => inNote.id === n.id) ||
      (user && (n.author.id === user.id || user.uploadedNoteIds.includes(n.id)))
  );
  const [formulaOrCode, setFormulaOrCode] = useState('');

  // Uploaded file
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [fileDataUrl, setFileDataUrl] = useState<string>('');
  const [selectedFileObj, setSelectedFileObj] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(24);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [submittedNote, setSubmittedNote] = useState<Note | null>(null);

  const processFile = (file: File) => {
    setSelectedFileObj(file);
    setFileName(file.name);
    setFileSize((file.size / (1024 * 1024)).toFixed(1) + ' MB');
    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFileDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim().replace(/^#/, '')]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleSelectSampleFile = () => {
    setFileName(`${subject || 'Engineering'}_Notes_Complete_Semester.pdf`);
    setFileSize('8.4 MB');
    setPageCount(32);
    if (!title) {
      setTitle(`Complete ${subject || 'Course'} Notes & Exam Solved Papers`);
    }
  };

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim()) {
      setValidationError('Please fill in both the Note Title and Subject Name before publishing.');
      return;
    }
    setValidationError(null);

    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          const created = addNote({
            title: title.trim(),
            subject: subject.trim(),
            branch,
            semester,
            category,
            description: description.trim() || 'Comprehensive exam preparation materials and university course notes.',
            fileName: fileName || `${subject.replace(/\s+/g, '_')}_Notes.pdf`,
            fileSize: fileSize || '9.6 MB',
            fileDataUrl: fileDataUrl || undefined,
            pages: pageCount || 24,
            tags,
            isVerified: true,
            hasOriginalFile: !!selectedFileObj,
            previewPages: [
              {
                pageNumber: 1,
                title: `${subject} - Unit 1 Fundamentals`,
                content: description || 'Complete unit notes with definitions, diagrams, and step-by-step problem derivations.',
                keyPoints: [
                  keyConcept || 'Core theorems and definitions',
                  'Standard university exam questions with step marks',
                  'Common mistakes to avoid during semester exams'
                ],
                formula: formulaOrCode ? formulaOrCode : undefined
              },
              {
                pageNumber: 2,
                title: `${subject} - Key Formulas & Derivations`,
                content: 'Formulas, step-by-step proofs, and solved numerical problems for quick revision.',
                keyPoints: ['Comprehensive chapter summary', 'Quick revision cheat sheet']
              }
            ]
          });

          if (selectedFileObj) {
            saveOriginalFile(created.id, selectedFileObj);
          }

          setSubmittedNote(created);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  // Preview mock for live card
  const mockPreviewNote: Note = {
    id: 'preview-temp',
    title: title || 'Comprehensive Semester Examination Notes',
    subject: subject || 'Data Structures & Algorithms',
    branch: branch,
    semester: semester,
    category: category,
    description: description || 'Detailed lecture notes with formulas, solved problems, and key takeaways for university exams.',
    author: {
      id: user?.id || 'demo-auth',
      name: user?.name || 'You (Contributor)',
      college: user?.college || 'Engineering College',
      avatarUrl: user?.avatar,
      verified: true
    },
    fileName: fileName || 'Course_Notes.pdf',
    fileSize: fileSize || '8.4 MB',
    pages: pageCount || 24,
    format: 'pdf',
    downloads: 0,
    upvotes: 0,
    isVerified: true,
    isFeatured: false,
    tags: tags.length > 0 ? tags : ['Notes'],
    createdAt: 'Today',
    previewPages: []
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-[#9E9E9E] mb-1">
          <Upload className="w-3.5 h-3.5 text-white" />
          <span>Contributor Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Upload Engineering Notes
        </h1>
        <p className="text-xs sm:text-sm text-[#9E9E9E] mt-1">
          Share your handwritten notes, lecture slides, or solved question papers with peers.
        </p>
      </div>

      {/* Guest / Auth notice banner if not signed in */}
      {!isAuthenticated && (
        <div className="p-4 rounded-xl bg-[#2F2F2F] border border-[#424242] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-[#B4B4B4] shrink-0" />
            <div>
              <p className="text-xs font-semibold text-white">
                Sign in to earn 50 Contributor Reputation Points for each upload!
              </p>
              <p className="text-xs text-[#9E9E9E]">
                You can still upload as a guest, or log in to track your downloads and badges.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenAuthModal}
            className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-[#171717] font-semibold text-xs transition-colors shrink-0 cursor-pointer"
          >
            Sign In
          </button>
        </div>
      )}

      {/* Main Grid: Form on Left, Live Card Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Container */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-[#2F2F2F] border border-[#424242] rounded-2xl p-5 sm:p-7 space-y-5 shadow-lg"
          >
            {validationError && (
              <div className="p-3 rounded-xl bg-[#2A1F21] border border-[#6B3238] text-[#F87171] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#F87171]" />
                <span>{validationError}</span>
              </div>
            )}

            {/* File Dropzone */}
            <div>
              <label className="block text-xs font-medium text-[#ECECEC] mb-2">
                1. Select Document File (PDF, DOCX, PPT)
              </label>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                className={`relative border-2 border-dashed rounded-xl p-5 text-center transition-colors ${
                  isDragging
                    ? 'border-white bg-[#383838]'
                    : fileName
                    ? 'border-[#10A37F]/60 bg-[#212121]'
                    : 'border-[#424242] hover:border-[#676767] bg-[#212121]'
                }`}
              >
                <input
                  type="file"
                  id="note-file-upload"
                  accept=".pdf,.docx,.doc,.ppt,.pptx"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                {fileName ? (
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-lg bg-[#2F2F2F] border border-[#424242] text-[#10A37F] flex items-center justify-center mb-2">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-semibold text-white">{fileName}</p>
                    <p className="text-xs text-[#9E9E9E] mt-0.5">
                      {fileSize} · {pageCount} pages detected
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <label
                        htmlFor="note-file-upload"
                        className="text-xs text-white underline cursor-pointer font-medium"
                      >
                        Replace file
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setFileName('');
                          setFileSize('');
                        }}
                        className="text-xs text-[#F87171] hover:underline cursor-pointer font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#2F2F2F] border border-[#424242] text-white flex items-center justify-center mx-auto mb-2.5">
                      <Upload className="w-5 h-5 text-[#ECECEC]" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-white">
                      Drag and drop your file here, or{' '}
                      <label
                        htmlFor="note-file-upload"
                        className="text-white underline cursor-pointer"
                      >
                        browse files
                      </label>
                    </p>
                    <p className="text-[11px] text-[#8E8E8E] mt-1">
                      Supports PDF, DOCX, PPT up to 50MB
                    </p>
                    <button
                      type="button"
                      onClick={handleSelectSampleFile}
                      className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#2F2F2F] hover:bg-[#383838] border border-[#424242] text-white text-xs font-medium cursor-pointer"
                    >
                      <span>Use Sample PDF Attachment</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Note Details */}
            <div className="space-y-4">
              <label className="block text-xs font-medium text-[#ECECEC]">
                2. Note Information
              </label>

              {/* Title */}
              <div>
                <span className="text-xs font-medium text-[#A1A1A1] block mb-1">
                  Note Title *
                </span>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Complete Trees & Graphs Handwritten Notes (Unit 2 & 3)"
                  className="w-full bg-[#212121] text-xs sm:text-sm text-white placeholder-[#6E6E6E] px-3.5 py-2.5 rounded-xl border border-[#424242] focus:border-[#676767] focus:outline-none"
                />
              </div>

              {/* Subject */}
              <div>
                <span className="text-xs font-medium text-[#A1A1A1] block mb-1">
                  Subject / Course Name *
                </span>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Data Structures & Algorithms, Thermodynamics, Signals..."
                  className="w-full bg-[#212121] text-xs sm:text-sm text-white placeholder-[#6E6E6E] px-3.5 py-2.5 rounded-xl border border-[#424242] focus:border-[#676767] focus:outline-none"
                />
              </div>

              {/* Branch, Semester, Category Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-xs font-medium text-[#A1A1A1] block mb-1">
                    Branch *
                  </span>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full bg-[#212121] text-xs text-[#ECECEC] px-3 py-2.5 rounded-xl border border-[#424242] focus:border-[#676767] focus:outline-none cursor-pointer"
                  >
                    {BRANCHES_DATA.map((b) => (
                      <option key={b.code} value={b.code}>
                        {b.code} - {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="text-xs font-medium text-[#A1A1A1] block mb-1">
                    Semester *
                  </span>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(Number(e.target.value))}
                    className="w-full bg-[#212121] text-xs text-[#ECECEC] px-3 py-2.5 rounded-xl border border-[#424242] focus:border-[#676767] focus:outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option key={sem} value={sem}>
                        Semester {sem}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="text-xs font-medium text-[#A1A1A1] block mb-1">
                    Category *
                  </span>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as NoteCategory)}
                    className="w-full bg-[#212121] text-xs text-[#ECECEC] px-3 py-2.5 rounded-xl border border-[#424242] focus:border-[#676767] focus:outline-none cursor-pointer"
                  >
                    {NOTE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <span className="text-xs font-medium text-[#A1A1A1] block mb-1">
                  Description & Exam Highlights
                </span>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mention key topics, university questions solved, or chapters covered..."
                  className="w-full bg-[#212121] text-xs sm:text-sm text-white placeholder-[#6E6E6E] p-3 rounded-xl border border-[#424242] focus:border-[#676767] focus:outline-none resize-none"
                />
              </div>

              {/* Key Concept & Formula for the Preview Viewer */}
              <div>
                <span className="text-xs font-medium text-[#A1A1A1] block mb-1">
                  Featured Formula or Core Theorem (Shows in Preview)
                </span>
                <input
                  type="text"
                  value={formulaOrCode}
                  onChange={(e) => setFormulaOrCode(e.target.value)}
                  placeholder="e.g. Master Theorem: T(n) = a*T(n/b) + f(n)"
                  className="w-full bg-[#212121] text-xs sm:text-sm text-white placeholder-[#6E6E6E] px-3.5 py-2.5 rounded-xl border border-[#424242] focus:border-[#676767] focus:outline-none font-mono"
                />
              </div>

              {/* Tags */}
              <div>
                <span className="text-xs font-medium text-[#A1A1A1] block mb-1">
                  Topic Tags
                </span>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="Add tag and press Enter (e.g. #Algorithms)"
                    className="flex-1 bg-[#212121] text-xs sm:text-sm text-white placeholder-[#6E6E6E] px-3.5 py-2 rounded-xl border border-[#424242] focus:border-[#676767] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="p-2 rounded-xl bg-[#212121] hover:bg-[#383838] border border-[#424242] text-white cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-xs bg-[#212121] text-[#ECECEC] px-2.5 py-1 rounded-lg border border-[#424242]"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-[#8E8E8E] hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Upload Progress Bar */}
            {isUploading && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-white font-medium">
                  <span>Uploading & processing document...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#212121] overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUploading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white hover:bg-neutral-200 text-[#171717] font-semibold text-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              <span>{isUploading ? 'Publishing...' : 'Publish Note (+50 pts)'}</span>
            </button>
          </form>
        </div>

        {/* Live Card Preview Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between text-xs text-[#8E8E8E]">
            <span>Live Card Preview</span>
            <span>Updates live</span>
          </div>

          <NoteCard
            note={mockPreviewNote}
            onPreview={onPreviewNote}
            variant="grid"
          />

          {/* Publishing Checklist Card */}
          <div className="p-4 rounded-xl bg-[#2F2F2F] border border-[#424242] space-y-2.5">
            <h4 className="text-xs font-semibold text-white flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#10A37F]" />
              <span>Verification Guidelines</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-[#9E9E9E]">
              <li className="flex items-start gap-2">
                <span className="text-[#666666]">·</span>
                <span>Legible handwriting or clear high-resolution scanned pages.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#666666]">·</span>
                <span>Specify the correct semester and engineering branch.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#666666]">·</span>
                <span>Include formula derivations and worked problems for high scores.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Delete Feedback Toast */}
      {deleteToast && (
        <div className="p-3.5 rounded-xl bg-[#212121] border border-[#424242] text-white text-xs font-medium flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#10A37F] shrink-0" />
            <span>{deleteToast}</span>
          </div>
          <button
            onClick={() => setDeleteToast(null)}
            className="text-[#8E8E8E] hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Uploaded Files Management Section */}
      {myUploadedNotes.length > 0 && (
        <div className="p-5 rounded-2xl bg-[#2F2F2F] border border-[#424242] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#424242]">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Your Uploaded Files ({myUploadedNotes.length})
              </h3>
              <p className="text-xs text-[#9E9E9E] mt-0.5">
                Manage or delete study materials uploaded from this device.
              </p>
            </div>

            <button
              onClick={() => setShowDeleteAllModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#212121] hover:bg-[#2A1F21] text-[#F87171] border border-[#424242] hover:border-[#6B3238] text-xs font-medium transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete All Files ({myUploadedNotes.length})</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {myUploadedNotes.map((n) => (
              <div
                key={n.id}
                className="p-3.5 rounded-xl bg-[#212121] border border-[#424242] flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1 text-[11px] text-[#9E9E9E]">
                    <span className="text-white font-medium">{n.branch}</span>
                    <span aria-hidden="true">·</span>
                    <span>Sem {n.semester}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-white line-clamp-1">
                    {n.title}
                  </h4>
                  <p className="text-[11px] text-[#8E8E8E] mt-0.5 truncate">
                    {n.subject} · {n.fileSize || 'PDF'}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#333333]">
                  <button
                    onClick={() => onPreviewNote(n)}
                    className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1 rounded-md bg-[#2F2F2F] hover:bg-[#383838] text-white text-xs font-medium border border-[#424242] transition-colors cursor-pointer"
                  >
                    <Eye className="w-3 h-3 text-[#B4B4B4]" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => setNoteToDelete(n)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#212121] text-[#F87171] hover:bg-[#2F2F2F] border border-[#424242] text-xs font-medium transition-colors cursor-pointer"
                    title="Delete this note"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Modal */}
      {submittedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#2F2F2F] border border-[#424242] rounded-2xl p-6 sm:p-7 max-w-md w-full text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#212121] border border-[#424242] text-[#10A37F] flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white">
              Note Published Successfully
            </h3>

            <p className="text-xs text-[#9E9E9E] leading-relaxed">
              Your note <strong>"{submittedNote.title}"</strong> is now live in the library. You earned <strong className="text-white">+50 reputation points</strong>.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <button
                  onClick={() => {
                    onPreviewNote(submittedNote);
                    setSubmittedNote(null);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-[#171717] font-semibold text-xs transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Interactive Preview</span>
                </button>
                <button
                  onClick={() => {
                    setSubmittedNote(null);
                    onNavigate('browse');
                  }}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#212121] hover:bg-[#383838] border border-[#424242] text-white font-medium text-xs transition-colors cursor-pointer"
                >
                  <span>Browse All Notes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => {
                  deleteNote(submittedNote.id);
                  setSubmittedNote(null);
                  setDeleteToast(`"${submittedNote.title}" deleted.`);
                  setTimeout(() => setDeleteToast(null), 3500);
                }}
                className="w-full py-2 text-xs text-[#F87171] hover:underline transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Uploaded by mistake? Delete note</span>
              </button>
            </div>
          </div>
        </div>
      )}

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
              This note will be permanently removed.
            </p>

            <div className="pt-2 flex items-center justify-center gap-2.5">
              <button
                onClick={() => setNoteToDelete(null)}
                className="w-full py-2 rounded-xl bg-[#212121] hover:bg-[#383838] border border-[#424242] text-[#B4B4B4] font-medium text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const title = noteToDelete.title;
                  deleteNote(noteToDelete.id);
                  setNoteToDelete(null);
                  setDeleteToast(`"${title}" deleted successfully.`);
                  setTimeout(() => setDeleteToast(null), 3500);
                }}
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
                onClick={() => {
                  const count = myUploadedNotes.length;
                  deleteAllUploadedNotes();
                  setShowDeleteAllModal(false);
                  setDeleteToast(`All ${count} uploaded files were deleted.`);
                  setTimeout(() => setDeleteToast(null), 3500);
                }}
                className="w-full py-2 rounded-xl bg-[#F87171] hover:bg-red-500 text-black font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete All</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
