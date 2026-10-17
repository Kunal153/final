import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Timer,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  RotateCcw,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  BookOpen,
  Eye,
  Flag,
  Share2,
  Calendar,
  Flame
} from 'lucide-react';
import {
  UnitQuiz,
  QuizQuestion,
  QuizAttemptResult,
  getQuizForSubjectAndUnit,
  saveQuizAttempt,
  getQuizAttemptsForSubject,
  getBestAttemptForUnit
} from '../data/sppuQuizzesData';
import { SppuSubject, SppuSubjectUnit } from '../data/sppuSyllabusData';

interface SppuQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: SppuSubject | null;
  initialUnitNumber?: number;
  onOpenNotes?: (unitNumber: number) => void;
}

export const SppuQuizModal: React.FC<SppuQuizModalProps> = ({
  isOpen,
  onClose,
  subject,
  initialUnitNumber = 1,
  onOpenNotes
}) => {
  const [viewState, setViewState] = useState<'select-unit' | 'active-quiz' | 'result'>('select-unit');
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<number>(initialUnitNumber);
  const [currentQuiz, setCurrentQuiz] = useState<UnitQuiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  
  // Quiz running state
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(20 * 60);
  const [quizStartTime, setQuizStartTime] = useState<number>(Date.now());
  const [autoSubmittedAlert, setAutoSubmittedAlert] = useState<boolean>(false);
  const [activeResult, setActiveResult] = useState<QuizAttemptResult | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'correct'>('all');
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync initial unit when modal opens
  useEffect(() => {
    if (isOpen && subject) {
      setSelectedUnitNumber(initialUnitNumber);
      setViewState('select-unit');
      setAutoSubmittedAlert(false);
      setShowConfirmSubmit(false);
    }
  }, [isOpen, subject, initialUnitNumber]);

  // Countdown timer logic with auto-submit at 00:00
  useEffect(() => {
    if (viewState === 'active-quiz' && timeRemainingSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [viewState, timeRemainingSeconds]);

  if (!isOpen || !subject) return null;

  // Start Quiz handler
  const handleStartQuiz = (unitNumber: number) => {
    const unitData = subject.units.find((u) => u.unitNumber === unitNumber) || subject.units[0];
    const quiz = getQuizForSubjectAndUnit(
      subject.code,
      subject.name,
      unitNumber,
      unitData ? unitData.title : `Unit ${unitNumber}`
    );

    setCurrentQuiz(quiz);
    setSelectedUnitNumber(unitNumber);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setTimeRemainingSeconds(quiz.durationMinutes * 60);
    setQuizStartTime(Date.now());
    setAutoSubmittedAlert(false);
    setShowConfirmSubmit(false);
    setViewState('active-quiz');
  };

  const handleAutoSubmit = () => {
    setAutoSubmittedAlert(true);
    processQuizSubmission(true);
  };

  const handleManualSubmit = () => {
    setShowConfirmSubmit(false);
    processQuizSubmission(false);
  };

  const processQuizSubmission = (isAutoSubmitted: boolean) => {
    if (!currentQuiz) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const questions = currentQuiz.questions;
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    questions.forEach((q) => {
      const selected = userAnswers[q.id];
      if (selected === undefined) {
        unansweredCount++;
      } else if (selected === q.correctIndex) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const score = correctCount;
    const percentage = Math.round((score / questions.length) * 100);
    const timeSpentSeconds = Math.max(1, Math.round((Date.now() - quizStartTime) / 1000));

    let motivationalMsg: string | undefined;
    let congratulatoryMsg: string | undefined;

    if (score < 12) {
      motivationalMsg = `Review the unit notes and formula sheets, then retake the quiz to strengthen your preparation.`;
    } else if (score >= 15) {
      congratulatoryMsg = `Excellent performance! You scored distinction-grade marks in this unit.`;
    }

    const result: QuizAttemptResult = {
      attemptId: `att-${Date.now()}`,
      subjectCode: subject.code,
      subjectName: subject.name,
      unitNumber: currentQuiz.unitNumber,
      unitTitle: currentQuiz.unitTitle,
      score,
      percentage,
      totalQuestions: questions.length,
      correctCount,
      incorrectCount,
      unansweredCount,
      timeSpentSeconds,
      completedAt: new Date().toISOString(),
      userAnswers,
      isAutoSubmitted,
      motivationalMessage: motivationalMsg,
      congratulatoryMessage: congratulatoryMsg
    };

    saveQuizAttempt(result);
    setActiveResult(result);
    setViewState('result');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ: QuizQuestion | undefined = currentQuiz?.questions[currentQuestionIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#2F2F2F] border border-[#424242] rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-[#ECECEC]">
        
        {/* Modal Top Header */}
        <div className="px-5 py-3.5 border-b border-[#424242] bg-[#212121] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2F2F2F] border border-[#424242] flex items-center justify-center text-white">
              <Timer className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-white bg-[#2F2F2F] px-2 py-0.5 rounded border border-[#424242]">
                  SPPU-{subject.code}
                </span>
                <span className="text-xs text-[#8E8E8E]">
                  20 Qs · 20 Mins
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-semibold text-white truncate max-w-md sm:max-w-xl mt-0.5">
                {subject.name} - Unit Mock Tests
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {viewState === 'active-quiz' && (
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono font-medium text-xs border ${
                  timeRemainingSeconds <= 180
                    ? 'bg-[#212121] text-red-400 border-red-500/50 animate-pulse'
                    : 'bg-[#212121] text-white border-[#424242]'
                }`}
              >
                <Timer className="w-3.5 h-3.5" />
                <span>{formatTime(timeRemainingSeconds)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] text-[#8E8E8E] hover:text-white border border-[#424242] flex items-center justify-center transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#2F2F2F]">
          {/* VIEW 1: UNIT SELECTION LIST */}
          {viewState === 'select-unit' && (
            <div className="space-y-5">
              <div className="bg-[#212121] border border-[#424242] rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white">
                  Unit-wise Mock Tests for {subject.name}
                </h3>
                <p className="text-xs text-[#B4B4B4] mt-1 leading-relaxed">
                  20 questions per unit with a 20-minute countdown timer. Auto-submits when time expires.
                </p>
              </div>

              {/* Units Grid */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {subject.units.map((unit) => {
                    const bestAttempt = getBestAttemptForUnit(subject.code, unit.unitNumber);
                    const isInSem = unit.unitNumber === 1 || unit.unitNumber === 2;

                    return (
                      <div
                        key={unit.unitNumber}
                        className="bg-[#212121] border border-[#424242] hover:border-[#8E8E8E] rounded-xl p-4 transition-all flex flex-col justify-between space-y-3"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-xs font-mono font-medium text-white px-1.5 py-0.5 rounded bg-[#2F2F2F] border border-[#424242]">
                              Unit {unit.unitNumber}
                            </span>
                            {isInSem && (
                              <span className="text-[10px] text-[#8E8E8E] font-medium">
                                In-Sem (30M)
                              </span>
                            )}
                          </div>

                          <h5 className="text-xs sm:text-sm font-semibold text-white line-clamp-1">
                            {unit.title}
                          </h5>

                          <p className="text-[11px] text-[#8E8E8E] mt-1 line-clamp-2">
                            {unit.subtopics.join(' · ')}
                          </p>

                          {bestAttempt ? (
                            <div className="mt-2.5 flex items-center justify-between p-2 rounded-lg bg-[#262626] border border-[#383838] text-xs">
                              <span className="text-[#8E8E8E]">Best Score:</span>
                              <span className="font-mono font-medium text-white">
                                {bestAttempt.score} / 20 ({bestAttempt.percentage}%)
                              </span>
                            </div>
                          ) : (
                            <div className="mt-2.5 text-[11px] text-[#8E8E8E]">
                              Not attempted yet
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-[#383838]">
                          <button
                            onClick={() => handleStartQuiz(unit.unitNumber)}
                            className="flex-1 py-1.5 px-3 rounded-lg bg-[#ECECEC] hover:bg-white text-[#212121] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Timer className="w-3.5 h-3.5" />
                            <span>{bestAttempt ? 'Retake' : 'Start Quiz'}</span>
                          </button>

                          {onOpenNotes && (
                            <button
                              onClick={() => {
                                onClose();
                                onOpenNotes(unit.unitNumber);
                              }}
                              className="p-1.5 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] text-[#8E8E8E] hover:text-white border border-[#424242] transition-colors cursor-pointer"
                              title="Read Unit Notes"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: ACTIVE 20Q QUIZ RUNNER */}
          {viewState === 'active-quiz' && currentQuiz && currentQ && (
            <div className="space-y-4">
              {autoSubmittedAlert && (
                <div className="p-3 rounded-lg bg-[#212121] border border-red-500/40 text-red-400 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>20 minutes expired. Submitting answers...</span>
                </div>
              )}

              {/* Progress and Question Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[#424242]">
                <div>
                  <span className="text-xs text-[#8E8E8E]">
                    Unit {currentQuiz.unitNumber}: {currentQuiz.unitTitle}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-base font-semibold text-white">
                      Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
                    </span>
                    {currentQ.pyqYear && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#212121] text-[#8E8E8E] border border-[#424242]">
                        {currentQ.pyqYear}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setFlaggedQuestions((prev) => ({
                        ...prev,
                        [currentQ.id]: !prev[currentQ.id]
                      }));
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      flaggedQuestions[currentQ.id]
                        ? 'bg-[#212121] text-amber-300 border-amber-500/50'
                        : 'bg-[#212121] text-[#8E8E8E] border-[#424242] hover:text-white'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>{flaggedQuestions[currentQ.id] ? 'Flagged' : 'Flag'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserAnswers((prev) => {
                        const copy = { ...prev };
                        delete copy[currentQ.id];
                        return copy;
                      });
                    }}
                    className="px-2.5 py-1 rounded-lg text-xs text-[#8E8E8E] hover:text-white bg-[#212121] border border-[#424242] cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="p-4 rounded-xl bg-[#212121] border border-[#424242]">
                <p className="text-xs sm:text-sm font-medium text-white leading-relaxed">
                  {currentQ.question}
                </p>
              </div>

              {/* 4 Options Grid */}
              <div className="space-y-2">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = userAnswers[currentQ.id] === optIdx;
                  const optionLetters = ['A', 'B', 'C', 'D'];

                  return (
                    <button
                      key={optIdx}
                      onClick={() => {
                        setUserAnswers((prev) => ({
                          ...prev,
                          [currentQ.id]: optIdx
                        }));
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-[#212121] border-white text-white font-medium'
                          : 'bg-[#212121] hover:bg-[#262626] border-[#424242] text-[#B4B4B4]'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded font-mono font-medium text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-[#ECECEC] text-[#212121]'
                            : 'bg-[#2F2F2F] text-[#8E8E8E]'
                        }`}
                      >
                        {optionLetters[optIdx]}
                      </div>
                      <span className="text-xs sm:text-sm leading-relaxed">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Question Navigation Palette */}
              <div className="pt-3 border-t border-[#424242] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8E8E8E]">
                  <span>Palette ({Object.keys(userAnswers).length}/{currentQuiz.questions.length})</span>
                </div>

                <div className="grid grid-cols-10 sm:grid-cols-20 gap-1.5">
                  {currentQuiz.questions.map((q, idx) => {
                    const isAnswered = userAnswers[q.id] !== undefined;
                    const isFlagged = flaggedQuestions[q.id];
                    const isCurrent = idx === currentQuestionIndex;

                    let bgClass = 'bg-[#212121] text-[#8E8E8E] border border-[#424242]';
                    if (isAnswered) bgClass = 'bg-[#ECECEC] text-[#212121] font-semibold border-white';
                    if (isFlagged) bgClass = 'bg-[#212121] text-amber-300 border-amber-500/50';
                    if (isCurrent) bgClass += ' ring-1 ring-white';

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`h-7 rounded text-xs font-mono flex items-center justify-center cursor-pointer transition-all ${bgClass}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Prev / Next / Submit Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  className="px-3.5 py-1.5 rounded-lg bg-[#212121] hover:bg-[#303030] border border-[#424242] disabled:opacity-40 disabled:pointer-events-none text-[#ECECEC] text-xs font-medium flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-2">
                  {currentQuestionIndex < currentQuiz.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                      className="px-4 py-1.5 rounded-lg bg-[#212121] hover:bg-[#303030] border border-[#424242] text-white text-xs font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : null}

                  <button
                    onClick={() => setShowConfirmSubmit(true)}
                    className="px-4 py-1.5 rounded-lg bg-[#ECECEC] hover:bg-white text-[#212121] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Submit</span>
                  </button>
                </div>
              </div>

              {/* Submit Confirmation Dialog */}
              {showConfirmSubmit && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                  <div className="bg-[#2F2F2F] border border-[#424242] rounded-xl p-5 max-w-sm w-full space-y-3 shadow-2xl text-center">
                    <h3 className="text-sm font-semibold text-white">
                      Submit Quiz?
                    </h3>
                    <div className="text-xs text-[#B4B4B4] space-y-1">
                      <p>Answered: {Object.keys(userAnswers).length} / {currentQuiz.questions.length}</p>
                      <p>Time Remaining: {formatTime(timeRemainingSeconds)}</p>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => setShowConfirmSubmit(false)}
                        className="flex-1 py-2 rounded-lg bg-[#212121] hover:bg-[#383838] text-[#ECECEC] text-xs font-medium border border-[#424242] cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleManualSubmit}
                        className="flex-1 py-2 rounded-lg bg-[#ECECEC] hover:bg-white text-[#212121] text-xs font-semibold cursor-pointer"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW 3: QUIZ RESULT SCORECARD */}
          {viewState === 'result' && activeResult && currentQuiz && (
            <div className="space-y-5">
              <div className="p-5 rounded-xl bg-[#212121] border border-[#424242] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#8E8E8E]">
                    Unit {activeResult.unitNumber} Result
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    {activeResult.score} / {activeResult.totalQuestions} ({activeResult.percentage}%)
                  </h3>
                  <p className="text-xs text-[#B4B4B4] mt-1">
                    {activeResult.percentage >= 75
                      ? 'Distinction Grade'
                      : activeResult.percentage >= 50
                      ? 'Passing Grade'
                      : 'Needs Revision'} · Time: {Math.floor(activeResult.timeSpentSeconds / 60)}m {activeResult.timeSpentSeconds % 60}s
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartQuiz(currentQuiz.unitNumber)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#ECECEC] hover:bg-white text-[#212121] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake</span>
                  </button>
                  <button
                    onClick={() => setViewState('select-unit')}
                    className="px-3.5 py-1.5 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] text-white text-xs font-medium border border-[#424242] transition-colors cursor-pointer"
                  >
                    Units
                  </button>
                </div>
              </div>

              {/* Detailed Question Review */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-white">
                    Questions Review
                  </h4>

                  <div className="flex items-center gap-1 bg-[#212121] p-1 rounded-lg border border-[#424242] text-xs">
                    <button
                      onClick={() => setReviewFilter('all')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        reviewFilter === 'all' ? 'bg-[#ECECEC] text-[#212121] font-medium' : 'text-[#8E8E8E]'
                      }`}
                    >
                      All (20)
                    </button>
                    <button
                      onClick={() => setReviewFilter('correct')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        reviewFilter === 'correct' ? 'bg-[#ECECEC] text-[#212121] font-medium' : 'text-[#8E8E8E]'
                      }`}
                    >
                      Correct ({activeResult.correctCount})
                    </button>
                    <button
                      onClick={() => setReviewFilter('incorrect')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        reviewFilter === 'incorrect' ? 'bg-[#ECECEC] text-[#212121] font-medium' : 'text-[#8E8E8E]'
                      }`}
                    >
                      Incorrect ({activeResult.incorrectCount + activeResult.unansweredCount})
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {currentQuiz.questions
                    .filter((q) => {
                      const ans = activeResult.userAnswers[q.id];
                      const isCorrect = ans === q.correctIndex;
                      if (reviewFilter === 'correct') return isCorrect;
                      if (reviewFilter === 'incorrect') return !isCorrect;
                      return true;
                    })
                    .map((q, qIndex) => {
                      const userChoice = activeResult.userAnswers[q.id];
                      const isCorrect = userChoice === q.correctIndex;
                      const isUnanswered = userChoice === undefined;

                      return (
                        <div
                          key={q.id}
                          className="p-3.5 rounded-xl bg-[#212121] border border-[#424242] space-y-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-mono text-xs text-[#8E8E8E]">
                              #{qIndex + 1}
                            </span>
                            {isCorrect ? (
                              <span className="text-xs text-emerald-400 font-medium">Correct</span>
                            ) : isUnanswered ? (
                              <span className="text-xs text-[#8E8E8E]">Unanswered</span>
                            ) : (
                              <span className="text-xs text-red-400 font-medium">Incorrect</span>
                            )}
                          </div>

                          <p className="text-xs font-medium text-white">
                            {q.question}
                          </p>

                          <div className="p-2.5 rounded-lg bg-[#262626] border border-[#383838] text-[11px] text-[#B4B4B4] space-y-1">
                            <p><strong className="text-white">Answer:</strong> {q.options[q.correctIndex]}</p>
                            <p><strong className="text-white">Explanation:</strong> {q.explanation}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
