import React, { useState, useEffect } from 'react';
import {
  Search,
  Grid,
  List,
  RotateCcw,
  BookOpen,
  ArrowUpDown,
  X,
  FileQuestion,
  Upload,
  ChevronDown
} from 'lucide-react';
import { Note, SectionType } from '../types';
import { BRANCHES_DATA, NOTE_CATEGORIES } from '../data/branchesData';
import { NoteCard } from './NoteCard';
import { useNotes } from '../context/NotesContext';

interface BrowseNotesSectionProps {
  notes: Note[];
  initialSubjectFilter: string;
  onPreviewNote: (note: Note) => void;
  onNavigate: (section: SectionType) => void;
}

export const BrowseNotesSection: React.FC<BrowseNotesSectionProps> = ({
  initialSubjectFilter,
  onPreviewNote,
  onNavigate
}) => {
  const {
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
    resetFilters
  } = useNotes();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeSubjectFilter, setActiveSubjectFilter] = useState(initialSubjectFilter || '');

  useEffect(() => {
    if (initialSubjectFilter) {
      setActiveSubjectFilter(initialSubjectFilter);
      setSearchQuery(initialSubjectFilter);
    }
  }, [initialSubjectFilter, setSearchQuery]);

  const handleClearSubjectFilter = () => {
    setActiveSubjectFilter('');
    setSearchQuery('');
  };

  const branchList = [
    { code: 'ALL', name: 'All Branches' },
    ...BRANCHES_DATA.map((b) => ({ code: b.code, name: b.name }))
  ];

  const semestersList = [1, 2, 3, 4, 5, 6, 7, 8];

  const hasActiveFilters =
    selectedBranch !== 'ALL' ||
    selectedSemester !== null ||
    selectedCategory !== 'ALL' ||
    searchQuery.trim() !== '' ||
    activeSubjectFilter !== '';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header & Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#9E9E9E] mb-1">
            <BookOpen className="w-3.5 h-3.5 text-white" />
            <span>Academic Library</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Browse Engineering Notes
          </h1>
          <p className="text-xs sm:text-sm text-[#9E9E9E] mt-1">
            Filter by branch, semester, course, and note format with instant PDF previews.
          </p>
        </div>

        {/* View Mode & Upload CTA */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#2F2F2F] border border-[#424242] rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#171717]'
                  : 'text-[#9E9E9E] hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              title="List View"
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-[#171717]'
                  : 'text-[#9E9E9E] hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => onNavigate('upload')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white hover:bg-neutral-200 text-[#171717] font-semibold text-xs transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Notes</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="bg-[#2F2F2F] border border-[#424242] rounded-2xl p-4 sm:p-5 space-y-4">
        {/* Search Input Row with Sort */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-3 text-[#787878] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by note title, subject, formula, or author..."
              className="w-full bg-[#212121] text-xs text-white placeholder-[#787878] pl-9 pr-9 py-2 rounded-xl border border-[#424242] focus:border-[#676767] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-[#8E8E8E] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto appearance-none bg-[#212121] text-[#ECECEC] text-xs font-medium pl-8 pr-8 py-2 rounded-xl border border-[#424242] focus:border-[#676767] focus:outline-none cursor-pointer"
              >
                <option value="popular">Most Downloaded</option>
                <option value="upvotes">Most Helpful</option>
                <option value="newest">Recently Uploaded</option>
                <option value="pages">Most Comprehensive</option>
              </select>
              <ArrowUpDown className="w-3 h-3 absolute left-3 top-3 text-[#787878] pointer-events-none" />
              <ChevronDown className="w-3 h-3 absolute right-3 top-3 text-[#787878] pointer-events-none" />
            </div>

            {hasActiveFilters && (
              <button
                onClick={() => {
                  resetFilters();
                  handleClearSubjectFilter();
                }}
                title="Reset all filters"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#212121] hover:bg-[#282828] text-[#B4B4B4] hover:text-white text-xs font-medium border border-[#424242] transition-colors shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Branch Filter Tabs */}
        <div>
          <div className="flex items-center justify-between text-xs text-[#9E9E9E] mb-2 font-medium">
            <span>Branch / Department</span>
            {selectedBranch !== 'ALL' && (
              <span className="text-white font-medium">{selectedBranch} selected</span>
            )}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {branchList.map((branch) => {
              const isSelected = selectedBranch === branch.code;
              return (
                <button
                  key={branch.code}
                  onClick={() => setSelectedBranch(branch.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-white text-[#171717] font-semibold'
                      : 'bg-[#212121] text-[#9E9E9E] hover:text-white border border-[#424242]'
                  }`}
                >
                  {branch.code === 'ALL' ? 'All Branches' : branch.code}
                </button>
              );
            })}
          </div>
        </div>

        {/* Semester & Category Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[#424242]">
          {/* Semester Selector */}
          <div>
            <div className="text-xs text-[#9E9E9E] mb-2 font-medium flex items-center justify-between">
              <span>Semester</span>
              {selectedSemester !== null && (
                <button
                  onClick={() => setSelectedSemester(null)}
                  className="text-xs text-[#B4B4B4] hover:underline"
                >
                  Clear Sem
                </button>
              )}
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => setSelectedSemester(null)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium shrink-0 cursor-pointer ${
                  selectedSemester === null
                    ? 'bg-white text-[#171717] font-semibold'
                    : 'bg-[#212121] text-[#9E9E9E] hover:text-white border border-[#424242]'
                }`}
              >
                All Sem
              </button>
              {semestersList.map((sem) => {
                const isSelected = selectedSemester === sem;
                return (
                  <button
                    key={sem}
                    onClick={() => setSelectedSemester(sem)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#171717] font-semibold'
                        : 'bg-[#212121] text-[#9E9E9E] hover:text-white border border-[#424242]'
                    }`}
                  >
                    Sem {sem}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <div className="text-xs text-[#9E9E9E] mb-2 font-medium flex items-center justify-between">
              <span>Material Type</span>
              {selectedCategory !== 'ALL' && (
                <button
                  onClick={() => setSelectedCategory('ALL')}
                  className="text-xs text-[#B4B4B4] hover:underline"
                >
                  Clear Category
                </button>
              )}
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium shrink-0 cursor-pointer ${
                  selectedCategory === 'ALL'
                    ? 'bg-white text-[#171717] font-semibold'
                    : 'bg-[#212121] text-[#9E9E9E] hover:text-white border border-[#424242]'
                }`}
              >
                All Types
              </button>
              {NOTE_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#171717] font-semibold'
                        : 'bg-[#212121] text-[#9E9E9E] hover:text-white border border-[#424242]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Subject Filter Badge */}
        {activeSubjectFilter && (
          <div className="flex items-center gap-2 p-2.5 bg-[#212121] border border-[#424242] rounded-xl text-xs text-[#B4B4B4]">
            <span>Filtering for: <strong className="text-white">{activeSubjectFilter}</strong></span>
            <button
              onClick={handleClearSubjectFilter}
              className="ml-auto p-1 text-[#8E8E8E] hover:text-white rounded bg-[#2F2F2F] border border-[#424242] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#8E8E8E]">
        <div>
          Showing <strong className="text-white">{filteredNotes.length}</strong> note
          {filteredNotes.length === 1 ? '' : 's'}
        </div>
      </div>

      {/* Notes Grid or List */}
      {filteredNotes.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
              : 'space-y-3.5'
          }
        >
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onPreview={onPreviewNote}
              variant={viewMode}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center bg-[#2F2F2F] border border-[#424242] rounded-2xl max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-xl bg-[#212121] border border-[#424242] text-[#8E8E8E] flex items-center justify-center mx-auto mb-3">
            <FileQuestion className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No notes found</h3>
          <p className="text-xs text-[#9E9E9E] mt-1.5 leading-relaxed">
            We couldn't find any documents matching your current filters. Try resetting your search or branch selection.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                resetFilters();
                handleClearSubjectFilter();
              }}
              className="px-4 py-2 rounded-xl bg-[#212121] hover:bg-[#383838] text-white border border-[#424242] text-xs font-medium transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
            <button
              onClick={() => onNavigate('upload')}
              className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-[#171717] text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Notes</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
