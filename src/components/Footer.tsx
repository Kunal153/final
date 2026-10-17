import React from 'react';
import { GraduationCap } from 'lucide-react';
import { SectionType } from '../types';

interface FooterProps {
  onNavigate: (section: SectionType) => void;
  onSelectSubject: (subject: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1C1C1C] border-t border-[#2A2A2A] text-[#8E8E8E] text-xs py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#262626] border border-[#383838] flex items-center justify-center text-white">
            <GraduationCap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-xs text-white">EngiNotes</span>
          <span className="text-[#666666]">·</span>
          <span className="text-[#8E8E8E] text-xs">Engineering Study Hub</span>
        </div>

        <div className="flex items-center gap-5 text-xs text-[#8E8E8E]">
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigate('browse');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Browse
          </button>
          <button
            onClick={() => {
              onNavigate('branches');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Branches
          </button>
          <button
            onClick={() => {
              onNavigate('upload');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Upload
          </button>
        </div>
      </div>
    </footer>
  );
};
