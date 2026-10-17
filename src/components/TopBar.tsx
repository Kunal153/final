import React, { useState, useRef, useEffect } from 'react';
import {
  PanelLeft,
  Upload,
  Search,
  BookOpen,
  FolderGit2,
  Compass,
  User as UserIcon,
  Palette,
  Check
} from 'lucide-react';
import { SectionType } from '../types';
import { useAuth } from '../context/AuthContext';
import { useTheme, THEME_OPTIONS } from '../context/ThemeContext';

interface TopBarProps {
  currentSection: SectionType;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onNavigate: (section: SectionType) => void;
  onOpenGitHubModal?: () => void;
  onOpenSettings?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentSection,
  sidebarOpen,
  onToggleSidebar,
  onNavigate,
  onOpenGitHubModal,
  onOpenSettings
}) => {
  const { user } = useAuth();
  const { theme, setTheme, currentThemeConfig } = useTheme();
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setThemeDropdownOpen(false);
      }
    };
    if (themeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [themeDropdownOpen]);

  const getSectionTitle = (sec: SectionType) => {
    switch (sec) {
      case 'home':
        return 'Home';
      case 'browse':
        return 'Browse Notes';
      case 'branches':
        return 'Branches & Syllabus';
      case 'upload':
        return 'Upload Notes';
      case 'account':
        return 'My Account';
      default:
        return 'EngiNotes';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-14 bg-[#212121]/95 backdrop-blur-md border-b border-[#303030] px-4 flex items-center justify-between gap-3">
      {/* Left: Sidebar toggle button & Breadcrumb title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          className="p-1.5 rounded-lg text-[#8E8E8E] hover:text-white hover:bg-[#2A2A2A] border border-transparent hover:border-[#383838] transition-colors cursor-pointer"
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-semibold text-white tracking-tight">
            {getSectionTitle(currentSection)}
          </span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Quick Theme Switcher Dropdown */}
        <div className="relative" ref={themeMenuRef}>
          <button
            onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
            title={`Current Theme: ${currentThemeConfig.name}`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#2A2A2A] hover:bg-[#333333] border border-[#383838] text-xs text-[#ECECEC] transition-colors cursor-pointer"
          >
            <Palette className="w-3.5 h-3.5 text-[#8E8E8E]" />
            <span className="hidden sm:inline font-medium text-[11px]">{currentThemeConfig.name.split(' ')[0]}</span>
          </button>

          {themeDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-52 bg-[#2F2F2F] border border-[#424242] rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in duration-100">
              <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#8E8E8E] border-b border-[#383838] mb-1">
                Choose Theme
              </div>
              <div className="space-y-0.5">
                {THEME_OPTIONS.map((t) => {
                  const isSelected = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#212121] text-white font-medium border border-[#424242]'
                          : 'text-[#B4B4B4] hover:text-white hover:bg-[#262626]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 p-0.5 rounded bg-[#212121] border border-[#424242]">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: t.previewBg }}
                          />
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: t.previewAccent }}
                          />
                        </div>
                        <span className="truncate">{t.name}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-[#383838] mt-1 pt-1">
                <button
                  onClick={() => {
                    setThemeDropdownOpen(false);
                    if (onOpenSettings) {
                      onOpenSettings();
                    } else {
                      onNavigate('account');
                    }
                  }}
                  className="w-full text-center px-2 py-1 text-[11px] text-[#A1A1A1] hover:text-white hover:bg-[#262626] rounded-md transition-colors cursor-pointer"
                >
                  All Settings & Appearance →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Upload CTA button */}
        {currentSection !== 'upload' && (
          <button
            onClick={() => onNavigate('upload')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-[#171717] font-semibold text-xs transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Upload Note</span>
          </button>
        )}

        {/* GitHub link button */}
        {onOpenGitHubModal && (
          <button
            onClick={onOpenGitHubModal}
            title="GitHub Upload Guide"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#2A2A2A] hover:bg-[#333333] text-[#B4B4B4] hover:text-white border border-[#383838] text-xs font-medium transition-colors cursor-pointer"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-[#8E8E8E]" />
            <span>GitHub</span>
          </button>
        )}

        {/* User Mini Avatar */}
        {user && (
          <button
            onClick={() => onNavigate('account')}
            className="p-0.5 rounded-full hover:ring-1 hover:ring-[#555555] transition-all cursor-pointer"
            title="My Account"
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover border border-[#383838]"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#2A2A2A] text-white text-xs font-semibold flex items-center justify-center border border-[#383838]">
                {user.name?.charAt(0) || 'U'}
              </div>
            )}
          </button>
        )}
      </div>
    </header>
  );
};
