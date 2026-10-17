import React, { useState, useRef } from 'react';
import {
  ChevronRight,
  Search,
  BookOpen,
  GraduationCap,
  ArrowLeft,
  FileText,
  Timer,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { Note, SectionType } from '../types';
import { BRANCHES_DATA } from '../data/branchesData';
import { BranchIcon } from './BranchIcon';
import { useNotes } from '../context/NotesContext';
import { getOrCreateNoteForSubject } from '../utils/subjectNotesGenerator';
import {
  getSppuSubjectsForBranchAndSemester,
  SppuSubject
} from '../data/sppuSyllabusData';
import { SppuQuizModal } from './SppuQuizModal';
import { SppuPyqModal } from './SppuPyqModal';
import { getQuizAttemptsForSubject } from '../data/sppuQuizzesData';
import { HeroFrontPage } from './HeroFrontPage';

interface HomeSectionProps {
  notes: Note[];
  onNavigate: (section: SectionType) => void;
  onSelectSubject: (subject: string) => void;
  onPreviewNote: (note: Note) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  notes,
  onNavigate,
  onSelectSubject,
  onPreviewNote
}) => {
  const { setSelectedBranch, setSelectedSemester: setContextSemester, setSearchQuery } = useNotes();

  const [selectedBranchCode, setSelectedBranchCode] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [subjectQuery, setSubjectQuery] = useState<string>('');

  const branchSectionRef = useRef<HTMLDivElement | null>(null);

  // Modals for PYQ and Quizzes
  const [quizModalOpen, setQuizModalOpen] = useState<boolean>(false);
  const [pyqModalOpen, setPyqModalOpen] = useState<boolean>(false);
  const [activeModalSubject, setActiveModalSubject] = useState<SppuSubject | null>(null);

  const activeBranch = selectedBranchCode
    ? BRANCHES_DATA.find((b) => b.code === selectedBranchCode) || BRANCHES_DATA[0]
    : null;

  const currentSubjects =
    selectedBranchCode && selectedSemester
      ? getSppuSubjectsForBranchAndSemester(selectedBranchCode, selectedSemester)
      : [];

  const filteredSubjects = currentSubjects.filter((s) => {
    if (!subjectQuery.trim()) return true;
    const q = subjectQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
    );
  });

  const handleStartPreparation = () => {
    if (branchSectionRef.current) {
      branchSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 500, behavior: 'smooth' });
    }
  };

  const handleOpenSubjectNotes = (subj: SppuSubject) => {
    if (!activeBranch || !selectedSemester) return;
    const note = getOrCreateNoteForSubject(subj.name, activeBranch.code, notes, selectedSemester);
    onPreviewNote(note);
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
    <div className="min-h-screen space-y-12 pb-16">
      {/* ================= HERO FRONT PAGE ================= */}
      {!selectedBranchCode && (
        <HeroFrontPage onStartPreparation={handleStartPreparation} />
      )}

      <div ref={branchSectionRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        {/* ================= STEP 1: SELECT YOUR BRANCH ================= */}
        {!selectedBranchCode && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2F2F2F] border border-[#424242] text-xs text-[#B4B4B4] mb-1">
                <GraduationCap className="w-3.5 h-3.5 text-white" />
                <span>SPPU University · 2024 NEP Pattern</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Choose Your Engineering Branch
              </h2>
              <p className="text-xs sm:text-sm text-[#9E9E9E] max-w-xl mx-auto">
                Select your stream to access semester syllabi, verified lecture notes, original past year question papers, and unit-wise mock tests.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BRANCHES_DATA.map((branch, index) => {
                const sequenceNumber = index + 1;

                return (
                  <div
                    key={branch.code}
                    onClick={() => {
                      setSelectedBranchCode(branch.code);
                      setSelectedSemester(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group p-5 rounded-xl bg-[#2F2F2F] hover:bg-[#353535] border border-[#424242] hover:border-[#676767] transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-[#212121] text-[#9E9E9E] border border-[#424242]">
                          #{sequenceNumber}
                        </span>
                        <span className="text-[11px] font-mono text-[#B4B4B4] bg-[#212121] px-2 py-0.5 rounded border border-[#424242]">
                          {branch.code}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-2.5">
                        <div className="w-10 h-10 rounded-lg bg-[#212121] border border-[#424242] flex items-center justify-center text-white shrink-0 group-hover:border-[#676767] transition-colors">
                          <BranchIcon name={branch.iconName} className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-base font-semibold text-white group-hover:text-white transition-colors">
                          {branch.name}
                        </h3>
                      </div>

                      <p className="text-xs text-[#9E9E9E] line-clamp-2 leading-relaxed">
                        {branch.shortDesc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-[#424242] flex items-center justify-between text-xs">
                      <span className="text-[#8E8E8E]">
                        Sem 1 – 8 Curricula
                      </span>
                      <span className="text-white font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>Select Semester</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 2: CHOOSE YOUR SEMESTER ================= */}
        {selectedBranchCode && selectedSemester === null && activeBranch && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedBranchCode(null);
                  setSelectedSemester(null);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] border border-[#424242] text-xs font-medium text-[#ECECEC] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Branches</span>
              </button>
              <span className="text-[#666666]">/</span>
              <span className="text-xs font-medium text-white">
                {activeBranch.name} ({activeBranch.code})
              </span>
            </div>

            <div className="bg-[#2F2F2F] border border-[#424242] rounded-2xl p-6 sm:p-7">
              <div className="text-xs text-[#9E9E9E] font-medium mb-1">
                SPPU Pattern 2024 NEP Curriculum
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Choose Your Semester
              </h2>
              <p className="text-xs sm:text-sm text-[#9E9E9E] mt-1.5 max-w-2xl leading-relaxed">
                Select your semester for <strong>{activeBranch.name}</strong> to view courses, verified notes, past examination papers, and unit-wise mock quizzes.
              </p>
            </div>

            {/* Semester Cards 1 through 8 */}
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
                      setSubjectQuery('');
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
                        {subjectsForSem.length} Subjects (In-Sem 30M + End-Sem 70M)
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
                      <span>View Courses</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#9E9E9E]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 3: SEMESTER SUBJECTS WITH 3 OPTIONS ================= */}
        {selectedBranchCode && selectedSemester !== null && activeBranch && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedSemester(null)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] border border-[#424242] text-xs font-medium text-[#ECECEC] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Choose Semester</span>
                </button>
                <span className="text-[#666666]">/</span>
                <button
                  onClick={() => {
                    setSelectedBranchCode(null);
                    setSelectedSemester(null);
                  }}
                  className="text-xs text-[#9E9E9E] hover:text-white transition-colors cursor-pointer"
                >
                  {activeBranch.name}
                </button>
                <span className="text-[#666666]">/</span>
                <span className="text-xs font-medium text-white">
                  Semester {selectedSemester}
                </span>
              </div>

              {/* Semester Tabs */}
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

            {/* Banner */}
            <div className="bg-[#2F2F2F] border border-[#424242] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-[#B4B4B4] font-medium">
                    {activeBranch.code} · Semester {selectedSemester}
                  </span>
                  <span className="text-[10px] text-[#9E9E9E] border border-[#424242] bg-[#212121] px-1.5 py-0.2 rounded font-mono">
                    Pattern 2024
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Semester {selectedSemester} Subjects Directory
                </h2>
                <p className="text-xs text-[#9E9E9E] mt-1 max-w-xl leading-relaxed">
                  Select among: <strong>Notes & Summaries</strong>, <strong>Past Year PYQ Papers</strong> (with step marking), or <strong>Unit-wise Quizzes</strong> (20Q / 20 min auto-submit).
                </p>
              </div>

              <div className="relative w-full md:w-64 shrink-0">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#787878] pointer-events-none" />
                <input
                  type="text"
                  value={subjectQuery}
                  onChange={(e) => setSubjectQuery(e.target.value)}
                  placeholder="Search subject or code..."
                  className="w-full bg-[#212121] border border-[#424242] rounded-xl text-xs text-white placeholder-[#787878] pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#676767]"
                />
              </div>
            </div>

            {/* Subjects List with the 3 Dedicated Options */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs text-[#9E9E9E]">
                <span>Curriculum Courses ({filteredSubjects.length} Core Subjects)</span>
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

                        {/* Units summary */}
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

                        {/* 3 Dedicated Action Options */}
                        <div className="pt-2 border-t border-[#383838] grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {/* Option 1: Notes & Study Material */}
                          <button
                            onClick={() => handleOpenSubjectNotes(subject)}
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
      </div>

      {/* Interactive SPPU Unit Quiz Modal */}
      <SppuQuizModal
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        subject={activeModalSubject}
        onOpenNotes={() => {
          if (activeModalSubject) {
            handleOpenSubjectNotes(activeModalSubject);
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
