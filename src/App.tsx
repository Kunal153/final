import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotesProvider, useNotes } from './context/NotesContext';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { HomeSection } from './components/HomeSection';
import { BrowseNotesSection } from './components/BrowseNotesSection';
import { BranchesSection } from './components/BranchesSection';
import { UploadNotesSection } from './components/UploadNotesSection';
import { MyAccountSection } from './components/MyAccountSection';
import { NotePreviewModal } from './components/NotePreviewModal';
import { AuthModal } from './components/AuthModal';
import { GitHubExportModal } from './components/GitHubExportModal';
import { Footer } from './components/Footer';
import { BrahmastraAiModal } from './components/BrahmastraAiModal';
import { FrontLoginPage } from './components/FrontLoginPage';
import { Note, SectionType } from './types';

function AppContent() {
  const { notes } = useNotes();
  const { user, isAuthenticated } = useAuth();
  const [currentSection, setCurrentSection] = useState<SectionType>('home');
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  const [previewNote, setPreviewNote] = useState<Note | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [githubModalOpen, setGithubModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [accountInitialTab, setAccountInitialTab] = useState<'saved' | 'uploads' | 'history' | 'settings'>('saved');

  if (!isAuthenticated || !user) {
    return <FrontLoginPage />;
  }

  // Navigation handlers
  const handleNavigate = (section: SectionType) => {
    setCurrentSection(section);
    if (section === 'account') {
      setAccountInitialTab('saved');
    }
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSettings = () => {
    setAccountInitialTab('settings');
    setCurrentSection('account');
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSubject = (subject: string) => {
    setSubjectFilter(subject);
    setCurrentSection('browse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBranchAndSem = (branchCode: string, sem?: number) => {
    setCurrentSection('browse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex bg-[#212121] text-[#ECECEC] selection:bg-[#383838] selection:text-white overflow-x-hidden">
      {/* Left-Hand Sidebar (ChatGPT Style Option Bar) */}
      <Sidebar
        currentSection={currentSection}
        onNavigate={handleNavigate}
        onSelectBranch={() => {
          handleNavigate('branches');
        }}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onOpenGitHubModal={() => setGithubModalOpen(true)}
        onOpenSettings={handleOpenSettings}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-200">
        <TopBar
          currentSection={currentSection}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onNavigate={handleNavigate}
          onOpenGitHubModal={() => setGithubModalOpen(true)}
          onOpenSettings={handleOpenSettings}
        />

        <main className="flex-1">
          {currentSection === 'home' && (
            <HomeSection
              notes={notes}
              onNavigate={handleNavigate}
              onSelectSubject={handleSelectSubject}
              onPreviewNote={(note) => setPreviewNote(note)}
            />
          )}

          {currentSection === 'browse' && (
            <BrowseNotesSection
              notes={notes}
              initialSubjectFilter={subjectFilter}
              onPreviewNote={(note) => setPreviewNote(note)}
              onNavigate={handleNavigate}
            />
          )}

          {currentSection === 'branches' && (
            <BranchesSection
              onSelectBranchAndSem={handleSelectBranchAndSem}
              onSelectSubject={handleSelectSubject}
              onNavigate={handleNavigate}
              onPreviewNote={(note) => setPreviewNote(note)}
            />
          )}

          {currentSection === 'upload' && (
            <UploadNotesSection
              onNavigate={handleNavigate}
              onPreviewNote={(note) => setPreviewNote(note)}
              onOpenAuthModal={() => setAuthModalOpen(true)}
            />
          )}

          {currentSection === 'account' && (
            <MyAccountSection
              onNavigate={handleNavigate}
              onPreviewNote={(note) => setPreviewNote(note)}
              onOpenAuthModal={() => setAuthModalOpen(true)}
              initialTab={accountInitialTab}
            />
          )}
        </main>

        {/* Footer */}
        <Footer
          onNavigate={handleNavigate}
          onSelectSubject={handleSelectSubject}
        />
      </div>

      {/* Interactive Note Preview Reader Modal */}
      <NotePreviewModal
        note={previewNote}
        onClose={() => setPreviewNote(null)}
      />

      {/* Firebase Google Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* GitHub Repository Upload Guide Modal */}
      <GitHubExportModal
        isOpen={githubModalOpen}
        onClose={() => setGithubModalOpen(false)}
      />

      {/* Floating Draggable Brahmastra AI Bot */}
      <BrahmastraAiModal
        onSelectSubject={handleSelectSubject}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotesProvider>
          <AppContent />
        </NotesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
