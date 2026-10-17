import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Send,
  Loader2,
  Copy,
  Check,
  Volume2,
  VolumeX,
  RotateCcw,
  BookOpen,
  Code2,
  Calculator,
  Cpu,
  Download,
  Flame,
  ArrowRight,
  CheckCircle2,
  Zap,
  Upload,
  FileText,
  AlertCircle,
  HelpCircle,
  FileUp,
  BookmarkCheck,
  Printer
} from 'lucide-react';
import { jsPDF } from 'jspdf';

interface BrahmastraAiModalProps {
  onSelectSubject?: (subjectName: string) => void;
}

// Ultra-clean point-to-point solution viewer without unwanted symbols or LaTeX clutter
const CleanPointToPointViewer: React.FC<{ text: string }> = ({ text }) => {
  const [copiedBlockIdx, setCopiedBlockIdx] = useState<number | null>(null);

  // Sanitize math symbols and unwanted raw LaTeX tokens
  const cleanSymbols = (raw: string): string => {
    if (!raw) return '';
    return raw
      .replace(/\$\$(.*?)\$\$/gs, '$1')
      .replace(/\$(.*?)\$/g, '$1')
      .replace(/\\mathbf\{([^}]+)\}/g, '$1')
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\mathrm\{([^}]+)\}/g, '$1')
      .replace(/\\mathit\{([^}]+)\}/g, '$1')
      .replace(/\\mathcal\{([^}]+)\}/g, '$1')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1) / ($2)')
      .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
      .replace(/\\sqrt/g, '√')
      .replace(/\\sum_\{[^}]+\}\^\{[^}]+\}/g, 'Σ')
      .replace(/\\sum/g, 'Σ')
      .replace(/\\int_0\^\{\\infty\}/g, '∫[0 to ∞]')
      .replace(/\\int_\{[^}]+\}\^\{[^}]+\}/g, '∫')
      .replace(/\\int/g, '∫')
      .replace(/\\partial/g, '∂')
      .replace(/\\nabla/g, '∇')
      .replace(/\\cdot/g, ' × ')
      .replace(/\\times/g, ' × ')
      .replace(/\\approx/g, ' ≈ ')
      .replace(/\\neq/g, ' ≠ ')
      .replace(/\\pm/g, ' ± ')
      .replace(/\\le/g, ' ≤ ')
      .replace(/\\ge/g, ' ≥ ')
      .replace(/\\infty/g, '∞')
      .replace(/\\pi/g, 'π')
      .replace(/\\Omega/g, 'Ω')
      .replace(/\\mu/g, 'μ')
      .replace(/\\alpha/g, 'α')
      .replace(/\\beta/g, 'β')
      .replace(/\\gamma/g, 'γ')
      .replace(/\\omega/g, 'ω')
      .replace(/\\theta/g, 'θ')
      .replace(/\\Delta/g, 'Δ')
      .replace(/\\lambda/g, 'λ')
      .replace(/\\quad/g, ' ')
      .replace(/\\qquad/g, '  ')
      .replace(/\\,/g, ' ')
      .replace(/\\left/g, '')
      .replace(/\\right/g, '')
      .replace(/\\/g, '')
      .replace(/_\{([^}]+)\}/g, '_$1')
      .trim();
  };

  const renderFormattedText = (str: string) => {
    const cleaned = cleanSymbols(str);
    const parts = cleaned.split(/(\*\*[^*]+\*\*)/g);

    return parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={pIdx} className="text-white font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={pIdx}>{part}</span>;
    });
  };

  const lines = text.split('\n');
  const renderedElements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLanguage = '';
  let codeBuffer: string[] = [];

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();

    if (line.startsWith('```')) {
      if (inCodeBlock) {
        const codeText = codeBuffer.join('\n');
        const blockIdx = idx;
        renderedElements.push(
          <div key={`code-${idx}`} className="my-3 rounded-xl bg-[#1E1E1E] border border-[#383838] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-1.5 bg-[#252525] border-b border-[#383838] text-[11px] text-[#8E8E8E]">
              <span className="font-mono font-medium uppercase">{codeLanguage || 'CODE'}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(codeText);
                  setCopiedBlockIdx(blockIdx);
                  setTimeout(() => setCopiedBlockIdx(null), 2000);
                }}
                className="flex items-center gap-1 text-[#8E8E8E] hover:text-white transition-colors cursor-pointer"
              >
                {copiedBlockIdx === blockIdx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedBlockIdx === blockIdx ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-[#ECECEC] overflow-x-auto leading-relaxed">
              <code>{codeText}</code>
            </pre>
          </div>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeLanguage = line.replace('```', '').trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(rawLine);
      return;
    }

    if (!line) {
      renderedElements.push(<div key={`sp-${idx}`} className="h-1.5" />);
      return;
    }

    if (line.startsWith('|') && line.endsWith('|')) {
      if (line.includes('---')) return;
      const cells = line
        .split('|')
        .map((c) => c.trim())
        .filter((c) => c.length > 0);

      if (cells.length === 2) {
        renderedElements.push(
          <div key={`tbl-${idx}`} className="my-1.5 p-3 rounded-lg bg-[#212121] border border-[#424242] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
            <span className="font-medium text-white">{renderFormattedText(cells[0])}</span>
            <span className="text-[#B4B4B4]">{renderFormattedText(cells[1])}</span>
          </div>
        );
        return;
      } else if (cells.length > 2) {
        renderedElements.push(
          <div key={`tbl-${idx}`} className="my-1.5 p-3 rounded-lg bg-[#212121] border border-[#424242] grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {cells.map((cell, cIdx) => (
              <span key={cIdx} className="text-[#B4B4B4]">
                {renderFormattedText(cell)}
              </span>
            ))}
          </div>
        );
        return;
      }
    }

    if (line.startsWith('>')) {
      const quoteText = line.replace(/^>\s*/, '');
      renderedElements.push(
        <div key={`q-${idx}`} className="my-2 p-3 rounded-lg bg-[#262626] border-l-2 border-[#8E8E8E] pl-3 text-xs sm:text-sm text-[#ECECEC] italic leading-relaxed">
          {renderFormattedText(quoteText)}
        </div>
      );
      return;
    }

    if (line.startsWith('#')) {
      const headingClean = line.replace(/^[#\s]+/, '').replace(/[*_]/g, '').trim();
      renderedElements.push(
        <div key={`h-${idx}`} className="mt-4 mb-2 pb-1 border-b border-[#424242]">
          <h4 className="text-sm font-semibold text-white tracking-tight">
            {headingClean}
          </h4>
        </div>
      );
      return;
    }

    if (line.toLowerCase().includes('final answer:')) {
      const answerClean = line.replace(/final answer:/i, '').replace(/[*_]/g, '').trim();
      renderedElements.push(
        <div key={`fa-${idx}`} className="my-2.5 p-3 rounded-lg bg-[#212121] border border-emerald-500/40 text-emerald-300 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Final Answer:</span>
          </div>
          <p className="text-xs sm:text-sm font-mono text-white pl-5">
            {cleanSymbols(answerClean)}
          </p>
        </div>
      );
      return;
    }

    if (line.toLowerCase().includes('examiner') || line.toLowerCase().includes('scoring tip:') || line.toLowerCase().includes('exam tip')) {
      const tipClean = line.replace(/[*_]/g, '').trim();
      renderedElements.push(
        <div key={`tip-${idx}`} className="my-2.5 p-3 rounded-lg bg-[#212121] border border-[#424242] text-xs flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-[#ECECEC] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="text-white block font-medium uppercase tracking-wider text-[11px]">Exam Tip:</strong>
            <span className="text-[#B4B4B4] leading-relaxed">{renderFormattedText(tipClean)}</span>
          </div>
        </div>
      );
      return;
    }

    const isNumbered = /^(\d+[\.\)]|step\s*\d+:?|point\s*\d+:?)/i.test(line);
    if (isNumbered) {
      const match = line.match(/^(\d+[\.\)]|step\s*\d+:?|point\s*\d+:?)\s*(.*)/i);
      const badge = match ? match[1] : '•';
      const body = match ? match[2] : line;

      renderedElements.push(
        <div key={`p-${idx}`} className="my-1.5 flex items-start gap-2 text-xs sm:text-sm text-[#ECECEC] leading-relaxed pl-1">
          <span className="shrink-0 font-mono text-[11px] font-medium text-[#ECECEC] bg-[#212121] px-1.5 py-0.5 rounded border border-[#424242]">
            {badge}
          </span>
          <div className="flex-1 pt-0.5 text-[#B4B4B4]">{renderFormattedText(body)}</div>
        </div>
      );
      return;
    }

    const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*');
    if (isBullet) {
      const bulletBody = line.replace(/^[•\-\*]\s*/, '');
      renderedElements.push(
        <div key={`b-${idx}`} className="my-1 flex items-start gap-2 text-xs sm:text-sm text-[#B4B4B4] leading-relaxed pl-3">
          <span className="text-[#8E8E8E] shrink-0 mt-1 font-bold text-xs">•</span>
          <div className="flex-1">{renderFormattedText(bulletBody)}</div>
        </div>
      );
      return;
    }

    renderedElements.push(
      <p key={`t-${idx}`} className="my-1 text-xs sm:text-sm text-[#B4B4B4] leading-relaxed">
        {renderFormattedText(line)}
      </p>
    );
  });

  return <div className="space-y-1">{renderedElements}</div>;
};

export const BrahmastraAiModal: React.FC<BrahmastraAiModalProps> = ({ onSelectSubject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'last-minute' | 'brahmastra'>('last-minute');

  // Floating button dragging state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, buttonX: 0, buttonY: 0, moved: false });
  const buttonRef = useRef<HTMLDivElement | null>(null);

  // TAB 1: Last Minute Notes state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string>('');
  const [fileMimeType, setFileMimeType] = useState<string>('application/pdf');
  const [pastedTopicOrText, setPastedTopicOrText] = useState<string>('');
  const [subjectName, setSubjectName] = useState<string>('');
  const [revisionMode, setRevisionMode] = useState<'high-yield' | 'formulas' | 'comprehensive'>('high-yield');
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState<string | null>(null);
  const [notesCopied, setNotesCopied] = useState(false);
  const [isSpeakingNotes, setIsSpeakingNotes] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // TAB 2: Brahmastra AI Problem Solver state
  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Electronics & Circuits');
  const [isLoadingSolver, setIsLoadingSolver] = useState(false);
  const [solverSolution, setSolverSolution] = useState<string | null>(null);
  const [solverCopied, setSolverCopied] = useState(false);
  const [isSpeakingSolver, setIsSpeakingSolver] = useState(false);

  // Speech synthesis reference
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Initialize floating button position
  useEffect(() => {
    const defaultX = typeof window !== 'undefined' ? window.innerWidth - 84 : 300;
    const defaultY = typeof window !== 'undefined' ? window.innerHeight - 100 : 500;
    setPosition({ x: defaultX, y: defaultY });

    const handleResize = () => {
      setPosition((prev) => ({
        x: Math.min(prev.x, window.innerWidth - 84),
        y: Math.min(prev.y, window.innerHeight - 84)
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse & Touch Drag Handlers
  const handlePointerDown = (clientX: number, clientY: number) => {
    setIsDragging(true);
    dragStartRef.current = {
      startX: clientX,
      startY: clientY,
      buttonX: position.x,
      buttonY: position.y,
      moved: false
    };
  };

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - dragStartRef.current.startX;
      const deltaY = clientY - dragStartRef.current.startY;

      if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
        dragStartRef.current.moved = true;
      }

      const newX = Math.min(Math.max(10, dragStartRef.current.buttonX + deltaX), window.innerWidth - 80);
      const newY = Math.min(Math.max(10, dragStartRef.current.buttonY + deltaY), window.innerHeight - 80);

      setPosition({ x: newX, y: newY });
    };

    const handlePointerUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove, { passive: false });
      window.addEventListener('touchend', handlePointerUp);
    }

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging]);

  const handleOrbClick = () => {
    if (dragStartRef.current.moved) return;
    setIsOpen((prev) => !prev);
  };

  // Handle file upload for Last Minute Notes
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setFileMimeType(file.type || 'application/pdf');
    if (!subjectName) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setSubjectName(cleanName);
    }

    const reader = new FileReader();
    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      reader.onload = (event) => {
        setFileDataUrl(event.target?.result as string);
      };
      reader.readAsText(file);
    } else {
      reader.onload = (event) => {
        setFileDataUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate Last Minute Notes via Gemini API
  const handleGenerateNotes = async () => {
    if (!uploadedFile && !pastedTopicOrText.trim() && !subjectName.trim()) {
      return;
    }

    setIsGeneratingNotes(true);
    setGeneratedNotes(null);

    try {
      const res = await fetch('/api/gemini/summarize-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectName: subjectName || 'Engineering Core',
          unitOrChapter: pastedTopicOrText ? pastedTopicOrText.slice(0, 100) : 'Exam Syllabus Unit',
          language: 'English',
          mode: revisionMode === 'high-yield' ? 'last-minute' : revisionMode === 'formulas' ? 'pyq-high-yield' : 'comprehensive',
          fileContent: fileDataUrl || pastedTopicOrText,
          mimeType: fileMimeType,
          fileName: uploadedFile?.name || 'notes.pdf'
        })
      });

      const data = await res.json();
      if (data && data.summary) {
        setGeneratedNotes(data.summary);
      } else {
        setGeneratedNotes('Unable to generate notes. Please check the uploaded file or try another topic.');
      }
    } catch (err: any) {
      console.error('Error generating notes:', err);
      setGeneratedNotes('Network error while processing document. Please try again.');
    } finally {
      setIsGeneratingNotes(false);
    }
  };

  // Generate Brahmastra AI Solver solution
  const handleSolveProblem = async (queryText?: string) => {
    const query = (queryText || inputText).trim();
    if (!query) return;

    setIsLoadingSolver(true);
    setSolverSolution(null);

    try {
      const res = await fetch('/api/gemini/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemText: query,
          category: selectedCategory
        })
      });

      const data = await res.json();
      if (data && data.solution) {
        setSolverSolution(data.solution);
      } else {
        setSolverSolution('Could not generate solution. Please try again.');
      }
    } catch (err) {
      console.error('Error solving problem:', err);
      setSolverSolution('Failed to connect to AI server. Please try again.');
    } finally {
      setIsLoadingSolver(false);
    }
  };

  // Download generated notes as PDF
  const handleDownloadPdf = (content: string, title: string) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    doc.setFillColor(33, 33, 33);
    doc.rect(0, 0, 210, 24, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('ENGINOTES • EXAM REVISION SUMMARY', 14, 11);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(180, 180, 180);
    doc.text(`${title} | High-Yield Point-to-Point Summary`, 14, 18);

    doc.setTextColor(40, 40, 40);
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'normal');

    const cleanPlain = content
      .replace(/[*_#`]/g, '')
      .replace(/\\/g, '')
      .trim();

    const splitLines = doc.splitTextToSize(cleanPlain, 180);

    let y = 34;
    const pageHeight = doc.internal.pageSize.getHeight();

    for (let i = 0; i < splitLines.length; i++) {
      if (y > pageHeight - 15) {
        doc.addPage();
        y = 15;
      }
      doc.text(splitLines[i], 14, y);
      y += 5.2;
    }

    doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}_revision_notes.pdf`);
  };

  // Text-To-Speech Toggle
  const toggleSpeech = (text: string, isSpeaking: boolean, setIsSpeaking: (v: boolean) => void) => {
    if (!synthRef.current) return;

    if (isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    } else {
      synthRef.current.cancel();
      const plain = text.replace(/[*_#`]/g, '').slice(0, 1200);
      const utterance = new SpeechSynthesisUtterance(plain);
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      synthRef.current.speak(utterance);
    }
  };

  return (
    <>
      {/* Floating Draggable Round Tool Button */}
      <div
        ref={buttonRef}
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 49,
          touchAction: 'none'
        }}
        className="select-none cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
        onTouchStart={(e) => handlePointerDown(e.touches[0].clientX, e.touches[0].clientY)}
        onClick={handleOrbClick}
      >
        <div className="relative w-14 h-14 rounded-full flex items-center justify-center group bg-[#2F2F2F] border border-[#424242] shadow-xl hover:border-[#8E8E8E] transition-all">
          <Zap className="w-5 h-5 text-white" />
          <div className="absolute -top-2 bg-[#212121] text-[9px] font-mono text-[#ECECEC] px-2 py-0.5 rounded border border-[#424242] whitespace-nowrap shadow-md">
            AI Assistant
          </div>
        </div>
      </div>

      {/* AI Assistant Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
          <div className="relative w-full max-w-4xl bg-[#2F2F2F] border border-[#424242] rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-[#ECECEC]">
            
            {/* Modal Top Header with Switcher Tabs */}
            <div className="px-5 py-3.5 border-b border-[#424242] bg-[#212121] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#2F2F2F] border border-[#424242] flex items-center justify-center text-white">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
                    <span>Engineering AI Assistant</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2F2F2F] text-emerald-400 border border-[#424242]">
                      Ready
                    </span>
                  </h2>
                  <p className="text-xs text-[#8E8E8E]">
                    Extract exam short notes from PDF or solve engineering problems point-to-point
                  </p>
                </div>
              </div>

              {/* Tool Tab Switcher */}
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-[#2F2F2F] border border-[#424242] flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('last-minute')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer ${
                      activeTab === 'last-minute'
                        ? 'bg-[#ECECEC] text-[#212121] font-semibold'
                        : 'text-[#8E8E8E] hover:text-white'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Revision Notes</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('brahmastra')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer ${
                      activeTab === 'brahmastra'
                        ? 'bg-[#ECECEC] text-[#212121] font-semibold'
                        : 'text-[#8E8E8E] hover:text-white'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Problem Solver</span>
                  </button>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] text-[#8E8E8E] hover:text-white border border-[#424242] flex items-center justify-center transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#2F2F2F]">

              {/* TAB 1: LAST MINUTE NOTES ENGINE */}
              {activeTab === 'last-minute' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl bg-[#212121] border border-[#424242] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-[#ECECEC]" />
                        <span>Instant Notes & High-Yield Summary</span>
                      </h3>
                      <p className="text-xs text-[#8E8E8E] mt-0.5">
                        Upload textbook PDF or notes. AI generates step-by-step key points, formulas, and verified exam takeaways.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-[#8E8E8E] bg-[#2F2F2F] px-2.5 py-1 rounded border border-[#424242]">
                        Zero Missing Points
                      </span>
                    </div>
                  </div>

                  {/* Input Selection Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* File Upload Box */}
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-[#8E8E8E]">
                        1. Upload PDF or Image
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg,.txt,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`p-6 rounded-xl border border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-2 ${
                          uploadedFile
                            ? 'bg-[#212121] border-[#ECECEC] text-white'
                            : 'bg-[#212121] border-[#424242] hover:border-[#8E8E8E] text-[#8E8E8E]'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#2F2F2F] border border-[#424242] flex items-center justify-center text-white">
                          <FileUp className="w-5 h-5" />
                        </div>
                        {uploadedFile ? (
                          <div>
                            <span className="block text-xs font-medium text-white truncate max-w-xs">
                              {uploadedFile.name}
                            </span>
                            <span className="text-[10px] text-[#8E8E8E]">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Click to replace
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span className="block text-xs font-medium text-[#ECECEC]">
                              Choose PDF, Book or Notes
                            </span>
                            <span className="text-[10px] text-[#8E8E8E]">
                              PDF, JPG, PNG, TXT
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Or Paste Text / Topic */}
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-[#8E8E8E]">
                        2. Or Enter Subject & Topic
                      </label>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={subjectName}
                          onChange={(e) => setSubjectName(e.target.value)}
                          placeholder="e.g. Basic Electronics or Data Structures"
                          className="w-full bg-[#212121] text-xs text-[#ECECEC] placeholder-[#8E8E8E] px-3.5 py-2.5 rounded-xl border border-[#424242] focus:border-[#8E8E8E] focus:outline-none transition-colors"
                        />
                        <textarea
                          rows={3}
                          value={pastedTopicOrText}
                          onChange={(e) => setPastedTopicOrText(e.target.value)}
                          placeholder="Paste syllabus units, textbook excerpts, or topics to summarize..."
                          className="w-full bg-[#212121] text-xs text-[#ECECEC] placeholder-[#8E8E8E] p-3 rounded-xl border border-[#424242] focus:border-[#8E8E8E] focus:outline-none resize-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mode & Action Row */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-[#424242]">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs text-[#8E8E8E] font-medium mr-1">Focus:</span>
                      {[
                        { id: 'high-yield', label: 'High-Yield PYQ Focus', icon: Flame },
                        { id: 'formulas', label: 'Formulas & Derivations', icon: Calculator },
                        { id: 'comprehensive', label: 'Complete Summary', icon: BookOpen }
                      ].map((m) => {
                        const isSel = revisionMode === m.id;
                        const Icon = m.icon;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setRevisionMode(m.id as any)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                              isSel
                                ? 'bg-[#ECECEC] text-[#212121] font-semibold'
                                : 'bg-[#212121] text-[#8E8E8E] border border-[#424242] hover:text-white'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            <span>{m.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={handleGenerateNotes}
                      disabled={isGeneratingNotes || (!uploadedFile && !pastedTopicOrText.trim() && !subjectName.trim())}
                      className="px-5 py-2.5 rounded-lg bg-[#ECECEC] hover:bg-white text-[#212121] font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                    >
                      {isGeneratingNotes ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#212121]" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 fill-[#212121] text-[#212121]" />
                          <span>Generate Notes</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Generated Notes Output Display */}
                  {generatedNotes && (
                    <div className="rounded-xl bg-[#212121] border border-[#424242] p-5 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#424242]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <h4 className="text-xs font-semibold text-white">
                            Generated Notes
                          </h4>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(generatedNotes);
                              setNotesCopied(true);
                              setTimeout(() => setNotesCopied(false), 2000);
                            }}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] text-xs text-[#ECECEC] border border-[#424242] transition-colors cursor-pointer"
                          >
                            {notesCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{notesCopied ? 'Copied' : 'Copy'}</span>
                          </button>

                          <button
                            onClick={() => toggleSpeech(generatedNotes, isSpeakingNotes, setIsSpeakingNotes)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer border border-[#424242] ${
                              isSpeakingNotes ? 'bg-[#ECECEC] text-[#212121] font-semibold' : 'bg-[#2F2F2F] hover:bg-[#383838] text-[#ECECEC]'
                            }`}
                          >
                            {isSpeakingNotes ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                            <span>{isSpeakingNotes ? 'Stop' : 'Listen'}</span>
                          </button>

                          <button
                            onClick={() => handleDownloadPdf(generatedNotes, subjectName || 'Exam_Notes')}
                            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#ECECEC] hover:bg-white text-xs text-[#212121] font-semibold transition-colors cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download PDF</span>
                          </button>
                        </div>
                      </div>

                      <div className="text-sm text-[#ECECEC] leading-relaxed font-sans">
                        <CleanPointToPointViewer text={generatedNotes} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: BRAHMASTRA AI SOLVER */}
              {activeTab === 'brahmastra' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                    {[
                      { name: 'Electronics & Circuits', icon: Cpu },
                      { name: 'Engineering Mathematics', icon: Calculator },
                      { name: 'DSA & Coding', icon: Code2 },
                      { name: 'Mechanical & Civil', icon: BookOpen }
                    ].map((cat) => {
                      const IconComp = cat.icon;
                      const isSel = selectedCategory === cat.name;
                      return (
                        <button
                          key={cat.name}
                          onClick={() => setSelectedCategory(cat.name)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                            isSel
                              ? 'bg-[#ECECEC] text-[#212121] font-semibold'
                              : 'bg-[#212121] text-[#8E8E8E] border border-[#424242] hover:text-[#ECECEC]'
                          }`}
                        >
                          <IconComp className="w-3.5 h-3.5" />
                          <span>{cat.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Problem Input Box */}
                  <div className="relative">
                    <textarea
                      rows={4}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type your engineering problem, circuit derivation, math theorem, or query..."
                      className="w-full bg-[#212121] text-xs sm:text-sm text-[#ECECEC] placeholder-[#8E8E8E] p-4 rounded-xl border border-[#424242] focus:border-[#8E8E8E] focus:outline-none resize-none transition-colors"
                    />

                    <button
                      onClick={() => handleSolveProblem()}
                      disabled={isLoadingSolver || !inputText.trim()}
                      className="absolute right-3 bottom-3 px-3.5 py-1.5 rounded-lg bg-[#ECECEC] hover:bg-white text-[#212121] font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isLoadingSolver ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#212121]" />
                          <span>Solving...</span>
                        </>
                      ) : (
                        <>
                          <span>Solve</span>
                          <Send className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Preset Sample Prompts */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-medium text-[#8E8E8E]">
                      Sample Queries:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        { label: 'Ripple Factor Derivation', q: 'Derive the ripple factor formula for a full-wave bridge rectifier with capacitor filter step-by-step.' },
                        { label: 'First Order ODE Solution', q: 'Solve differential equation dy/dx + (2/x)*y = x^3 with initial condition y(1) = 2.' },
                        { label: 'Binary Search Tree Insertion', q: 'Write clean recursive C++ code for inserting a node into a BST with time/space complexity analysis.' },
                        { label: 'Thevenin Equivalent Theorem', q: 'Explain Thevenin theorem with step-by-step methodology to find Vth and Rth.' }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setInputText(item.q);
                            handleSolveProblem(item.q);
                          }}
                          className="p-2.5 rounded-lg bg-[#212121] hover:bg-[#282828] border border-[#424242] text-left transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span className="text-xs text-[#B4B4B4] font-medium truncate">{item.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#8E8E8E] shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Solution Output Box */}
                  {solverSolution && (
                    <div className="rounded-xl bg-[#212121] border border-[#424242] p-5 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-[#424242]">
                        <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Point-to-Point Solution</span>
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(solverSolution);
                              setSolverCopied(true);
                              setTimeout(() => setSolverCopied(false), 2000);
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] text-xs text-[#ECECEC] border border-[#424242] transition-colors cursor-pointer"
                          >
                            {solverCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{solverCopied ? 'Copied' : 'Copy'}</span>
                          </button>

                          <button
                            onClick={() => toggleSpeech(solverSolution, isSpeakingSolver, setIsSpeakingSolver)}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer border border-[#424242] ${
                              isSpeakingSolver ? 'bg-[#ECECEC] text-[#212121] font-semibold' : 'bg-[#2F2F2F] hover:bg-[#383838] text-[#ECECEC]'
                            }`}
                          >
                            {isSpeakingSolver ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                            <span>{isSpeakingSolver ? 'Stop' : 'Listen'}</span>
                          </button>

                          <button
                            onClick={() => handleDownloadPdf(solverSolution, 'Engineering_Solution')}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#ECECEC] hover:bg-white text-xs text-[#212121] font-semibold transition-colors cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>PDF</span>
                          </button>
                        </div>
                      </div>

                      <div className="text-sm text-[#ECECEC] leading-relaxed font-sans">
                        <CleanPointToPointViewer text={solverSolution} />
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
};
