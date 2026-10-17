import React, { useState } from 'react';
import {
  GraduationCap,
  Layers,
  ChevronRight,
  BookOpen,
  FileText,
  Timer,
  Search,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { BRANCHES_DATA } from '../data/branchesData';
import { BranchIcon } from './BranchIcon';
import { Note, SectionType } from '../types';
import { useNotes } from '../context/NotesContext';
import { getOrCreateNoteForSubject } from '../utils/subjectNotesGenerator';
import {
  SppuSubject,
  getSppuSubjectsForBranchAndSemester
} from '../data/sppuSyllabusData';
import { SppuQuizModal } from './SppuQuizModal';
import { SppuPyqModal } from './SppuPyqModal';
import { getQuizAttemptsForSubject } from '../data/sppuQuizzesData';

interface BranchesSectionProps {
  onSelectBranchAndSem: (branchCode: string, sem?: number) => void;
  onSelectSubject: (subject: string) => void;
  onNavigate: (section: SectionType) => void;
  onPreviewNote?: (note: Note) => void;
}

export const BranchesSection: React.FC<BranchesSectionProps> = ({
  onSelectBranchAndSem,
  onSelectSubject,
  onNavigate,
  onPreviewNote
}) => {
  const { notes, setSelectedBranch, setSelectedSemester: setContextSemester, setSearchQuery } = useNotes();

  const [currentStep, setCurrentStep] = useState<'branches' | 'semesters' | 'subjects'>('branches');
  const [selectedBranchCode, setSelectedBranchCode] = useState<string>('CSE');
  const [selectedSemester, setSelectedSemester] = useState<number>(2);
  const [subjectSearch, setSubjectSearch] = useState<string>('');

  // Modals for PYQ and Quizzes
  const [quizModalOpen, setQuizModalOpen] = useState<boolean>(false);
  const [pyqModalOpen, setPyqModalOpen] = useState<boolean>(false);
  const [activeModalSubject, setActiveModalSubject] = useState<SppuSubject | null>(null);

  const currentBranch =
    BRANCHES_DATA.find((b) => b.code === selectedBranchCode) || BRANCHES_DATA[0];

  const currentSemesterSubjects = getSppuSubjectsForBranchAndSemester(
    selectedBranchCode,
    selectedSemester
  );

  const filteredSubjects = currentSemesterSubjects.filter((s) => {
    if (!subjectSearch.trim()) return true;
    const query = subjectSearch.toLowerCase();
    return (
      s.name.toLowerCase().includes(query) ||
      s.code.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query)
    );
  });

  const handleOpenNotes = (subjectName: string, semester: number) => {
    if (onPreviewNote) {
      const generated = getOrCreateNoteForSubject(
        subjectName,
        selectedBranchCode,
        notes,
        semester
      );
      onPreviewNote(generated);
    } else {
      setSelectedBranch(selectedBranchCode);
      setSelectedSemester(semester);
      setSearchQuery(subjectName);
      onSelectSubject(subjectName);
      onNavigate('browse');
    }
  };

  const handleOpenPyqs = (subj: SppuSubject) => {
    setActiveModalSubject(subj);
    setPyqModalOpen(true);
  };

  const handleOpenQuiz = (subj: SppuSubject) => {
    setActiveModalSubject(subj);
    setQuizModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ================= STEP 1: SELECT BRANCH ================= */}
      {currentStep === 'branches' && (
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#9E9E9E] mb-1">
              <GraduationCap className="w-3.5 h-3.5 text-white" />
              <span>SPPU University Engineering Streams · Pattern 2024 NEP</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Engineering Branches & Academic Streams
            </h1>
            <p className="text-xs sm:text-sm text-[#9E9E9E] mt-1 max-w-2xl">
              Select your engineering branch below to view semester syllabi, original SPPU past year question papers (PYQs), and unit-wise exam quizzes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BRANCHES_DATA.map((branch) => {
              return (
                <div
                  key={branch.code}
                  onClick={() => {
                    setSelectedBranchCode(branch.code);
                    setCurrentStep('semesters');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#2F2F2F] hover:bg-[#353535] border border-[#424242] hover:border-[#676767] rounded-xl p-5 transition-colors cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="w-9 h-9 rounded-lg bg-[#212121] border border-[#424242] text-white flex items-center justify-center">
                        <BranchIcon name={branch.iconName} className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-[#B4B4B4] bg-[#212121] px-2 py-0.5 rounded border border-[#424242]">
                          {branch.code}
                        </span>
                        <span className="text-[10px] text-[#8E8E8E] bg-[#212121] px-1.5 py-0.5 rounded border border-[#424242]">
                          Sem 1-8
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-semibold text-white">
                      {branch.name}
                    </h3>
                    <p className="text-xs text-[#9E9E9E] mt-1.5 line-clamp-2 leading-relaxed">
                      {branch.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#424242] flex items-center justify-between">
                    <span className="text-xs text-[#8E8E8E]">
                      SPPU Pattern 2024
                    </span>
                    <span className="text-xs font-medium text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Choose Semester</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#9E9E9E]" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= STEP 2: CHOOSE YOUR SEMESTER ================= */}
      {currentStep === 'semesters' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep('branches')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] border border-[#424242] text-xs font-medium text-[#ECECEC] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Branches</span>
            </button>
            <span className="text-[#666666]">/</span>
            <span className="text-xs font-medium text-white">
              {currentBranch.name} ({currentBranch.code})
            </span>
          </div>

          <div className="bg-[#2F2F2F] border border-[#424242] rounded-2xl p-6 sm:p-7">
            <div className="text-xs text-[#9E9E9E] font-medium mb-1">
              SPPU University 2024 Syllabus · NEP Pattern
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Choose Your Semester
            </h1>
            <p className="text-xs sm:text-sm text-[#9E9E9E] mt-1.5 max-w-2xl leading-relaxed">
              Below are all 8 semesters for <strong>{currentBranch.name}</strong>. Click on your semester to explore subjects, past year PYQ question papers, and unit-wise quizzes.
            </p>
          </div>

          {/* Semesters 1 to 8 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((semNum) => {
              const academicYear =
                semNum <= 2
                  ? 'FE (First Year)'
                  : semNum <= 4
                  ? 'SE (Second Year)'
                  : semNum <= 6
                  ? 'TE (Third Year)'
                  : 'BE (Final Year)';

              const subjectsForSem = getSppuSubjectsForBranchAndSemester(
                selectedBranchCode,
                semNum
              );

              return (
                <div
                  key={semNum}
                  onClick={() => {
                    setSelectedSemester(semNum);
                    setCurrentStep('subjects');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#2F2F2F] hover:bg-[#353535] border border-[#424242] hover:border-[#676767] rounded-xl p-5 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-[#B4B4B4]">
                        {academicYear}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#212121] text-[#9E9E9E] border border-[#424242]">
                        NEP 2024
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white">
                      Semester {semNum}
                    </h3>
                    <p className="text-xs text-[#9E9E9E] mt-1">
                      {subjectsForSem.length} Core Subjects (In-Sem 30M + End-Sem 70M)
                    </p>

                    <div className="mt-3.5 space-y-1 pl-2 border-l border-[#424242]">
                      {subjectsForSem.slice(0, 3).map((s) => (
                        <p key={s.code} className="text-[11px] text-[#B4B4B4] truncate">
                          · {s.name}
                        </p>
                      ))}
                      {subjectsForSem.length > 3 && (
                        <p className="text-[10px] text-[#787878]">
                          +{subjectsForSem.length - 3} more subjects
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-3.5 mt-4 border-t border-[#424242] flex items-center justify-between text-xs font-medium text-white group-hover:translate-x-0.5 transition-transform">
                    <span>View Subjects</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#9E9E9E]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= STEP 3: SEMESTER SUBJECTS WITH 3 OPTIONS ================= */}
      {currentStep === 'subjects' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentStep('semesters')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] border border-[#424242] text-xs font-medium text-[#ECECEC] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Semester</span>
              </button>
              <span className="text-[#666666]">/</span>
              <button
                onClick={() => setCurrentStep('branches')}
                className="text-xs text-[#9E9E9E] hover:text-white transition-colors cursor-pointer"
              >
                {currentBranch.name}
              </button>
              <span className="text-[#666666]">/</span>
              <span className="text-xs font-medium text-white">
                Semester {selectedSemester}
              </span>
            </div>

            {/* Semester Switcher Tabs */}
            <div className="flex items-center gap-1 bg-[#2F2F2F] p-1 rounded-xl border border-[#424242] overflow-x-auto scrollbar-none">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSemester(s)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedSemester === s
                      ? 'bg-white text-[#171717] font-semibold'
                      : 'text-[#9E9E9E] hover:text-white'
                  }`}
                >
                  Sem {s}
                </button>
              ))}
            </div>
          </div>

          {/* Header Banner */}
          <div className="bg-[#2F2F2F] border border-[#424242] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-[#B4B4B4] font-medium">
                  {currentBranch.code} · Semester {selectedSemester}
                </span>
                <span className="text-[10px] text-[#9E9E9E] border border-[#424242] bg-[#212121] px-1.5 py-0.2 rounded font-mono">
                  Pattern 2024
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Semester {selectedSemester} Courses & Modules
              </h2>
              <p className="text-xs text-[#9E9E9E] mt-1 max-w-xl leading-relaxed">
                Select among: <strong>Notes & Summaries</strong>, <strong>Past Year PYQ Papers</strong>, or <strong>Unit-wise Quizzes</strong> (20Q / 20M auto-submit).
              </p>
            </div>

            {/* Search Input Filter */}
            <div className="relative w-full md:w-64 shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#787878] pointer-events-none" />
              <input
                type="text"
                value={subjectSearch}
                onChange={(e) => setSubjectSearch(e.target.value)}
                placeholder="Search subject or code..."
                className="w-full bg-[#212121] border border-[#424242] rounded-xl text-xs text-white placeholder-[#787878] pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#676767]"
              />
            </div>
          </div>

          {/* Subjects Cards Grid with the 3 Distinct Options */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs text-[#9E9E9E]">
              <span>Subjects for Semester {selectedSemester} ({filteredSubjects.length} Courses)</span>
              <span>In-Sem: 30M · End-Sem: 70M</span>
            </div>

            {filteredSubjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredSubjects.map((subject) => {
                  const pastAttempts = getQuizAttemptsForSubject(subject.code);
                  const solvedCount = pastAttempts.length;

                  return (
                    <div
                      key={subject.code}
                      className="bg-[#2F2F2F] border border-[#424242] rounded-xl p-5 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono font-medium text-[#B4B4B4] bg-[#212121] px-2 py-0.5 rounded border border-[#424242]">
                              SPPU-{subject.code}
                            </span>
                            <span className="text-xs text-[#9E9E9E]">
                              {subject.credits} Credits · {subject.courseType}
                            </span>
                            {solvedCount > 0 && (
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#212121] text-[#10A37F] border border-[#424242] flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>{solvedCount} Quiz Solved</span>
                              </span>
                            )}
                          </div>

                          <h4 className="text-lg font-bold text-white">
                            {subject.name}
                          </h4>

                          <p className="text-xs text-[#9E9E9E] mt-1 max-w-2xl leading-relaxed">
                            {subject.description}
                          </p>
                        </div>

                        <div className="flex sm:flex-col items-end gap-1 shrink-0 text-right">
                          <span className="text-xs text-[#ECECEC] bg-[#212121] px-2.5 py-1 rounded-lg border border-[#424242]">
                            In-Sem: <strong>30M</strong> · End-Sem: <strong>70M</strong>
                          </span>
                          <span className="text-[11px] text-[#787878]">
                            6 Units Total
                          </span>
                        </div>
                      </div>

                      {/* Units Pill Summary */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#383838]">
                        <span className="text-[11px] text-[#8E8E8E] mr-1">
                          Syllabus Units:
                        </span>
                        {subject.units.map((u) => (
                          <span
                            key={u.unitNumber}
                            className="text-[11px] px-2 py-0.5 rounded bg-[#212121] text-[#B4B4B4] border border-[#424242]"
                            title={u.subtopics.join(', ')}
                          >
                            U{u.unitNumber}: {u.title.split('-')[0].split(':')[0].substring(0, 20)}...
                          </span>
                        ))}
                      </div>

                      {/* 3 Dedicated Options */}
                      <div className="pt-2 border-t border-[#383838] grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {/* Option 1: Notes & Study Material */}
                        <button
                          onClick={() => handleOpenNotes(subject.name, selectedSemester)}
                          className="p-3.5 rounded-xl bg-[#212121] hover:bg-[#282828] border border-[#424242] hover:border-[#676767] text-left transition-colors group cursor-pointer flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="w-7 h-7 rounded-lg bg-[#2F2F2F] text-white flex items-center justify-center border border-[#424242]">
                              <BookOpen className="w-3.5 h-3.5 text-white" />
                            </span>
                            <span className="text-[10px] text-[#8E8E8E]">
                              Option 1
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">
                              Notes & Study Material
                            </p>
                            <p className="text-[11px] text-[#9E9E9E] mt-0.5">
                              Handwritten notes, formulas & PDF download
                            </p>
                          </div>
                        </button>

                        {/* Option 2: Past Year PYQ Papers */}
                        <button
                          onClick={() => handleOpenPyqs(subject)}
                          className="p-3.5 rounded-xl bg-[#212121] hover:bg-[#282828] border border-[#424242] hover:border-[#676767] text-left transition-colors group cursor-pointer flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="w-7 h-7 rounded-lg bg-[#2F2F2F] text-white flex items-center justify-center border border-[#424242]">
                              <FileText className="w-3.5 h-3.5 text-white" />
                            </span>
                            <span className="text-[10px] text-[#8E8E8E]">
                              Option 2
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">
                              Past Year PYQ Papers
                            </p>
                            <p className="text-[11px] text-[#9E9E9E] mt-0.5">
                              Original In-Sem & End-Sem solved papers
                            </p>
                          </div>
                        </button>

                        {/* Option 3: Unit-wise Quizzes */}
                        <button
                          onClick={() => handleOpenQuiz(subject)}
                          className="p-3.5 rounded-xl bg-[#212121] hover:bg-[#282828] border border-[#424242] hover:border-[#676767] text-left transition-colors group cursor-pointer flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="w-7 h-7 rounded-lg bg-[#2F2F2F] text-white flex items-center justify-center border border-[#424242]">
                              <Timer className="w-3.5 h-3.5 text-white" />
                            </span>
                            <span className="text-[10px] text-[#8E8E8E]">
                              Option 3
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">
                              Unit-wise Quizzes (20Q / 20M)
                            </p>
                            <p className="text-[11px] text-[#9E9E9E] mt-0.5">
                              20 Qs per unit with 20 min auto-submit
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center bg-[#2F2F2F] rounded-xl border border-[#424242] text-[#8E8E8E] text-xs">
                No subjects found matching your query for Semester {selectedSemester}.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interactive SPPU Unit Quiz Modal */}
      <SppuQuizModal
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        subject={activeModalSubject}
        onOpenNotes={(unitNum) => {
          if (activeModalSubject) {
            handleOpenNotes(activeModalSubject.name, selectedSemester);
          }
        }}
      />

      {/* Interactive SPPU PYQ Papers Modal */}
      <SppuPyqModal
        isOpen={pyqModalOpen}
        onClose={() => setPyqModalOpen(false)}
        subject={activeModalSubject}
      />
    </div>
  );
};
