import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Search,
  Upload,
  User as UserIcon,
  Compass,
  FolderGit2,
  LogOut,
  ChevronDown,
  PanelLeftClose,
  PanelLeft,
  Plus,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Palette
} from 'lucide-react';
import { SectionType } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';
import { BRANCHES_DATA } from '../data/branchesData';

interface SidebarProps {
  currentSection: SectionType;
  onNavigate: (section: SectionType) => void;
  onSelectBranch?: (branchCode: string) => void;
  onOpenAuthModal: () => void;
  onOpenGitHubModal?: () => void;
  onOpenSettings?: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onNavigate,
  onSelectBranch,
  onOpenAuthModal,
  onOpenGitHubModal,
  onOpenSettings,
  isOpen,
  onToggle
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { searchQuery, setSearchQuery, setSelectedBranch } = useNotes();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [branchesExpanded, setBranchesExpanded] = useState(true);

  const handleNav = (section: SectionType) => {
    onNavigate(section);
  };

  const handleBranchClick = (code: string) => {
    setSelectedBranch(code);
    if (onSelectBranch) {
      onSelectBranch(code);
    }
    onNavigate('branches');
  };

  const navItems = [
    { id: 'home' as SectionType, label: 'Home', icon: Compass },
    { id: 'browse' as SectionType, label: 'Browse Notes', icon: BookOpen },
    { id: 'branches' as SectionType, label: 'Branches & Syllabus', icon: FolderGit2 },
    { id: 'upload' as SectionType, label: 'Upload Notes', icon: Upload, badge: 'New' },
    { id: 'account' as SectionType, label: 'My Account', icon: UserIcon }
  ];

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Main Left-Hand Sidebar (ChatGPT style) */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-[#171717] border-r border-[#303030] text-[#ECECEC] transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:-translate-x-full'
        }`}
      >
        {/* Top Header / App Brand & Collapse */}
        <div className="h-14 px-3.5 flex items-center justify-between border-b border-[#282828] shrink-0">
          <div
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-7 h-7 rounded-lg bg-[#262626] border border-[#383838] flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm tracking-tight text-white">
                EngiNotes
              </span>
              <span className="text-[10px] text-[#8E8E8E] border border-[#383838] bg-[#212121] px-1.5 py-0.2 rounded font-mono">
                v2.0
              </span>
            </div>
          </div>

          <button
            onClick={onToggle}
            title="Close sidebar"
            className="p-1.5 rounded-lg text-[#8E8E8E] hover:text-white hover:bg-[#262626] transition-colors cursor-pointer"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Action: New / Upload (like ChatGPT's + New Chat) */}
        <div className="p-3 pb-2 space-y-2 shrink-0">
          <button
            onClick={() => handleNav('upload')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#212121] hover:bg-[#2A2A2A] text-white border border-[#383838] text-xs font-medium transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#8E8E8E] group-hover:text-white" />
              <span>Upload Notes</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#2A2A2A] text-[#8E8E8E]">
              +50 pts
            </span>
          </button>

          {/* Compact Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#787878] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  handleNav('browse');
                }
              }}
              placeholder="Search notes or subjects..."
              className="w-full bg-[#212121] text-xs text-white placeholder-[#787878] pl-8 pr-2.5 py-1.5 rounded-lg border border-[#333333] focus:border-[#555555] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Scrollable Navigation & Quick Directory */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4 scrollbar-thin">
          {/* Primary Navigation Options */}
          <div className="space-y-0.5">
            <div className="px-2 pb-1 text-[11px] font-medium text-[#787878] uppercase tracking-wider">
              Navigation
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#262626] text-white font-semibold'
                      : 'text-[#B4B4B4] hover:text-white hover:bg-[#212121]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#8E8E8E]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#2F2F2F] text-emerald-400 border border-[#383838]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Engineering Branches (ChatGPT style history list) */}
          <div className="space-y-1 pt-2 border-t border-[#262626]">
            <div
              onClick={() => setBranchesExpanded(!branchesExpanded)}
              className="flex items-center justify-between px-2 py-1 text-[11px] font-medium text-[#787878] uppercase tracking-wider cursor-pointer hover:text-[#B4B4B4]"
            >
              <span>Branches</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${branchesExpanded ? '' : '-rotate-90'}`}
              />
            </div>

            {branchesExpanded && (
              <div className="space-y-0.5">
                {BRANCHES_DATA.map((branch) => (
                  <button
                    key={branch.code}
                    onClick={() => handleBranchClick(branch.code)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-[#9E9E9E] hover:text-white hover:bg-[#212121] transition-colors truncate cursor-pointer flex items-center justify-between group"
                  >
                    <span className="truncate">{branch.name}</span>
                    <span className="text-[10px] font-mono text-[#666666] group-hover:text-[#9E9E9E] shrink-0 ml-1">
                      {branch.code}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Footer / User Profile & Settings */}
        <div className="p-2 border-t border-[#282828] bg-[#171717] shrink-0 relative">
          {isAuthenticated && user ? (
            <div>
              {/* User Menu Dropdown (opens upward) */}
              {userMenuOpen && (
                <div className="absolute bottom-full left-2 right-2 mb-2 bg-[#212121] border border-[#383838] rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in duration-100">
                  <div className="p-2 border-b border-[#333333] mb-1">
                    <p className="text-xs font-semibold text-white">{user.name}</p>
                    <p className="text-[11px] text-[#8E8E8E] font-mono">+91 {user.mobileNumber}</p>
                    <p className="text-[10px] text-[#8E8E8E] mt-0.5">{user.branch}</p>
                  </div>

                  <button
                    onClick={() => {
                      handleNav('account');
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#ECECEC] hover:bg-[#2A2A2A] rounded-lg transition-colors cursor-pointer"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#8E8E8E]" />
                    <span>My Account</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onOpenSettings) {
                        onOpenSettings();
                      } else {
                        handleNav('account');
                      }
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#ECECEC] hover:bg-[#2A2A2A] rounded-lg transition-colors cursor-pointer"
                  >
                    <Palette className="w-3.5 h-3.5 text-[#8E8E8E]" />
                    <span>Theme Settings</span>
                  </button>

                  {onOpenGitHubModal && (
                    <button
                      onClick={() => {
                        onOpenGitHubModal();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#ECECEC] hover:bg-[#2A2A2A] rounded-lg transition-colors cursor-pointer"
                    >
                      <FolderGit2 className="w-3.5 h-3.5 text-[#8E8E8E]" />
                      <span>GitHub Export Guide</span>
                    </button>
                  )}

                  <div className="border-t border-[#333333] my-1" />

                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-red-400 hover:bg-[#2A2A2A] rounded-lg transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}

              {/* User Trigger Button */}
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#212121] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover border border-[#383838]"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#262626] text-white text-xs font-semibold flex items-center justify-center border border-[#383838]">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <div className="text-left min-w-0">
                    <p className="text-xs font-medium text-white truncate max-w-[120px]">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-[#8E8E8E] truncate">
                      {user.branch}
                    </p>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#787878] group-hover:text-white shrink-0" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="w-full py-2 px-3 rounded-lg bg-white hover:bg-neutral-200 text-[#171717] font-semibold text-xs transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
