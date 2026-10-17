import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  FolderGit2,
  FileCode,
  Terminal,
  ExternalLink,
  Download,
  Layers,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface GitHubExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubExportModal: React.FC<GitHubExportModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'parts' | 'commands' | 'structure'>('parts');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const projectParts = [
    {
      part: 'Core Configuration',
      files: [
        { path: 'package.json', desc: 'Dependencies and build scripts' },
        { path: 'vite.config.ts', desc: 'Vite & Tailwind CSS v4 bundler setup' },
        { path: 'tsconfig.json', desc: 'TypeScript path mappings & config' },
        { path: 'index.html', desc: 'HTML entry point' }
      ]
    },
    {
      part: 'Data Models & Context',
      files: [
        { path: 'src/types/index.ts', desc: 'TypeScript type definitions' },
        { path: 'src/data/branchesData.ts', desc: 'Engineering branches and syllabi' },
        { path: 'src/context/AuthContext.tsx', desc: 'Authentication state' },
        { path: 'src/context/NotesContext.tsx', desc: 'Notes and filters context' }
      ]
    },
    {
      part: 'Components',
      files: [
        { path: 'src/components/Sidebar.tsx', desc: 'Left-hand navigation sidebar' },
        { path: 'src/components/TopBar.tsx', desc: 'Top status header bar' },
        { path: 'src/components/HomeSection.tsx', desc: 'Curriculum explorer and home screen' },
        { path: 'src/components/BrowseNotesSection.tsx', desc: 'Notes search and filtering' },
        { path: 'src/components/UploadNotesSection.tsx', desc: 'Note submission studio' },
        { path: 'src/components/MyAccountSection.tsx', desc: 'Student dashboard' }
      ]
    }
  ];

  const terminalCommands = `# Step 1: Initialize Git repository
git init

# Step 2: Add all files
git add .

# Step 3: Create initial commit
git commit -m "Initial commit"

# Step 4: Set branch to main
git branch -M main

# Step 5: Add remote repository
git remote add origin https://github.com/USERNAME/REPOSITORY.git

# Step 6: Push to GitHub
git push -u origin main`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#2F2F2F] border border-[#424242] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl text-[#ECECEC]">
        {/* Header */}
        <div className="p-4 sm:px-6 bg-[#212121] border-b border-[#424242] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2F2F2F] text-white flex items-center justify-center border border-[#424242]">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white">
                GitHub Repository Guide
              </h3>
              <p className="text-xs text-[#8E8E8E]">
                Steps to push the codebase to your GitHub repository
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#2F2F2F] text-[#8E8E8E] hover:text-white transition-colors cursor-pointer border border-[#424242]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-2.5 bg-[#212121] border-b border-[#424242] flex items-center gap-2 text-xs shrink-0">
          <button
            onClick={() => setActiveTab('parts')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeTab === 'parts'
                ? 'bg-[#2F2F2F] text-white border border-[#424242]'
                : 'text-[#8E8E8E] hover:text-[#ECECEC]'
            }`}
          >
            File Modules
          </button>
          <button
            onClick={() => setActiveTab('commands')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'commands'
                ? 'bg-[#2F2F2F] text-white border border-[#424242]'
                : 'text-[#8E8E8E] hover:text-[#ECECEC]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Git Commands</span>
          </button>
          <button
            onClick={() => setActiveTab('structure')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeTab === 'structure'
                ? 'bg-[#2F2F2F] text-white border border-[#424242]'
                : 'text-[#8E8E8E] hover:text-[#ECECEC]'
            }`}
          >
            Directory Tree
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-[#2F2F2F]">
          {activeTab === 'parts' && (
            <div className="space-y-4">
              {projectParts.map((group, idx) => (
                <div
                  key={idx}
                  className="bg-[#212121] border border-[#424242] rounded-xl p-4 space-y-2.5"
                >
                  <div className="flex items-center justify-between pb-1 border-b border-[#333333]">
                    <h4 className="text-xs font-semibold text-white">
                      {group.part}
                    </h4>
                    <span className="text-[10px] text-[#8E8E8E] font-mono">
                      {group.files.length} files
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5">
                    {group.files.map((file) => (
                      <div
                        key={file.path}
                        className="flex items-center justify-between p-2 rounded-lg bg-[#282828] border border-[#383838]"
                      >
                        <div className="min-w-0 pr-3">
                          <span className="font-mono text-xs text-[#ECECEC]">
                            {file.path}
                          </span>
                          <p className="text-[11px] text-[#8E8E8E] truncate">
                            {file.desc}
                          </p>
                        </div>

                        <button
                          onClick={() => copyToClipboard(file.path, file.path)}
                          className="shrink-0 p-1 rounded-md bg-[#212121] hover:bg-[#333333] text-[#8E8E8E] hover:text-white transition-colors cursor-pointer"
                          title="Copy file path"
                        >
                          {copiedKey === file.path ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'commands' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8E8E8E]">
                  Execute in terminal to push to your repository:
                </span>
                <button
                  onClick={() => copyToClipboard(terminalCommands, 'cmd')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ECECEC] hover:bg-white text-[#212121] text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedKey === 'cmd' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy All</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-[#1E1E1E] border border-[#383838] rounded-xl p-4 overflow-x-auto">
                <pre className="text-xs font-mono text-[#ECECEC] leading-relaxed">
                  {terminalCommands}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'structure' && (
            <div className="bg-[#1E1E1E] border border-[#383838] rounded-xl p-4 overflow-x-auto">
              <pre className="text-xs font-mono text-[#B4B4B4] leading-relaxed">
{`├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    ├── data/
    ├── context/
    └── components/
        ├── Sidebar.tsx
        ├── TopBar.tsx
        ├── HomeSection.tsx
        ├── BrowseNotesSection.tsx
        ├── BranchesSection.tsx
        ├── UploadNotesSection.tsx
        ├── MyAccountSection.tsx
        ├── NotePreviewModal.tsx
        ├── AuthModal.tsx
        └── Footer.tsx`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:px-6 bg-[#212121] border-t border-[#424242] flex items-center justify-end text-xs shrink-0">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] text-white font-medium cursor-pointer border border-[#424242]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
