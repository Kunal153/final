export type SectionType = 'home' | 'browse' | 'branches' | 'upload' | 'account';

export type NoteCategory =
  | 'Lecture Notes'
  | 'Handwritten Notes'
  | 'Question Bank (PYQ)'
  | 'Formula Sheet'
  | 'Lab Manual'
  | 'Solved Papers';

export interface NotePagePreview {
  pageNumber: number;
  title: string;
  content: string;
  keyPoints?: string[];
  codeSnippet?: string;
  formula?: string;
}

export interface NoteAuthor {
  id: string;
  name: string;
  college: string;
  avatarUrl?: string;
  verified: boolean;
  role?: string;
}

export interface Note {
  id: string;
  title: string;
  subject: string;
  branch: string;
  semester: number;
  category: NoteCategory;
  description: string;
  author: NoteAuthor;
  fileName: string;
  fileSize: string;
  pages: number;
  format: 'pdf' | 'docx' | 'ppt';
  downloads: number;
  rating?: number;
  reviewsCount?: number;
  upvotes: number;
  isVerified: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
  previewPages: NotePagePreview[];
  syllabusUnitsCovered?: string[];
  syllabusPattern?: string;
  fileDataUrl?: string;
  fileBlobUrl?: string;
  hasOriginalFile?: boolean;
  isUserUploaded?: boolean;
}

export interface User {
  id: string;
  name: string;
  mobileNumber: string;
  branch: string;
  semester?: number;
  email?: string;
  college?: string;
  avatar?: string;
  role: 'student' | 'topper' | 'educator';
  reputationPoints: number;
  savedNoteIds: string[];
  downloadedNoteIds: string[];
  upvotedNoteIds: string[];
  uploadedNoteIds: string[];
  joinedAt?: string;
}

export interface SubjectInfo {
  code: string;
  name: string;
  credits: number;
  description: string;
  units: string[];
}

export interface SemesterSyllabus {
  semester: number;
  subjects: SubjectInfo[];
}

export interface BranchInfo {
  code: string;
  name: string;
  shortDesc: string;
  iconName: string;
  accentColor: string;
  gradient: string;
  totalNotes: number;
  popularSubjects: string[];
  semesters: SemesterSyllabus[];
}
