import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Search,
  Upload,
  User as UserIcon,
  Menu,
  X,
  Compass,
  FolderGit2,
  Sparkles,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { SectionType } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';

interface NavbarProps {
  currentSection: SectionType;
  onNavigate: (section: SectionType) => void;
  onOpenAuthModal: () => void;
  onOpenGitHubModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onNavigate,
  onOpenAuthModal,
  onOpenGitHubModal
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { searchQuery, setSearchQuery } = useNotes();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavClick = (section: SectionType) => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('browse');
    }
  };

  const navLinks: { id: SectionType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { id: 'browse', label: 'Browse Notes', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'branches', label: 'Branches & Syllabus', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'upload', label: 'Upload Notes', icon: <Upload className="w-4 h-4" />, badge: '+50' },
    { id: 'account', label: 'My Account', icon: <UserIcon className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#212121]/95 backdrop-blur-md border-b border-[#303030]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0 select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#2F2F2F] border border-[#424242] flex items-center justify-center text-white transition-colors group-hover:border-[#676767]">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm tracking-tight text-white">
              EngiNotes
            </span>
            <span className="text-[10px] text-[#9E9E9E] border border-[#424242] bg-[#2F2F2F] px-1.5 py-0.2 rounded font-medium">
              Hub
            </span>
          </div>
        </div>

        {/* Global Search Bar (Medium & Up) */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center relative max-w-xs xl:max-w-sm w-full"
        >
          <Search className="w-3.5 h-3.5 absolute left-3 text-[#8E8E8E] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, subjects, branch..."
            className="w-full bg-[#2F2F2F] text-xs text-white placeholder-[#787878] pl-8 pr-3 py-1.5 rounded-lg border border-[#424242] focus:border-[#676767] focus:outline-none transition-colors"
          />
        </form>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = currentSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white bg-[#2F2F2F] border border-[#424242]'
                    : 'text-[#B4B4B4] hover:text-white hover:bg-[#2F2F2F]/60'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-[#383838] text-[#10A37F] border border-[#424242]">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Auth & Actions */}
        <div className="flex items-center gap-2">
          {/* GitHub Export Helper */}
          {onOpenGitHubModal && (
            <button
              onClick={onOpenGitHubModal}
              title="GitHub Files & Upload Guide"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] text-[#B4B4B4] hover:text-white border border-[#424242] text-xs font-medium transition-colors cursor-pointer"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-[#9E9E9E]" />
              <span>GitHub</span>
            </button>
          )}

          {/* Quick Upload CTA (Mobile & Tablet) */}
          <button
            onClick={() => handleNavClick('upload')}
            className="hidden sm:flex lg:hidden items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-[#171717] font-semibold text-xs transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload</span>
          </button>

          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-2 py-1 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] border border-[#424242] transition-colors cursor-pointer"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-[#424242]"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#383838] flex items-center justify-center text-white font-semibold text-xs border border-[#424242]">
                    {user.name ? user.name.charAt(0) : 'U'}
                  </div>
                )}
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-medium text-white line-clamp-1 max-w-[100px]">
                    {user.name}
                  </p>
                </div>
                <ChevronDown className="w-3 h-3 text-[#8E8E8E] hidden sm:block" />
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-56 bg-[#2F2F2F] border border-[#424242] rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in duration-100">
                  <div className="p-2 border-b border-[#424242] mb-1">
                    <p className="text-xs font-semibold text-white">{user.name}</p>
                    <p className="text-[11px] font-mono text-[#9E9E9E]">+91 {user.mobileNumber}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] text-[#B4B4B4] bg-[#212121] px-2 py-0.5 rounded border border-[#424242]">
                        {user.branch} {user.semester ? `· Sem ${user.semester}` : ''}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleNavClick('account');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#ECECEC] hover:bg-[#383838] rounded-lg transition-colors cursor-pointer"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#9E9E9E]" />
                    <span>My Account & Downloads</span>
                  </button>

                  <button
                    onClick={() => {
                      handleNavClick('upload');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#ECECEC] hover:bg-[#383838] rounded-lg transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#9E9E9E]" />
                    <span>Upload New Notes</span>
                  </button>

                  <div className="border-t border-[#424242] my-1"></div>

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#F87171] hover:bg-[#383838] rounded-lg transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-[#171717] font-semibold text-xs transition-colors cursor-pointer"
            >
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile menu hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-[#2F2F2F] border border-[#424242] text-[#B4B4B4] hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#212121] border-b border-[#303030] px-4 pt-3 pb-5 space-y-2">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#8E8E8E] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes, subjects, branch..."
              className="w-full bg-[#2F2F2F] text-xs text-white placeholder-[#787878] pl-8 pr-3 py-2 rounded-lg border border-[#424242] focus:outline-none focus:border-[#676767]"
            />
          </form>

          {navLinks.map((link) => {
            const isActive = currentSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white bg-[#2F2F2F] border border-[#424242]'
                    : 'text-[#B4B4B4] hover:text-white hover:bg-[#2F2F2F]/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {link.icon}
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-[#383838] text-[#10A37F] border border-[#424242]">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
