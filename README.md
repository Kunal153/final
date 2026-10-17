# EngiNotes - College & Engineering Study Hub 🎓📚

EngiNotes is a modern, responsive web application for engineering students and educators to discover, preview, share, and verify semester course notes, handwritten summaries, past year university exam solutions (PYQs), and formula cheat sheets across major engineering departments.

---

## 🌟 Key Features

- **Department-Wise Academic Directory**:
  - Computer Science & Engineering (CSE)
  - Electronics & Communication (ECE)
  - Mechanical Engineering (MECH)
  - Civil Engineering (CIVIL)
  - Electrical & Electronics Engineering (EEE)
  - AI & Data Science (AIDS)
  - Information Technology (IT)

- **8-Semester Syllabus Breakdown**:
  - Full semester curriculum coverage with subject codes, credits, and module units.
  - One-click filtering for notes aligned to specific course units.

- **In-Browser Document Reader**:
  - Multi-page document preview with zoom controls (80% - 140%).
  - Highlighted formulas, theorems, and code snippets.
  - Interactive 5-star rating system and instant PDF download.

- **Peer-to-Peer Contributor Portal**:
  - Drag-and-drop document upload (PDF, DOCX, PPT).
  - Live card preview updating as you type.
  - Contributor reputation scoring (+50 points per verified upload).

- **Authentication & User Dashboard**:
  - Google Sign-In and 1-Click Demo Profiles (Student & Topper).
  - Saved bookmarks, upload management, and download history.

---

## 📂 Repository File Structure

```text
├── index.html                  # HTML entry point with typography & meta tags
├── metadata.json               # App metadata & capabilities
├── package.json                # Project dependencies and build scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite bundler configuration with Tailwind CSS
├── README.md                   # Project documentation & GitHub setup guide
├── src/
│   ├── main.tsx                # React DOM entry point
│   ├── App.tsx                 # Root component orchestrating the 5 sections & modals
│   ├── index.css               # Tailwind CSS & custom scrollbar styles
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces (Note, User, Branch, Section)
│   ├── data/
│   │   ├── branchesData.ts     # Curriculum catalog & semester course units
│   │   └── seedNotes.ts        # Verified study notes, formulas, and previews
│   ├── context/
│   │   ├── AuthContext.tsx     # Authentication, Google login, & user state
│   │   └── NotesContext.tsx    # Notes library, search, filters, ratings, & downloads
│   └── components/
│       ├── Navbar.tsx          # Sticky glassmorphism header & search
│       ├── HomeSection.tsx     # Landing page, hero search, & featured notes
│       ├── BrowseNotesSection.tsx # Filterable library (branches, semesters, categories)
│       ├── BranchesSection.tsx # Department explorer & 8-semester course guide
│       ├── UploadNotesSection.tsx # Contributor publishing studio with live preview
│       ├── MyAccountSection.tsx# User profile, saved bookmarks, & upload stats
│       ├── NotePreviewModal.tsx# In-browser multi-page document viewer
│       ├── AuthModal.tsx       # Sign in & 1-click demo login modal
│       ├── Footer.tsx          # Academic directory footer
│       ├── BranchIcon.tsx      # Dynamic branch icon renderer
│       └── NoteCard.tsx        # Reusable note card with download & preview
```

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/enginotes.git
   cd enginotes
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🚀 Deploying to Vercel

This repository is pre-configured for 1-click deployment on [Vercel](https://vercel.com):

### Option A: Deploy via GitHub (Recommended)
1. Push this repository to GitHub (see instructions below).
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..." > "Project"**.
3. Select your GitHub repository.
4. Vercel automatically detects the Vite framework and applies the settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. *(Optional)* In **Environment Variables**, add:
   - `GEMINI_API_KEY`: Your Google Gemini API key (for live AI answering & PDF summarizer).
6. Click **Deploy**!

### Option B: Deploy via Vercel CLI
```bash
# 1. Install Vercel CLI globally (if not already installed)
npm install -g vercel

# 2. Deploy to preview
vercel

# 3. Deploy to production
vercel --prod
```

The app includes:
- Production-optimized Vite React bundle in `dist/`.
- Serverless API handler in `api/index.ts` powering `/api/gemini/solve` and `/api/gemini/summarize-pdf`.
- Built-in fallback responses if the Gemini API key is not configured.
- `vercel.json` rewrite configuration for seamless client-side SPA routing and serverless API proxying.

---

## 📤 How to Upload to GitHub

### Method 1: Using the Terminal (Recommended)

```bash
# 1. Initialize git repository
git init

# 2. Add all files
git add .

# 3. Commit your changes
git commit -m "Initial commit: Complete EngiNotes engineering platform"

# 4. Rename default branch to main
git branch -M main

# 5. Connect your remote GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# 6. Push code to GitHub
git push -u origin main
```

### Method 2: Direct GitHub Web UI Upload
1. Open your GitHub repository in your browser.
2. Click **Add file** > **Upload files**.
3. Drag and drop the project folder contents (excluding `node_modules` and `dist`).
4. Commit your changes.

---

## 🛡️ License
Distributed under the Apache-2.0 License.
