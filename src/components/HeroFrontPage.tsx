import React from 'react';
import {
  BookOpen,
  FileText,
  Timer,
  Cpu,
  ArrowRight,
  GraduationCap,
  ChevronDown
} from 'lucide-react';

interface HeroFrontPageProps {
  onStartPreparation: () => void;
}

export const HeroFrontPage: React.FC<HeroFrontPageProps> = ({ onStartPreparation }) => {
  return (
    <div className="bg-[#212121] py-10 sm:py-14 border-b border-[#303030]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        
        {/* Top Badge */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2F2F2F] border border-[#424242] text-xs text-[#B4B4B4]">
            <GraduationCap className="w-3.5 h-3.5 text-white" />
            <span className="text-white font-medium">SPPU University</span>
            <span className="text-[#666666]">·</span>
            <span>2024 NEP Pattern</span>
          </div>
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.2]">
            Engineering study notes, solved PYQs, and revision tools.
          </h1>
          <p className="text-sm sm:text-base text-[#9E9E9E] max-w-xl mx-auto font-normal leading-relaxed">
            Curriculum unit notes, past year exam papers with step marking, unit-wise mock quizzes, and instant AI problem solver.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={onStartPreparation}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-[#171717] bg-white hover:bg-neutral-200 transition-all cursor-pointer shadow-sm active:scale-[0.99]"
          >
            <span>Choose Branch & Semester</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left pt-4">
          
          {/* Notes */}
          <div className="p-4 rounded-xl bg-[#2F2F2F] border border-[#424242] hover:border-[#676767] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#212121] border border-[#424242] text-white flex items-center justify-center mb-2.5">
              <BookOpen className="w-4 h-4 text-[#ECECEC]" />
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-white">
              Unit Notes
            </h3>
            <p className="text-xs text-[#9E9E9E] mt-1 leading-relaxed">
              Step-by-step notes covering Units 1 to 6 with key formulas and derivations.
            </p>
          </div>

          {/* PYQ */}
          <div className="p-4 rounded-xl bg-[#2F2F2F] border border-[#424242] hover:border-[#676767] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#212121] border border-[#424242] text-white flex items-center justify-center mb-2.5">
              <FileText className="w-4 h-4 text-[#ECECEC]" />
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-white">
              Solved PYQs
            </h3>
            <p className="text-xs text-[#9E9E9E] mt-1 leading-relaxed">
              In-Sem (30M) and End-Sem (70M) university question papers with marking schemes.
            </p>
          </div>

          {/* Quizzes */}
          <div className="p-4 rounded-xl bg-[#2F2F2F] border border-[#424242] hover:border-[#676767] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#212121] border border-[#424242] text-white flex items-center justify-center mb-2.5">
              <Timer className="w-4 h-4 text-[#ECECEC]" />
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-white">
              Unit Quizzes
            </h3>
            <p className="text-xs text-[#9E9E9E] mt-1 leading-relaxed">
              20 questions timed mock test with auto-submit and detailed solutions.
            </p>
          </div>

          {/* AI Solver */}
          <div className="p-4 rounded-xl bg-[#2F2F2F] border border-[#424242] hover:border-[#676767] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#212121] border border-[#424242] text-white flex items-center justify-center mb-2.5">
              <Cpu className="w-4 h-4 text-[#ECECEC]" />
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-white">
              AI Problem Solver
            </h3>
            <p className="text-xs text-[#9E9E9E] mt-1 leading-relaxed">
              Step-by-step solutions for circuit derivations, numericals, and code questions.
            </p>
          </div>
        </div>

        {/* Minimal Counters */}
        <div className="p-4 rounded-xl bg-[#2F2F2F] border border-[#424242] flex flex-wrap items-center justify-around gap-3 text-center">
          <div>
            <p className="text-lg sm:text-xl font-bold text-white font-mono">9</p>
            <p className="text-[11px] text-[#9E9E9E]">Branches</p>
          </div>
          <div className="hidden sm:block w-px h-6 bg-[#424242]" />
          <div>
            <p className="text-lg sm:text-xl font-bold text-white font-mono">8</p>
            <p className="text-[11px] text-[#9E9E9E]">Semesters</p>
          </div>
          <div className="hidden sm:block w-px h-6 bg-[#424242]" />
          <div>
            <p className="text-lg sm:text-xl font-bold text-white font-mono">100+</p>
            <p className="text-[11px] text-[#9E9E9E]">Courses</p>
          </div>
          <div className="hidden sm:block w-px h-6 bg-[#424242]" />
          <div>
            <p className="text-lg sm:text-xl font-bold text-white font-mono">5,000+</p>
            <p className="text-[11px] text-[#9E9E9E]">Questions</p>
          </div>
        </div>
      </div>
    </div>
  );
};
