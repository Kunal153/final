import React, { useState } from 'react';
import {
  X,
  FileText,
  Download,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  HelpCircle,
  Clock,
  Printer
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { SppuSubject } from '../data/sppuSyllabusData';
import { SppuPyqPaper, PyqQuestion, getPyqPapersForSubject } from '../data/sppuPyqData';

interface SppuPyqModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: SppuSubject | null;
}

export const SppuPyqModal: React.FC<SppuPyqModalProps> = ({
  isOpen,
  onClose,
  subject
}) => {
  const [selectedPaperId, setSelectedPaperId] = useState<string>('');
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'paper' | 'solutions'>('paper');

  if (!isOpen || !subject) return null;

  const papers = getPyqPapersForSubject(subject.code, subject.name);
  const activePaper = papers.find((p) => p.id === selectedPaperId) || papers[0];

  const toggleSolution = (qNum: string) => {
    setExpandedSolutions((prev) => ({
      ...prev,
      [qNum]: !prev[qNum]
    }));
  };

  const expandAllSolutions = () => {
    const allExpanded: Record<string, boolean> = {};
    activePaper.questionGroups.forEach((group) => {
      group.primaryQuestions.forEach((q) => {
        allExpanded[q.questionNumber] = true;
      });
      group.orOptionQuestions.forEach((q) => {
        allExpanded[q.questionNumber] = true;
      });
    });
    setExpandedSolutions(allExpanded);
  };

  const collapseAllSolutions = () => {
    setExpandedSolutions({});
  };

  // Download PDF generator using jsPDF
  const handleDownloadPdf = () => {
    if (!activePaper) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 15;

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('SAVITRIBAI PHULE PUNE UNIVERSITY', pageWidth / 2, y, { align: 'center' });
    y += 6;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`${activePaper.examType} - ${activePaper.examSession}`, pageWidth / 2, y, { align: 'center' });
    y += 6;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`[SPPU-${activePaper.subjectCode}] ${activePaper.subjectName}`, pageWidth / 2, y, { align: 'center' });
    y += 8;

    // Exam Meta line
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Time Allowed: ${activePaper.timeAllowedHours}`, 15, y);
    doc.text(`Max Marks: ${activePaper.totalMarks} Marks`, pageWidth - 15, y, { align: 'right' });
    y += 4;
    doc.setDrawColor(180, 180, 180);
    doc.line(15, y, pageWidth - 15, y);
    y += 6;

    // Instructions
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Instructions to Candidates:', 15, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    activePaper.instructions.forEach((inst, idx) => {
      doc.text(`${idx + 1}. ${inst}`, 18, y);
      y += 4.5;
    });
    y += 4;
    doc.line(15, y, pageWidth - 15, y);
    y += 7;

    // Question Groups
    activePaper.questionGroups.forEach((group) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(40, 40, 40);
      doc.text(group.groupTitle, 15, y);
      doc.setTextColor(0, 0, 0);
      y += 6;

      // Primary Questions
      group.primaryQuestions.forEach((q) => {
        if (y > 260) {
          doc.addPage();
          y = 20;
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(`${q.questionNumber}`, 15, y);
        doc.text(`[${q.marks} Marks]`, pageWidth - 15, y, { align: 'right' });

        doc.setFont('helvetica', 'normal');
        const splitText = doc.splitTextToSize(q.questionText, pageWidth - 50);
        doc.text(splitText, 32, y);
        y += splitText.length * 4.5 + 4;

        // Solution Summary
        if (q.solution) {
          doc.setFont('helvetica', 'italic');
          doc.setFontSize(8);
          doc.setTextColor(80, 80, 80);
          const solSummary = doc.splitTextToSize(`Ans: ${q.solution.definitionAndOverview} Result: ${q.solution.conclusionOrFinalAnswer}`, pageWidth - 40);
          doc.text(solSummary, 32, y);
          doc.setTextColor(0, 0, 0);
          y += solSummary.length * 4 + 4;
        }
      });

      // OR Divider
      if (group.orOptionQuestions.length > 0) {
        if (y > 265) {
          doc.addPage();
          y = 20;
        }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text('--- OR ---', pageWidth / 2, y, { align: 'center' });
        y += 6;

        group.orOptionQuestions.forEach((q) => {
          if (y > 260) {
            doc.addPage();
            y = 20;
          }

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          doc.text(`${q.questionNumber}`, 15, y);
          doc.text(`[${q.marks} Marks]`, pageWidth - 15, y, { align: 'right' });

          doc.setFont('helvetica', 'normal');
          const splitText = doc.splitTextToSize(q.questionText, pageWidth - 50);
          doc.text(splitText, 32, y);
          y += splitText.length * 4.5 + 4;

          if (q.solution) {
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(8);
            doc.setTextColor(80, 80, 80);
            const solSummary = doc.splitTextToSize(`Ans: ${q.solution.definitionAndOverview} Result: ${q.solution.conclusionOrFinalAnswer}`, pageWidth - 40);
            doc.text(solSummary, 32, y);
            doc.setTextColor(0, 0, 0);
            y += solSummary.length * 4 + 4;
          }
        });
      }

      y += 6;
    });

    // Save PDF
    doc.save(`SPPU_${activePaper.subjectCode}_${activePaper.examSession.replace(/[^a-zA-Z0-9]/g, '_')}_Paper.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#2F2F2F] border border-[#424242] rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-[#ECECEC]">
        
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-[#424242] bg-[#212121] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2F2F2F] border border-[#424242] flex items-center justify-center text-white">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-[#ECECEC] bg-[#2F2F2F] px-2 py-0.5 rounded border border-[#424242]">
                  SPPU-{subject.code}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2F2F2F] text-[#8E8E8E] border border-[#424242]">
                  Past Question Papers
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-semibold text-white truncate max-w-md sm:max-w-xl mt-0.5">
                {subject.name} - PYQs & Model Solutions
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ECECEC] hover:bg-white text-[#212121] text-xs font-semibold transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] text-[#8E8E8E] hover:text-white border border-[#424242] flex items-center justify-center transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Paper Selector Bar */}
        <div className="px-5 py-2.5 border-b border-[#424242] bg-[#212121] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {papers.map((p) => {
              const isSelected = p.id === activePaper.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPaperId(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#ECECEC] text-[#212121] font-semibold'
                      : 'bg-[#2F2F2F] text-[#8E8E8E] hover:text-[#ECECEC] border border-[#424242]'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{p.examSession} ({p.totalMarks}M)</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={expandAllSolutions}
              className="text-xs text-[#8E8E8E] hover:text-white font-medium cursor-pointer"
            >
              Expand All
            </button>
            <span className="text-[#424242]">|</span>
            <button
              onClick={collapseAllSolutions}
              className="text-xs text-[#8E8E8E] hover:text-white font-medium cursor-pointer"
            >
              Collapse
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#2F2F2F]">
          {/* SPPU Formal Header Sheet */}
          <div className="p-5 rounded-xl bg-[#212121] border border-[#424242] text-center space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider text-[#8E8E8E]">
              SAVITRIBAI PHULE PUNE UNIVERSITY
            </p>
            <h3 className="text-base font-semibold text-white">
              {activePaper.examType}
            </h3>
            <p className="text-xs text-[#B4B4B4]">
              Course: <strong className="text-white">[SPPU-{activePaper.subjectCode}] {activePaper.subjectName}</strong>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs text-[#8E8E8E] font-mono">
              <span className="px-2.5 py-1 rounded bg-[#2F2F2F] border border-[#424242]">
                Time: {activePaper.timeAllowedHours}
              </span>
              <span className="px-2.5 py-1 rounded bg-[#2F2F2F] border border-[#424242]">
                Max: {activePaper.totalMarks} Marks
              </span>
              <span className="px-2.5 py-1 rounded bg-[#2F2F2F] border border-[#424242]">
                {activePaper.syllabusPattern}
              </span>
            </div>
            
            {/* Candidate Instructions */}
            <div className="mt-3 pt-3 border-t border-[#424242] text-left text-xs text-[#8E8E8E] space-y-1">
              <strong className="text-white block">Instructions:</strong>
              {activePaper.instructions.map((inst, idx) => (
                <p key={idx} className="leading-relaxed">
                  {idx + 1}. {inst}
                </p>
              ))}
            </div>
          </div>

          {/* Question Groups */}
          <div className="space-y-5">
            {activePaper.questionGroups.map((group, gIdx) => (
              <div
                key={gIdx}
                className="bg-[#212121] border border-[#424242] rounded-xl p-5 sm:p-6 space-y-4"
              >
                {/* Group Heading */}
                <div className="flex items-center justify-between pb-3 border-b border-[#424242]">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#8E8E8E]" />
                    <span>{group.groupTitle}</span>
                  </h4>
                  <span className="text-xs text-[#8E8E8E]">
                    Solve Primary OR Option
                  </span>
                </div>

                {/* Primary Questions */}
                <div className="space-y-3">
                  {group.primaryQuestions.map((q) => (
                    <QuestionCard
                      key={q.questionNumber}
                      question={q}
                      isExpanded={!!expandedSolutions[q.questionNumber]}
                      onToggle={() => toggleSolution(q.questionNumber)}
                    />
                  ))}
                </div>

                {/* OR Option Divider */}
                {group.orOptionQuestions.length > 0 && (
                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#424242]"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-[#212121] px-4 py-1 text-xs font-mono text-[#8E8E8E] rounded-md border border-[#424242]">
                        OR
                      </span>
                    </div>
                  </div>
                )}

                {/* OR Option Questions */}
                {group.orOptionQuestions.length > 0 && (
                  <div className="space-y-3">
                    {group.orOptionQuestions.map((q) => (
                      <QuestionCard
                        key={q.questionNumber}
                        question={q}
                        isExpanded={!!expandedSolutions[q.questionNumber]}
                        onToggle={() => toggleSolution(q.questionNumber)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Download Bar for mobile */}
          <div className="sm:hidden pt-2">
            <button
              onClick={handleDownloadPdf}
              className="w-full py-2.5 rounded-lg bg-[#ECECEC] hover:bg-white text-[#212121] font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for individual question with expandable solution
const QuestionCard: React.FC<{
  question: PyqQuestion;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ question, isExpanded, onToggle }) => {
  return (
    <div className="p-4 rounded-xl bg-[#262626] border border-[#383838] hover:border-[#424242] transition-all space-y-2.5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-white bg-[#212121] px-2 py-0.5 rounded border border-[#424242]">
            {question.questionNumber}
          </span>
          <span className="text-xs text-[#8E8E8E]">
            Unit {question.unitNumber}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#212121] text-[#ECECEC] border border-[#424242]">
            {question.marks}M
          </span>

          <button
            onClick={onToggle}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#212121] hover:bg-[#303030] text-xs font-medium text-[#ECECEC] border border-[#424242] transition-colors cursor-pointer"
          >
            <span>{isExpanded ? 'Hide' : 'Solution'}</span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm font-medium text-[#ECECEC] leading-relaxed">
        {question.questionText}
      </p>

      {/* Expandable Model Solution */}
      {isExpanded && question.solution && (
        <div className="mt-3 pt-3 border-t border-[#383838] space-y-3 animate-in fade-in duration-150">
          <div className="p-3 rounded-lg bg-[#212121] border border-[#424242] space-y-1.5 text-xs">
            <strong className="text-white flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Model Answer:</span>
            </strong>
            <p className="text-[#B4B4B4] leading-relaxed">
              {question.solution.definitionAndOverview}
            </p>
          </div>

          {/* Key Formulas */}
          {question.solution.keyFormulasOrEquations && question.solution.keyFormulasOrEquations.length > 0 && (
            <div className="p-3 rounded-lg bg-[#212121] border border-[#424242] text-xs space-y-1">
              <span className="font-medium text-white block">
                Governing Formulas:
              </span>
              <ul className="list-disc list-inside space-y-1 font-mono text-[#ECECEC]">
                {question.solution.keyFormulasOrEquations.map((f, fIdx) => (
                  <li key={fIdx}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Step by step derivation */}
          <div className="space-y-1 text-xs text-[#B4B4B4]">
            <span className="font-medium text-white block">
              Step-by-Step Solution:
            </span>
            <div className="space-y-1 pl-2 border-l border-[#424242]">
              {question.solution.stepByStepSolution.map((step, sIdx) => (
                <p key={sIdx} className="leading-relaxed">
                  {step}
                </p>
              ))}
            </div>
          </div>

          {/* Diagram Note if present */}
          {question.diagramDescription && (
            <div className="p-2.5 rounded-lg bg-[#212121] border border-[#424242] text-[11px] text-[#8E8E8E]">
              <strong className="text-white">Diagram Guidance: </strong>
              {question.diagramDescription}
            </div>
          )}

          {/* Final Answer Box */}
          <div className="p-3 rounded-lg bg-[#212121] border border-emerald-500/30 text-xs flex items-center justify-between gap-2">
            <span className="font-medium text-emerald-400">
              Final Answer: {question.solution.conclusionOrFinalAnswer}
            </span>
          </div>

          {/* Examiner Tip */}
          <div className="text-[11px] text-[#8E8E8E] italic flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#B4B4B4]" />
            <span>Examiner Tip: {question.solution.examinerTips}</span>
          </div>
        </div>
      )}
    </div>
  );
};
