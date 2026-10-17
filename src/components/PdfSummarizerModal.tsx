import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  FileText,
  Sparkles,
  Download,
  Copy,
  Check,
  Printer,
  Bookmark,
  Languages,
  BookOpen,
  ArrowRight,
  Zap,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  Sliders,
  ChevronDown,
  Layers,
  GraduationCap
} from 'lucide-react';
import { SppuSubject } from '../data/sppuSyllabusData';

interface PdfSummarizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: SppuSubject | null;
  branchCode?: string;
  semester?: number;
}

export const PdfSummarizerModal: React.FC<PdfSummarizerModalProps> = ({
  isOpen,
  onClose,
  subject,
  branchCode = 'General',
  semester = 2,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste' | 'sppu-units'>('upload');
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'Hinglish' | 'Marathi'>('English');
  const [revisionMode, setRevisionMode] = useState<'last-minute' | 'comprehensive' | 'pyq-high-yield'>('comprehensive');

  // Input states
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string>('');
  const [fileMimeType, setFileMimeType] = useState<string>('application/pdf');
  const [pastedText, setPastedText] = useState<string>('');
  const [selectedUnitIndex, setSelectedUnitIndex] = useState<number>(0);

  // Generation state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progressStep, setProgressStep] = useState<number>(1);
  const [summaryResult, setSummaryResult] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedToLocal, setSavedToLocal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const currentSubjectName = subject ? subject.name : 'Engineering Course';
  const currentSubjectCode = subject ? subject.code : 'SPPU-ENG';
  const unitsList = subject?.units || [
    { unitNumber: 1, title: 'Unit 1: Fundamentals & Primary Governing Equations', subtopics: ['Basic principles', 'Standard definitions', 'Analytical relations'] },
    { unitNumber: 2, title: 'Unit 2: System Formulations & Boundary Conditions', subtopics: ['Boundary criteria', 'Model deduction', 'Equilibrium states'] },
    { unitNumber: 3, title: 'Unit 3: Procedural Analysis & Algorithmic Steps', subtopics: ['Step-by-step algorithms', 'Implementation', 'Applications'] },
  ];

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setFileMimeType(file.type || 'application/pdf');
    setErrorMsg(null);

    const reader = new FileReader();
    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setFileDataUrl(text);
      };
      reader.readAsText(file);
    } else {
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setFileDataUrl(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate Summary Action
  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setProgressStep(1);

    const stepTimer1 = setTimeout(() => setProgressStep(2), 1200);
    const stepTimer2 = setTimeout(() => setProgressStep(3), 2500);

    try {
      let contentToSend = '';
      let unitName = unitsList[selectedUnitIndex]?.title || 'All Units';

      if (activeTab === 'upload') {
        if (!uploadedFile && !fileDataUrl) {
          setErrorMsg('Please select a PDF or document file to summarize.');
          setIsLoading(false);
          clearTimeout(stepTimer1);
          clearTimeout(stepTimer2);
          return;
        }
        contentToSend = fileDataUrl || `Uploaded file: ${uploadedFile?.name}`;
      } else if (activeTab === 'paste') {
        if (!pastedText.trim()) {
          setErrorMsg('Please paste textbook or notes text in the box below.');
          setIsLoading(false);
          clearTimeout(stepTimer1);
          clearTimeout(stepTimer2);
          return;
        }
        contentToSend = pastedText.trim();
        unitName = 'Pasted Notes / Textbook Chapter';
      } else {
        const chosenUnit = unitsList[selectedUnitIndex];
        unitName = `Unit ${chosenUnit.unitNumber}: ${chosenUnit.title}`;
        contentToSend = `Subject: ${currentSubjectName}\nUnit: ${unitName}\nSyllabus Subtopics to cover without missing any point:\n${chosenUnit.subtopics.map(t => `- ${t}`).join('\n')}\nReference standard SPPU textbooks: Nirali, TechKnowledge, Pearson, McGraw-Hill.`;
      }

      const response = await fetch('/api/gemini/summarize-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectName: currentSubjectName,
          branchCode: branchCode,
          unitOrChapter: unitName,
          language: selectedLanguage,
          mode: revisionMode,
          fileContent: contentToSend,
          mimeType: fileMimeType,
          fileName: uploadedFile?.name || `${currentSubjectCode}_notes.pdf`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.summary) {
        setSummaryResult(data.summary);
      } else {
        throw new Error('No summary received from engine.');
      }
    } catch (err: any) {
      console.error('Summarization failed:', err);
      setErrorMsg('Failed to process document. Please try again.');
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setIsLoading(false);
    }
  };

  // Copy to clipboard
  const handleCopy = () => {
    if (!summaryResult) return;
    navigator.clipboard.writeText(summaryResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download text file
  const handleDownload = () => {
    if (!summaryResult) return;
    const blob = new Blob([summaryResult], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentSubjectCode}_ZeroLoss_RevisionNotes_${selectedLanguage}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Save to localStorage
  const handleSaveToLocal = () => {
    if (!summaryResult) return;
    try {
      const existing = JSON.parse(localStorage.getItem('enginotes_saved_summaries') || '[]');
      const newEntry = {
        id: Date.now(),
        subjectName: currentSubjectName,
        subjectCode: currentSubjectCode,
        language: selectedLanguage,
        mode: revisionMode,
        createdAt: new Date().toLocaleDateString(),
        content: summaryResult,
      };
      existing.unshift(newEntry);
      localStorage.setItem('enginotes_saved_summaries', JSON.stringify(existing.slice(0, 30)));
      setSavedToLocal(true);
      setTimeout(() => setSavedToLocal(false), 2500);
    } catch (err) {
      console.warn('Could not save to localStorage', err);
    }
  };

  // Render formatted lines with clean, readable ChatGPT-style typography
  const renderFormattedSummary = (rawText: string) => {
    const lines = rawText.split('\n');

    return (
      <div className="space-y-3 text-sm text-[#ECECEC] leading-relaxed font-sans">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1.5" />;

          // Heading with icon or special prefix
          if (trimmed.startsWith('📌') || trimmed.startsWith('🔑') || trimmed.startsWith('📝') || trimmed.startsWith('⚙️') || trimmed.startsWith('⚠️') || trimmed.startsWith('💡')) {
            return (
              <div
                key={idx}
                className="mt-5 mb-2 px-3 py-2 rounded-lg bg-[#212121] border border-[#424242] flex items-center gap-2 font-semibold text-white text-sm"
              >
                <span>{trimmed}</span>
              </div>
            );
          }

          // Numbered concept points
          if (/^(\d+[\.\)]|Point \d+:|Payeri \d+:|Step \d+:)/i.test(trimmed)) {
            return (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[#212121] border border-[#383838]"
              >
                <span className="font-semibold text-white mr-2">{trimmed.split(':')[0]}:</span>
                <span className="text-[#B4B4B4]">{trimmed.split(':').slice(1).join(':') || trimmed}</span>
              </div>
            );
          }

          // Formula lines
          if (trimmed.toLowerCase().includes('formula')) {
            return (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[#262626] border border-[#424242] font-mono text-xs text-[#ECECEC] flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-[#ECECEC] shrink-0" />
                <span>{trimmed}</span>
              </div>
            );
          }

          // Bullet points
          if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
            const cleanContent = trimmed.replace(/^[\s•\-\*]+/, '');
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B4B4B4] mt-2 shrink-0" />
                <span className="text-[#ECECEC]">{cleanContent}</span>
              </div>
            );
          }

          // Normal paragraph
          return (
            <p key={idx} className="text-[#B4B4B4] pl-1">
              {trimmed}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#2F2F2F] border border-[#424242] rounded-2xl shadow-2xl flex flex-col my-auto max-h-[92vh] overflow-hidden text-[#ECECEC]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#212121] border-b border-[#424242] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2F2F2F] border border-[#424242] flex items-center justify-center text-white">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#2F2F2F] border border-[#424242] text-[#B4B4B4]">
                  Option 4
                </span>
                <span className="text-[11px] text-[#8E8E8E] font-medium">
                  Revision Engine • Zero-Point-Loss
                </span>
              </div>
              <h3 className="text-base font-semibold text-white">
                Smart PDF & Textbook Revision Notes
              </h3>
              <p className="text-xs text-[#8E8E8E]">
                {currentSubjectName} • {branchCode} (Sem {semester})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] text-[#8E8E8E] hover:text-white border border-[#424242] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-[#2F2F2F]">
          
          {/* Controls: Language & Revision Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#212121] p-4 rounded-xl border border-[#424242]">
            {/* Language Selector */}
            <div>
              <label className="block text-xs font-medium text-[#8E8E8E] mb-2 flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-[#B4B4B4]" />
                <span>Language</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['English', 'Hinglish', 'Marathi'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      selectedLanguage === lang
                        ? 'bg-[#ECECEC] text-[#212121] font-semibold'
                        : 'bg-[#2F2F2F] text-[#8E8E8E] hover:text-[#ECECEC] border border-[#424242]'
                    }`}
                  >
                    {lang === 'English' ? 'English' : lang === 'Hinglish' ? 'Hinglish' : 'Standard'}
                  </button>
                ))}
              </div>
            </div>

            {/* Revision Depth Mode */}
            <div>
              <label className="block text-xs font-medium text-[#8E8E8E] mb-2 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#B4B4B4]" />
                <span>Revision Mode</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setRevisionMode('comprehensive')}
                  title="Every single syllabus point covered step-by-step"
                  className={`py-2 px-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
                    revisionMode === 'comprehensive'
                      ? 'bg-[#ECECEC] text-[#212121] font-semibold'
                      : 'bg-[#2F2F2F] text-[#8E8E8E] hover:text-[#ECECEC] border border-[#424242]'
                  }`}
                >
                  Comprehensive
                </button>
                <button
                  onClick={() => setRevisionMode('last-minute')}
                  title="Formulas and core points for exam night"
                  className={`py-2 px-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
                    revisionMode === 'last-minute'
                      ? 'bg-[#ECECEC] text-[#212121] font-semibold'
                      : 'bg-[#2F2F2F] text-[#8E8E8E] hover:text-[#ECECEC] border border-[#424242]'
                  }`}
                >
                  Last-Minute
                </button>
                <button
                  onClick={() => setRevisionMode('pyq-high-yield')}
                  title="Most repeated SPPU questions with steps"
                  className={`py-2 px-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
                    revisionMode === 'pyq-high-yield'
                      ? 'bg-[#ECECEC] text-[#212121] font-semibold'
                      : 'bg-[#2F2F2F] text-[#8E8E8E] hover:text-[#ECECEC] border border-[#424242]'
                  }`}
                >
                  High-Yield PYQ
                </button>
              </div>
            </div>
          </div>

          {/* Three Input Tabs */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#424242] pb-2">
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'upload'
                    ? 'bg-[#212121] text-white border border-[#424242]'
                    : 'text-[#8E8E8E] hover:text-[#ECECEC] hover:bg-[#212121]'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>1. Upload PDF</span>
              </button>

              <button
                onClick={() => setActiveTab('paste')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'paste'
                    ? 'bg-[#212121] text-white border border-[#424242]'
                    : 'text-[#8E8E8E] hover:text-[#ECECEC] hover:bg-[#212121]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>2. Paste Notes</span>
              </button>

              <button
                onClick={() => setActiveTab('sppu-units')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'sppu-units'
                    ? 'bg-[#212121] text-white border border-[#424242]'
                    : 'text-[#8E8E8E] hover:text-[#ECECEC] hover:bg-[#212121]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>3. SPPU Syllabus Unit</span>
              </button>
            </div>

            {/* TAB 1: File Upload */}
            {activeTab === 'upload' && (
              <div className="space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.txt,.doc,.docx,image/*"
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-[#424242] hover:border-[#8E8E8E] bg-[#212121] hover:bg-[#262626] rounded-xl p-6 text-center cursor-pointer transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#2F2F2F] border border-[#424242] text-[#ECECEC] flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-white">
                    {uploadedFile ? uploadedFile.name : 'Select or drag & drop PDF / Textbook file'}
                  </p>
                  <p className="text-xs text-[#8E8E8E] mt-1">
                    Supports textbook scans, Nirali / Techknowledge publication PDFs (up to 25MB)
                  </p>
                  {uploadedFile && (
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2F2F2F] text-emerald-400 text-xs font-mono border border-[#424242]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Ready: {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: Paste Text */}
            {activeTab === 'paste' && (
              <div>
                <textarea
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="Paste textbook chapter text, professor notes transcription, or syllabus concepts..."
                  rows={6}
                  className="w-full bg-[#212121] border border-[#424242] rounded-xl p-4 text-xs text-[#ECECEC] placeholder-[#8E8E8E] focus:outline-none focus:border-[#8E8E8E] transition-colors"
                />
                <p className="text-[11px] text-[#8E8E8E] mt-1.5">
                  Tip: Direct extraction ensures no key equations or definitions are omitted.
                </p>
              </div>
            )}

            {/* TAB 3: SPPU Syllabus Unit Quick Picker */}
            {activeTab === 'sppu-units' && (
              <div className="space-y-2">
                <p className="text-xs text-[#8E8E8E]">
                  Select any unit below to instantly generate full, zero-loss short revision notes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {unitsList.map((unit, idx) => (
                    <button
                      key={unit.unitNumber}
                      onClick={() => setSelectedUnitIndex(idx)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedUnitIndex === idx
                          ? 'bg-[#212121] border-white text-white'
                          : 'bg-[#212121] border-[#424242] text-[#B4B4B4] hover:border-[#8E8E8E]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#2F2F2F] border border-[#424242] text-[#ECECEC]">
                          Unit {unit.unitNumber}
                        </span>
                        {selectedUnitIndex === idx && (
                          <Check className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>
                      <p className="text-xs font-semibold text-white truncate">
                        {unit.title}
                      </p>
                      <p className="text-[11px] text-[#8E8E8E] mt-0.5 line-clamp-1">
                        {unit.subtopics.join(', ')}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Trigger Button */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-[#8E8E8E] flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#B4B4B4]" />
              <span>SPPU Pattern 2024 NEP Structure</span>
            </div>

            <button
              onClick={handleGenerateSummary}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-lg bg-[#ECECEC] hover:bg-white text-[#212121] font-medium text-xs sm:text-sm tracking-tight flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#212121]" />
                  <span>
                    {progressStep === 1
                      ? 'Scanning Document...'
                      : progressStep === 2
                      ? 'Extracting Formulas...'
                      : 'Synthesizing Notes...'}
                  </span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-[#212121] text-[#212121]" />
                  <span>Generate Revision Notes</span>
                </>
              )}
            </button>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-[#212121] border border-red-500/40 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Results Section */}
          {summaryResult && (
            <div className="space-y-3 pt-3 border-t border-[#424242]">
              {/* Output Actions Bar */}
              <div className="bg-[#212121] p-3 rounded-xl border border-[#424242] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold text-white">
                    Generated Notes ({selectedLanguage})
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#2F2F2F] text-[#8E8E8E] border border-[#424242]">
                    {revisionMode === 'last-minute' ? 'Last-Minute' : revisionMode === 'pyq-high-yield' ? 'High-Yield PYQ' : 'Comprehensive'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] text-[#ECECEC] text-xs font-medium border border-[#424242] transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] text-[#ECECEC] text-xs font-medium border border-[#424242] transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#B4B4B4]" />
                    <span>Download</span>
                  </button>

                  <button
                    onClick={handleSaveToLocal}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] text-[#ECECEC] text-xs font-medium border border-[#424242] transition-colors cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{savedToLocal ? 'Saved' : 'Save'}</span>
                  </button>
                </div>
              </div>

              {/* Formatted Notes Viewer */}
              <div className="bg-[#212121] p-5 rounded-xl border border-[#424242]">
                {renderFormattedSummary(summaryResult)}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#212121] border-t border-[#424242] flex items-center justify-between text-xs text-[#8E8E8E]">
          <span>SPPU B.Tech Revision Portal • Team Hunters</span>
          <button
            onClick={onClose}
            className="text-[#8E8E8E] hover:text-white font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
