import React, { useState } from 'react';
import {
  FileText,
  Download,
  ThumbsUp,
  Bookmark,
  CheckCircle,
  Eye,
  Layers,
  Trash2,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { Note } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';
import { INITIAL_NOTES } from '../data/seedNotes';
import { downloadNotePDF } from '../utils/pdfGenerator';

interface NoteCardProps {
  note: Note;
  onPreview: (note: Note) => void;
  variant?: 'grid' | 'compact' | 'list';
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onPreview,
  variant = 'grid'
}) => {
  const { user, isBookmarkSaved, toggleUserBookmark } = useAuth();
  const { toggleUpvote, recordDownload, deleteNote } = useNotes();
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'done'>('idle');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const canDelete =
    note.isUserUploaded === true ||
    !INITIAL_NOTES.some((inNote) => inNote.id === note.id) ||
    (user && (user.uploadedNoteIds.includes(note.id) || note.author.id === user.id));

  const isSaved = isBookmarkSaved(note.id);
  const isUpvoted = user?.upvotedNoteIds.includes(note.id) || false;

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadState('downloading');
    recordDownload(note.id);
    const res = await downloadNotePDF(note);
    if (res.success) {
      setDownloadState('done');
      setTimeout(() => setDownloadState('idle'), 3500);
    } else {
      setDownloadState('idle');
    }
  };

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleUpvote(note.id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleUserBookmark(note.id);
  };

  if (variant === 'list') {
    return (
      <div
        onClick={() => onPreview(note)}
        className="group bg-[#2F2F2F] hover:bg-[#353535] border border-[#424242] hover:border-[#676767] rounded-xl p-4 sm:p-5 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-[#212121] border border-[#424242] flex items-center justify-center shrink-0 text-white">
            <FileText className="w-5 h-5 text-[#B4B4B4]" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1 text-xs text-[#9E9E9E]">
              <span className="font-semibold text-white">{note.branch}</span>
              <span aria-hidden="true">·</span>
              <span>Sem {note.semester}</span>
              <span aria-hidden="true">·</span>
              <span>{note.category}</span>
              {note.isVerified && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 text-[#10A37F] font-medium">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                </>
              )}
            </div>

            <h3 className="text-sm font-semibold text-white group-hover:underline line-clamp-1">
              {note.title}
            </h3>
            <p className="text-xs text-[#B4B4B4] mt-0.5">{note.subject}</p>
            <p className="text-xs text-[#8E8E8E] line-clamp-1 mt-0.5">{note.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t border-[#424242] md:border-t-0">
          <div className="flex items-center gap-3 text-xs text-[#8E8E8E]">
            <span className="flex items-center gap-1" title={`${note.downloads} downloads`}>
              <Download className="w-3.5 h-3.5" />
              <span>{note.downloads}</span>
            </span>
            <span className="flex items-center gap-1" title={`${note.pages} pages`}>
              <Layers className="w-3.5 h-3.5" />
              <span>{note.pages}p</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmark}
              title={isSaved ? 'Remove Bookmark' : 'Save Note'}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-[#383838] border-[#676767] text-white'
                  : 'bg-[#212121] border-[#424242] text-[#8E8E8E] hover:text-white'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
            </button>

            {canDelete && (
              <div className="flex items-center gap-1">
                {confirmDelete ? (
                  <div className="flex items-center gap-1 bg-[#212121] border border-[#F87171]/50 px-2 py-1 rounded-lg">
                    <span className="text-[10px] text-[#F87171] font-medium">Delete?</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note.id);
                      }}
                      className="px-1.5 py-0.5 rounded bg-[#F87171] text-black text-[10px] font-semibold cursor-pointer"
                    >
                      Yes
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDelete(false);
                      }}
                      className="px-1.5 py-0.5 rounded bg-[#2F2F2F] text-[#8E8E8E] text-[10px] cursor-pointer"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmDelete(true);
                    }}
                    title="Delete uploaded note"
                    className="p-2 rounded-lg bg-[#212121] border border-[#424242] text-[#8E8E8E] hover:text-[#F87171] transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            <button
              onClick={handleDownload}
              disabled={downloadState === 'downloading'}
              title="Download PDF"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-colors cursor-pointer ${
                downloadState === 'done'
                  ? 'bg-[#10A37F] text-white'
                  : downloadState === 'downloading'
                  ? 'bg-[#383838] text-white opacity-80 cursor-wait'
                  : 'bg-white hover:bg-neutral-200 text-[#171717]'
              }`}
            >
              {downloadState === 'downloading' ? (
                <>
                  <span className="w-3 h-3 border-2 border-neutral-400 border-t-neutral-900 rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : downloadState === 'done' ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Get PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onPreview(note)}
      className="group relative flex flex-col bg-[#2F2F2F] hover:bg-[#353535] border border-[#424242] hover:border-[#676767] rounded-xl overflow-hidden transition-colors cursor-pointer"
    >
      {/* Top Section */}
      <div className="p-4 sm:p-5 pb-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 text-xs text-[#9E9E9E]">
            <span className="font-semibold text-white">{note.branch}</span>
            <span aria-hidden="true">·</span>
            <span>Sem {note.semester}</span>
            <span aria-hidden="true">·</span>
            <span>{note.category}</span>
          </div>

          <button
            onClick={handleBookmark}
            title={isSaved ? 'Remove from saved' : 'Save note'}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isSaved
                ? 'bg-[#383838] border-[#676767] text-white'
                : 'bg-[#212121] border-[#424242] text-[#8E8E8E] hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>

        <h3 className="text-sm sm:text-base font-semibold text-white group-hover:underline line-clamp-2 mt-1 leading-snug">
          {note.title}
        </h3>
        <p className="text-xs text-[#B4B4B4] font-medium mt-1">{note.subject}</p>
        <p className="text-xs text-[#8E8E8E] mt-1.5 line-clamp-2 leading-relaxed">
          {note.description}
        </p>
      </div>

      {/* Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="px-4 sm:px-5 pb-3 flex flex-wrap gap-1.5">
          {note.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono text-[#9E9E9E] bg-[#212121] px-2 py-0.5 rounded border border-[#424242]"
            >
              #{tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="text-[10px] text-[#787878] px-1 py-0.5">
              +{note.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Author and metadata */}
      <div className="mt-auto px-4 sm:px-5 py-2.5 border-t border-[#424242] bg-[#282828] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded bg-[#212121] border border-[#424242] text-white flex items-center justify-center shrink-0">
            <Building2 className="w-3 h-3 text-[#B4B4B4]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-[#ECECEC] truncate">
              {note.author.name}
            </p>
            <p className="text-[10px] text-[#8E8E8E] truncate">
              {note.author.college}
            </p>
          </div>
        </div>

        {note.isVerified && (
          <span className="inline-flex items-center gap-1 text-[11px] text-[#10A37F] font-medium shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified</span>
          </span>
        )}
      </div>

      {/* Action Footer */}
      <div className="px-4 sm:px-5 py-2.5 bg-[#212121] border-t border-[#424242] flex items-center justify-between text-xs text-[#8E8E8E]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1" title={`${note.downloads} downloads`}>
            <Download className="w-3 h-3" />
            <span>{note.downloads}</span>
          </span>
          <span className="flex items-center gap-1" title={`${note.pages} pages`}>
            <Layers className="w-3 h-3" />
            <span>{note.pages}p</span>
          </span>
          <button
            onClick={handleUpvote}
            title={isUpvoted ? 'Upvoted' : 'Upvote this note'}
            className={`flex items-center gap-1 transition-colors cursor-pointer ${
              isUpvoted ? 'text-white font-medium' : 'hover:text-white'
            }`}
          >
            <ThumbsUp className={`w-3 h-3 ${isUpvoted ? 'fill-white' : ''}`} />
            <span>{note.upvotes}</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(note);
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-[#ECECEC] hover:text-white bg-[#2F2F2F] hover:bg-[#383838] border border-[#424242] transition-colors cursor-pointer"
          >
            <Eye className="w-3 h-3 text-[#9E9E9E]" />
            <span>Preview</span>
          </button>

          {canDelete && (
            confirmDelete ? (
              <div className="flex items-center gap-1 bg-[#2F2F2F] border border-[#F87171] px-1.5 py-0.5 rounded-md">
                <span className="text-[10px] text-[#F87171] font-semibold">Del?</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                  className="px-1.5 py-0.5 rounded bg-[#F87171] text-black text-[10px] font-semibold cursor-pointer"
                >
                  Yes
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmDelete(false);
                  }}
                  className="px-1.5 py-0.5 rounded bg-[#212121] text-[#8E8E8E] text-[10px] cursor-pointer"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmDelete(true);
                }}
                title="Delete uploaded note"
                className="p-1 rounded-md text-[#8E8E8E] hover:text-[#F87171] hover:bg-[#2F2F2F] transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )
          )}

          <button
            onClick={handleDownload}
            disabled={downloadState === 'downloading'}
            title="Download PDF directly to your device"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              downloadState === 'done'
                ? 'bg-[#10A37F] text-white'
                : downloadState === 'downloading'
                ? 'bg-[#383838] text-white opacity-80 cursor-wait'
                : 'bg-white hover:bg-neutral-200 text-[#171717]'
            }`}
          >
            {downloadState === 'downloading' ? (
              <>
                <span className="w-2.5 h-2.5 border-2 border-neutral-400 border-t-neutral-900 rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : downloadState === 'done' ? (
              <>
                <CheckCircle className="w-3 h-3" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Download className="w-3 h-3" />
                <span>PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
