import React, { useState } from 'react';
import {
  X,
  Download,
  Bookmark,
  ThumbsUp,
  CheckCircle,
  FileText,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Sparkles,
  BookOpen,
  Share2,
  Code2,
  Cpu,
  Layers,
  Printer,
  Trash2,
  AlertTriangle,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { Note } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';
import { INITIAL_NOTES } from '../data/seedNotes';
import { downloadNotePDF, printNoteToPDF } from '../utils/pdfGenerator';

interface NotePreviewModalProps {
  note: Note | null;
  onClose: () => void;
}

export const NotePreviewModal: React.FC<NotePreviewModalProps> = ({
  note,
  onClose
}) => {
  const { user, isBookmarkSaved, toggleUserBookmark } = useAuth();
  const { toggleUpvote, recordDownload, deleteNote } = useNotes();

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activeTab, setActiveTab] = useState<'reader' | 'summary' | 'verification'>('reader');
  const [readingLayout, setReadingLayout] = useState<'continuous' | 'single'>('continuous');
  const [viewerMode, setViewerMode] = useState<'structured' | 'original'>(
    note?.fileDataUrl ? 'original' : 'structured'
  );
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'done'>('idle');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!note) return null;

  const canDeleteNote =
    note.isUserUploaded === true ||
    !INITIAL_NOTES.some((inNote) => inNote.id === note.id) ||
    (user && (user.uploadedNoteIds.includes(note.id) || note.author.id === user.id));

  const handleDeleteThisNote = () => {
    deleteNote(note.id);
    setShowDeleteConfirm(false);
    onClose();
  };

  const isSaved = isBookmarkSaved(note.id);
  const isUpvoted = user?.upvotedNoteIds.includes(note.id) || false;

  const pages =
    note.previewPages && note.previewPages.length > 0
      ? note.previewPages
      : [
          {
            pageNumber: 1,
            title: `${note.title} - Main Notes`,
            content: note.description || 'Full lecture notes and university solved papers.',
            keyPoints: [
              'Complete unit coverage and conceptual derivations',
              'Past year university exam questions',
              'Tips for scoring maximum marks in numerical problems'
            ]
          }
        ];

  const currentPage = pages[currentPageIndex] || pages[0];

  const handleDownload = async () => {
    setDownloadState('downloading');
    setDownloadNotice('Generating PDF file directly in your browser...');
    recordDownload(note.id);
    const res = await downloadNotePDF(note);
    if (res.success) {
      setDownloadState('done');
      setDownloadNotice('✓ PDF download started successfully! Check your browser downloads.');
      setTimeout(() => {
        setDownloadState('idle');
        setDownloadNotice(null);
      }, 5000);
    } else {
      setDownloadState('idle');
      setDownloadNotice('Download blocked by iframe. Click "Print / Save as PDF" below.');
    }
  };

  const handlePrint = () => {
    recordDownload(note.id);
    printNoteToPDF(note);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#2F2F2F] border border-[#424242] rounded-2xl w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden shadow-2xl text-[#ECECEC]">
        {/* Top Header Bar */}
        <div className="p-4 sm:px-6 bg-[#212121] border-b border-[#424242] flex items-center justify-between gap-4 shrink-0">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#2F2F2F] text-[#ECECEC] border border-[#424242]">
                {note.branch} • Sem {note.semester}
              </span>
              <span className="text-xs text-[#8E8E8E]">
                {note.category}
              </span>
              {note.isVerified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-[#2F2F2F] px-2 py-0.5 rounded border border-[#424242]">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-white truncate mt-1">
              {note.title}
            </h2>
          </div>

          {/* Action buttons on header */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={handleShare}
              title="Copy Note Link"
              className="p-2 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] text-[#8E8E8E] hover:text-white border border-[#424242] text-xs transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => toggleUserBookmark(note.id)}
              title={isSaved ? 'Remove bookmark' : 'Bookmark note'}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-[#383838] border-white text-white'
                  : 'bg-[#2F2F2F] hover:bg-[#383838] border-[#424242] text-[#8E8E8E] hover:text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={handlePrint}
              title="Print or Save as PDF"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] text-[#ECECEC] border border-[#424242] text-xs font-medium transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#B4B4B4]" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={downloadState === 'downloading'}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#ECECEC] hover:bg-white text-[#212121] font-semibold text-xs transition-all cursor-pointer disabled:opacity-60"
            >
              {downloadState === 'downloading' ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-[#212121]/30 border-t-[#212121] rounded-full animate-spin" />
                  <span>Preparing...</span>
                </>
              ) : downloadState === 'done' ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </>
              )}
            </button>

            {canDeleteNote && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                title="Delete this uploaded note"
                className="p-2 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] text-[#8E8E8E] hover:text-red-400 border border-[#424242] transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] text-[#8E8E8E] hover:text-white border border-[#424242] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Download notification banner if active */}
        {downloadNotice && (
          <div className="bg-[#212121] border-b border-[#424242] px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs text-[#ECECEC]">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{downloadNotice}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="underline font-medium hover:text-white cursor-pointer"
              >
                Printer / Save as PDF
              </button>
              <button
                onClick={() => setDownloadNotice(null)}
                className="text-[#8E8E8E] hover:text-white p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Sub-bar: Navigation Tabs & Zoom controls */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#212121] border-b border-[#424242] flex items-center justify-between gap-4 text-xs shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('reader')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === 'reader'
                  ? 'bg-[#2F2F2F] text-white border border-[#424242]'
                  : 'text-[#8E8E8E] hover:text-[#ECECEC]'
              }`}
            >
              Document Reader ({pages.length})
            </button>

            <button
              onClick={() => setActiveTab('summary')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'summary'
                  ? 'bg-[#2F2F2F] text-white border border-[#424242]'
                  : 'text-[#8E8E8E] hover:text-[#ECECEC]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B4B4B4]" />
              <span>Exam Summary</span>
            </button>

            <button
              onClick={() => setActiveTab('verification')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'verification'
                  ? 'bg-[#2F2F2F] text-white border border-[#424242]'
                  : 'text-[#8E8E8E] hover:text-[#ECECEC]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#B4B4B4]" />
              <span>Syllabus Info</span>
            </button>
          </div>

          {activeTab === 'reader' && (
            <div className="hidden sm:flex items-center gap-3 text-[#8E8E8E]">
              <div className="flex items-center gap-1 bg-[#2F2F2F] p-1 rounded-lg border border-[#424242] text-[11px]">
                <button
                  onClick={() => setReadingLayout('continuous')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                    readingLayout === 'continuous'
                      ? 'bg-[#ECECEC] text-[#212121]'
                      : 'text-[#8E8E8E] hover:text-[#ECECEC]'
                  }`}
                >
                  All Pages
                </button>
                <button
                  onClick={() => setReadingLayout('single')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                    readingLayout === 'single'
                      ? 'bg-[#ECECEC] text-[#212121]'
                      : 'text-[#8E8E8E] hover:text-[#ECECEC]'
                  }`}
                >
                  Single
                </button>
              </div>

              <div className="flex items-center gap-1 bg-[#2F2F2F] px-2 py-1 rounded-lg border border-[#424242]">
                <button
                  onClick={() => setZoomLevel(Math.max(80, zoomLevel - 15))}
                  className="p-1 hover:text-white"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono px-1">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel(Math.min(140, zoomLevel + 15))}
                  className="p-1 hover:text-white"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {readingLayout === 'single' && (
                <div className="flex items-center gap-1 bg-[#2F2F2F] px-2 py-1 rounded-lg border border-[#424242]">
                  <button
                    disabled={currentPageIndex === 0}
                    onClick={() => setCurrentPageIndex((prev) => Math.max(0, prev - 1))}
                    className="p-1 disabled:opacity-30 hover:text-white cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono px-1">
                    {currentPageIndex + 1} / {pages.length}
                  </span>
                  <button
                    disabled={currentPageIndex === pages.length - 1}
                    onClick={() =>
                      setCurrentPageIndex((prev) => Math.min(pages.length - 1, prev + 1))
                    }
                    className="p-1 disabled:opacity-30 hover:text-white cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#212121]">
          {copiedLink && (
            <div className="mb-4 p-2.5 rounded-lg bg-[#2F2F2F] border border-[#424242] text-white text-xs font-medium text-center animate-in fade-in">
              Link copied to clipboard.
            </div>
          )}

          {/* READER TAB */}
          {activeTab === 'reader' && (
            <div className="max-w-4xl mx-auto space-y-4">
              {/* Quick Jump Bar across all pages */}
              {pages.length > 1 && (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                  <span className="text-[11px] text-[#8E8E8E] font-medium shrink-0 mr-1">
                    Jump:
                  </span>
                  {pages.map((p, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => {
                        setCurrentPageIndex(pIdx);
                        const el = document.getElementById(`doc-page-${pIdx}`);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className={`shrink-0 px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer border ${
                        currentPageIndex === pIdx
                          ? 'bg-[#ECECEC] text-[#212121] border-[#ECECEC] font-medium'
                          : 'bg-[#2F2F2F] text-[#8E8E8E] hover:text-white border-[#424242]'
                      }`}
                    >
                      P.{p.pageNumber || pIdx + 1}: {p.title.split(':')[0]}
                    </button>
                  ))}
                </div>
              )}

              {note.fileDataUrl && (
                <div className="flex items-center justify-between p-2.5 bg-[#2F2F2F] border border-[#424242] rounded-xl text-xs">
                  <span className="text-[#ECECEC] font-medium pl-2">
                    Attached File: <strong className="text-white font-mono">{note.fileName}</strong>
                  </span>
                  <div className="flex items-center gap-1 bg-[#212121] p-1 rounded-lg border border-[#424242]">
                    <button
                      onClick={() => setViewerMode('original')}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                        viewerMode === 'original'
                          ? 'bg-[#ECECEC] text-[#212121]'
                          : 'text-[#8E8E8E] hover:text-white'
                      }`}
                    >
                      Original
                    </button>
                    <button
                      onClick={() => setViewerMode('structured')}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                        viewerMode === 'structured'
                          ? 'bg-[#ECECEC] text-[#212121]'
                          : 'text-[#8E8E8E] hover:text-white'
                      }`}
                    >
                      Notes View
                    </button>
                  </div>
                </div>
              )}

              {viewerMode === 'original' && note.fileDataUrl ? (
                <div className="w-full h-[620px] rounded-xl overflow-hidden border border-[#424242] bg-[#2F2F2F] shadow-xl">
                  <iframe
                    src={note.fileDataUrl}
                    className="w-full h-full rounded-xl"
                    title={note.title}
                  />
                </div>
              ) : readingLayout === 'continuous' ? (
                /* Continuous All Pages View */
                <div
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                  className="space-y-6 transition-transform"
                >
                  {pages.map((p, idx) => (
                    <div
                      key={idx}
                      id={`doc-page-${idx}`}
                      className="bg-[#2F2F2F] border border-[#424242] rounded-xl p-6 sm:p-8 space-y-5"
                    >
                      {/* Page Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#424242] text-xs text-[#8E8E8E]">
                        <span className="font-mono text-white font-medium">
                          {note.subject} • Module {idx + 1}
                        </span>
                        <span className="font-mono">
                          Page {p.pageNumber || idx + 1} of {pages.length}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-semibold text-white">
                        {p.title}
                      </h3>

                      {/* Content */}
                      <div className="text-sm text-[#B4B4B4] leading-relaxed whitespace-pre-line font-normal space-y-4">
                        {p.content}
                      </div>

                      {/* Formula */}
                      {p.formula && (
                        <div className="p-3.5 rounded-lg bg-[#212121] border border-[#424242] space-y-1">
                          <span className="text-[11px] font-medium text-[#8E8E8E] uppercase tracking-wider">
                            Governing Formula / Theorem:
                          </span>
                          <div className="font-mono text-xs sm:text-sm text-[#ECECEC]">
                            {p.formula}
                          </div>
                        </div>
                      )}

                      {/* Code Snippet */}
                      {p.codeSnippet && (
                        <div className="rounded-lg bg-[#1E1E1E] border border-[#383838] p-4 overflow-x-auto">
                          <div className="flex items-center gap-2 text-xs text-[#8E8E8E] mb-2 pb-2 border-b border-[#383838]">
                            <Code2 className="w-3.5 h-3.5 text-[#B4B4B4]" />
                            <span>Code Implementation</span>
                          </div>
                          <pre className="text-xs text-[#ECECEC] font-mono leading-relaxed">
                            {p.codeSnippet}
                          </pre>
                        </div>
                      )}

                      {/* Key Points */}
                      {p.keyPoints && p.keyPoints.length > 0 && (
                        <div className="p-4 rounded-lg bg-[#212121] border border-[#424242] space-y-2">
                          <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#B4B4B4]" />
                            Key Takeaways
                          </span>
                          <ul className="space-y-1.5 text-xs text-[#B4B4B4]">
                            {p.keyPoints.map((pt, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2">
                                <span className="text-[#8E8E8E] mt-0.5">•</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="pt-3 border-t border-[#424242] flex items-center justify-between text-[11px] text-[#8E8E8E]">
                        <span>EngiNotes • {note.branch}</span>
                        <span className="font-mono">Page {idx + 1} of {pages.length}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Single Page View */
                <div
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                  className="bg-[#2F2F2F] border border-[#424242] rounded-xl p-6 sm:p-8 space-y-5 transition-transform"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#424242] text-xs text-[#8E8E8E]">
                    <span className="font-mono text-white font-medium">
                      {note.subject} • Module {currentPageIndex + 1}
                    </span>
                    <span className="font-mono">
                      Page {currentPage.pageNumber || currentPageIndex + 1} of {pages.length}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    {currentPage.title}
                  </h3>

                  <div className="text-sm text-[#B4B4B4] leading-relaxed whitespace-pre-line font-normal space-y-4">
                    {currentPage.content}
                  </div>

                  {currentPage.formula && (
                    <div className="p-3.5 rounded-lg bg-[#212121] border border-[#424242] space-y-1">
                      <span className="text-[11px] font-medium text-[#8E8E8E] uppercase tracking-wider">
                        Governing Formula:
                      </span>
                      <div className="font-mono text-xs sm:text-sm text-[#ECECEC]">
                        {currentPage.formula}
                      </div>
                    </div>
                  )}

                  {currentPage.codeSnippet && (
                    <div className="rounded-lg bg-[#1E1E1E] border border-[#383838] p-4 overflow-x-auto">
                      <pre className="text-xs text-[#ECECEC] font-mono leading-relaxed">
                        {currentPage.codeSnippet}
                      </pre>
                    </div>
                  )}

                  {currentPage.keyPoints && currentPage.keyPoints.length > 0 && (
                    <div className="p-4 rounded-lg bg-[#212121] border border-[#424242] space-y-2">
                      <span className="text-xs font-semibold text-white">
                        Key Takeaways
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#B4B4B4]">
                        {currentPage.keyPoints.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="text-[#8E8E8E]">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#424242] flex items-center justify-between text-[11px] text-[#8E8E8E]">
                    <span>EngiNotes • {note.branch}</span>
                    <span className="font-mono">Page {currentPageIndex + 1} of {pages.length}</span>
                  </div>
                </div>
              )}

              {/* Mobile pagination controls */}
              <div className="flex sm:hidden items-center justify-between p-3 bg-[#2F2F2F] rounded-xl border border-[#424242] text-xs">
                <button
                  disabled={currentPageIndex === 0}
                  onClick={() => setCurrentPageIndex((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-lg bg-[#212121] disabled:opacity-40 font-medium"
                >
                  Previous
                </button>
                <span className="font-mono text-[#8E8E8E]">
                  {currentPageIndex + 1} / {pages.length}
                </span>
                <button
                  disabled={currentPageIndex === pages.length - 1}
                  onClick={() =>
                    setCurrentPageIndex((prev) => Math.min(pages.length - 1, prev + 1))
                  }
                  className="px-3 py-1.5 rounded-lg bg-[#212121] disabled:opacity-40 font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* SUMMARY TAB */}
          {activeTab === 'summary' && (
            <div className="max-w-2xl mx-auto bg-[#2F2F2F] border border-[#424242] rounded-xl p-6 sm:p-8 space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#B4B4B4]" />
                  <span>Exam Preparation Highlights</span>
                </h3>
                <p className="text-xs text-[#8E8E8E] mt-1">
                  Synthesized review of the high-probability exam concepts covered in this set.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#212121] border border-[#424242] space-y-1.5">
                <h4 className="text-xs font-semibold text-white">
                  Document Overview
                </h4>
                <p className="text-xs text-[#B4B4B4] leading-relaxed">
                  {note.description}
                </p>
              </div>

              {/* Units covered */}
              {note.syllabusUnitsCovered && note.syllabusUnitsCovered.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-white">
                    Syllabus Units Covered
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {note.syllabusUnitsCovered.map((u, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-[#212121] border border-[#424242] text-xs text-[#ECECEC] flex items-center gap-2"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{u}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Download prompt */}
              <div className="p-4 rounded-xl bg-[#212121] border border-[#424242] flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-white">
                    Save the entire {note.pages}-page document
                  </h4>
                  <p className="text-[11px] text-[#8E8E8E] mt-0.5">
                    File size: {note.fileSize} • Clean PDF format
                  </p>
                </div>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-lg bg-[#ECECEC] hover:bg-white text-[#212121] font-semibold text-xs transition-colors shrink-0 cursor-pointer"
                >
                  Download
                </button>
              </div>
            </div>
          )}

          {/* ACADEMIC VERIFICATION & SYLLABUS TAB */}
          {activeTab === 'verification' && (
            <div className="max-w-2xl mx-auto bg-[#2F2F2F] border border-[#424242] rounded-xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#212121] border border-[#424242] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Academic Integrity & Syllabus Details
                  </h3>
                  <p className="text-xs text-[#8E8E8E]">
                    Curriculum alignment and verified source attribution.
                  </p>
                </div>
              </div>

              {/* Source attribution card */}
              <div className="p-4 rounded-xl bg-[#212121] border border-[#424242] space-y-3">
                <span className="text-[11px] font-medium text-[#8E8E8E]">
                  Department & Author
                </span>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2F2F2F] border border-[#424242] text-white flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{note.author.name}</h4>
                    <p className="text-xs text-[#8E8E8E] mt-0.5">{note.author.college}</p>
                    <span className="inline-block mt-1 text-[11px] text-[#B4B4B4] bg-[#2F2F2F] px-2 py-0.5 rounded border border-[#424242]">
                      {note.author.role || 'Verified Coursepack'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quality Checklist */}
              <div className="space-y-2">
                <span className="text-[11px] font-medium text-[#8E8E8E]">
                  Standards Met
                </span>
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-lg bg-[#212121] border border-[#424242] flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <strong className="text-white">Curriculum Aligned:</strong>{' '}
                      <span className="text-[#B4B4B4]">
                        Matches {note.syllabusPattern || 'University Model Syllabus'} for {note.branch} Sem {note.semester}.
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#212121] border border-[#424242] flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <strong className="text-white">Step-by-Step Derivations:</strong>{' '}
                      <span className="text-[#B4B4B4]">
                        Contains step-by-step derivations, standard notation, and solved problems.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#212121] border border-[#424242] text-center">
                  <div className="text-base font-semibold text-white font-mono">{note.pages}</div>
                  <span className="text-[10px] text-[#8E8E8E]">Pages</span>
                </div>
                <div className="p-3 rounded-xl bg-[#212121] border border-[#424242] text-center">
                  <div className="text-base font-semibold text-white font-mono">{note.downloads}</div>
                  <span className="text-[10px] text-[#8E8E8E]">Downloads</span>
                </div>
                <div className="p-3 rounded-xl bg-[#212121] border border-[#424242] text-center">
                  <div className="text-base font-semibold text-white font-mono">{note.upvotes}</div>
                  <span className="text-[10px] text-[#8E8E8E]">Upvotes</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar: Author info & Upvote */}
        <div className="p-4 sm:px-6 bg-[#212121] border-t border-[#424242] flex items-center justify-between gap-4 shrink-0 text-xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#2F2F2F] border border-[#424242] text-white flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-white truncate">{note.author.name}</p>
              <p className="text-[11px] text-[#8E8E8E] truncate">{note.author.college}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleUpvote(note.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                isUpvoted
                  ? 'bg-[#383838] border-white text-white font-semibold'
                  : 'bg-[#2F2F2F] border-[#424242] text-[#8E8E8E] hover:text-white'
              }`}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-white' : ''}`} />
              <span>{note.upvotes} Upvotes</span>
            </button>
          </div>
        </div>

        {/* Modal: Confirm Delete Note */}
        {showDeleteConfirm && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#2F2F2F] border border-red-500/40 rounded-xl p-6 sm:p-7 max-w-sm w-full text-center space-y-4 shadow-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#212121] text-red-400 border border-[#424242] flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-white">
                Delete This Note?
              </h3>
              <p className="text-xs text-[#B4B4B4] leading-relaxed">
                Are you sure you want to delete <strong>"{note.title}"</strong>?
                The document will be erased.
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="w-full py-2.5 rounded-lg bg-[#212121] hover:bg-[#383838] text-[#ECECEC] font-medium text-xs transition-colors cursor-pointer border border-[#424242]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteThisNote}
                  className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
