import React, { useState, useId } from 'react';
import {
  GraduationCap,
  User as UserIcon,
  Phone,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  FileText,
  Layers,
  Cpu,
  Zap,
  Code2,
  Palette,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme, THEME_OPTIONS } from '../context/ThemeContext';
import { validateMobileNumber, validateName, cleanMobileNumber } from '../utils/mobileValidator';

const ENGINEERING_BRANCHES = [
  { code: 'Computer Engineering', label: 'Computer Engineering', short: 'COMP', icon: Code2 },
  { code: 'Information Technology', label: 'Information Technology', short: 'IT', icon: Layers },
  { code: 'AI & Data Science', label: 'AI & Data Science', short: 'AI & DS', icon: Cpu },
  { code: 'Electronics & Telecommunication', label: 'Electronics & Telecommunication (E&TC)', short: 'E&TC', icon: Zap },
  { code: 'Mechanical Engineering', label: 'Mechanical Engineering', short: 'MECH', icon: Cpu },
  { code: 'Civil Engineering', label: 'Civil Engineering', short: 'CIVIL', icon: Layers },
  { code: 'Electrical Engineering', label: 'Electrical Engineering', short: 'ELECT', icon: Zap },
  { code: 'First Year (FE - Common)', label: 'First Year Engineering (FE - Common)', short: 'FE', icon: BookOpen }
];

export const FrontLoginPage: React.FC = () => {
  const { loginWithMobile } = useAuth();
  const nameInputId = useId();
  const phoneInputId = useId();
  const branchSelectId = useId();
  const semesterSelectId = useId();

  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [branch, setBranch] = useState('Computer Engineering');
  const [semester, setSemester] = useState<number>(1);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedPhone, setTouchedPhone] = useState(false);
  const [touchedName, setTouchedName] = useState(false);
  const { theme, setTheme, currentThemeConfig } = useTheme();
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  // Live validation checks
  const phoneValidation = validateMobileNumber(mobileNumber);
  const nameValidation = validateName(name);

  // Quick check for sequence during typing to alert the user immediately
  const rawClean = mobileNumber.replace(/\D/g, '');
  const isObviousSequence =
    rawClean === '1234567890' ||
    rawClean === '9876543210' ||
    rawClean === '0123456789' ||
    (rawClean.length === 10 && /^(\d)\1{9}$/.test(rawClean));

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(val);
    if (!touchedPhone) setTouchedPhone(true);
    if (errorMessage) setErrorMessage(null);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (!touchedName) setTouchedName(true);
    if (errorMessage) setErrorMessage(null);
  };

  const handleBranchSelect = (selectedBranch: string) => {
    setBranch(selectedBranch);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouchedName(true);
    setTouchedPhone(true);

    const nameCheck = validateName(name);
    if (!nameCheck.isValid) {
      setErrorMessage(nameCheck.error || 'Please enter your full name.');
      return;
    }

    const mobileCheck = validateMobileNumber(mobileNumber);
    if (!mobileCheck.isValid) {
      setErrorMessage(mobileCheck.error || 'Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!branch) {
      setErrorMessage('Please select your engineering branch.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    setTimeout(() => {
      const res = loginWithMobile({
        name: name.trim(),
        mobileNumber: cleanMobileNumber(mobileNumber),
        branch,
        semester
      });

      if (!res.success) {
        setErrorMessage(res.error || 'Login failed. Please check your credentials.');
        setIsSubmitting(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-[#212121] text-[#ECECEC] flex flex-col justify-between selection:bg-[#383838] selection:text-white">
      {/* Top Header Brand */}
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between border-b border-[#303030]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#2F2F2F] border border-[#424242] flex items-center justify-center text-white">
            <GraduationCap className="w-5 h-5 text-[#ECECEC]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base tracking-tight text-white">
                EngiNotes
              </span>
              <span className="text-[11px] font-medium text-[#9E9E9E] border border-[#424242] bg-[#2F2F2F] px-2 py-0.5 rounded-md">
                Study Hub
              </span>
            </div>
            <p className="text-xs text-[#9E9E9E]">
              Engineering Notes, Solved PYQs & Syllabi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Theme Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#2F2F2F] hover:bg-[#383838] border border-[#424242] text-xs text-[#ECECEC] transition-colors cursor-pointer"
              title={`Theme: ${currentThemeConfig.name}`}
            >
              <Palette className="w-3.5 h-3.5 text-[#8E8E8E]" />
              <span className="text-[11px] font-medium hidden sm:inline">{currentThemeConfig.name.split(' ')[0]}</span>
            </button>

            {themeMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-48 bg-[#2F2F2F] border border-[#424242] rounded-xl shadow-xl p-1.5 z-50">
                <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#8E8E8E] border-b border-[#383838] mb-1">
                  Choose Theme
                </div>
                {THEME_OPTIONS.map((t) => {
                  const isSelected = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setTheme(t.id);
                        setThemeMenuOpen(false);
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
            )}
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2F2F2F] border border-[#424242] text-xs text-[#B4B4B4]">
            <ShieldCheck className="w-4 h-4 text-[#10A37F]" />
            <span>Verified Student Access</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Visual highlights & value props */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2F2F2F] border border-[#424242] text-xs text-[#B4B4B4]">
              <span className="text-white font-medium">SPPU & University Hub</span>
              <span className="text-[#666666]">·</span>
              <span>Pattern 2024 NEP</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Study smarter. <br />
                <span className="text-[#B4B4B4] font-normal">Prepare with confidence.</span>
              </h1>
              <p className="text-sm text-[#9E9E9E] leading-relaxed max-w-lg mx-auto lg:mx-0">
                Access verified handwritten lecture notes, authentic past-year solved question papers, unit-wise mock quizzes, and curriculum guides across all engineering branches.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-left">
              <div className="p-3.5 rounded-xl bg-[#2F2F2F] border border-[#424242] flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#212121] border border-[#424242] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-3.5 h-3.5 text-[#B4B4B4]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Handwritten Notes</h4>
                  <p className="text-[11px] text-[#9E9E9E]">Unit-wise concise summaries</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#2F2F2F] border border-[#424242] flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#212121] border border-[#424242] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#B4B4B4]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">PYQ Question Bank</h4>
                  <p className="text-[11px] text-[#9E9E9E]">5-year papers with answers</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#2F2F2F] border border-[#424242] flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#212121] border border-[#424242] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-3.5 h-3.5 text-[#B4B4B4]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Last Minute Notes AI</h4>
                  <p className="text-[11px] text-[#9E9E9E]">Instant PDF formula extracts</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#2F2F2F] border border-[#424242] flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#212121] border border-[#424242] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B4B4B4]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Direct Student Access</h4>
                  <p className="text-[11px] text-[#9E9E9E]">Verified name, mobile & branch</p>
                </div>
              </div>
            </div>

            {/* Social Proof Counter */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-xs text-[#9E9E9E]">
              <div className="flex -space-x-1.5">
                {['A', 'S', 'P', 'R'].map((initial, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-[#2F2F2F] border border-[#424242] flex items-center justify-center text-[10px] font-medium text-white"
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <span>
                Joined by <strong className="text-white font-medium">14,500+</strong> engineering students
              </span>
            </div>
          </div>

          {/* Right Column: Sleek ChatGPT-style Login Card */}
          <div className="lg:col-span-7">
            <div className="bg-[#2F2F2F] border border-[#424242] rounded-2xl p-6 sm:p-8 shadow-xl">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#424242] mb-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-[#10A37F]" />
                    <span>Student Login</span>
                  </h2>
                  <p className="text-xs text-[#9E9E9E] mt-0.5">
                    Enter your genuine student details to enter the study hub
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#212121] border border-[#424242] text-xs font-medium text-[#B4B4B4]">
                  <span>Instant Access</span>
                </div>
              </div>

              {/* Error Alert Box */}
              {errorMessage && (
                <div className="mb-5 p-3.5 rounded-xl bg-[#2A1F21] border border-[#6B3238] text-[#F87171] text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-[#F87171] shrink-0 mt-0.5" />
                  <div className="flex-1 leading-relaxed">
                    <strong className="font-semibold block text-[#FCA5A5]">Validation Error</strong>
                    {errorMessage}
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. Enter Your Name */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor={nameInputId} className="block text-xs font-medium text-[#ECECEC]">
                      Full Name
                      <span className="text-[#F87171] ml-1">*</span>
                    </label>
                    {touchedName && name.trim().length >= 2 && nameValidation.isValid && (
                      <span className="text-[11px] font-medium text-[#10A37F] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Valid
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E8E8E] pointer-events-none" />
                    <input
                      id={nameInputId}
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      placeholder="e.g. Abhishek Babar or Tejas Shinde"
                      required
                      autoComplete="name"
                      className={`w-full bg-[#212121] text-sm text-white placeholder-[#6E6E6E] pl-10 pr-4 py-2.5 rounded-xl border transition-colors ${
                        touchedName && !nameValidation.isValid && name.length > 0
                          ? 'border-[#F87171] focus:border-[#F87171]'
                          : touchedName && nameValidation.isValid
                          ? 'border-[#10A37F]/60 focus:border-[#10A37F]'
                          : 'border-[#424242] focus:border-[#676767]'
                      } focus:outline-none`}
                    />
                  </div>
                </div>

                {/* 2. Enter Mobile Number */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor={phoneInputId} className="block text-xs font-medium text-[#ECECEC]">
                      Mobile Number <span className="text-[#8E8E8E]">(10 Digits)</span>
                      <span className="text-[#F87171] ml-1">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${
                          mobileNumber.length === 10
                            ? 'bg-[#10A37F]/20 text-[#10A37F]'
                            : 'bg-[#212121] text-[#8E8E8E] border border-[#424242]'
                        }`}
                      >
                        {mobileNumber.length}/10
                      </span>
                    </div>
                  </div>

                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center gap-1.5 pointer-events-none text-[#8E8E8E] border-r border-[#424242] pr-2.5">
                      <Phone className="w-3.5 h-3.5 text-[#A1A1A1]" />
                      <span className="text-xs font-medium text-[#ECECEC]">+91</span>
                    </div>
                    <input
                      id={phoneInputId}
                      type="tel"
                      inputMode="numeric"
                      value={mobileNumber}
                      onChange={handlePhoneChange}
                      placeholder="98XXXXXXXX"
                      maxLength={10}
                      required
                      autoComplete="tel"
                      className={`w-full bg-[#212121] text-sm font-mono text-white placeholder-[#6E6E6E] pl-20 pr-10 py-2.5 rounded-xl border transition-colors ${
                        isObviousSequence || (touchedPhone && !phoneValidation.isValid && mobileNumber.length === 10)
                          ? 'border-[#F87171] focus:border-[#F87171]'
                          : touchedPhone && phoneValidation.isValid
                          ? 'border-[#10A37F]/60 focus:border-[#10A37F]'
                          : 'border-[#424242] focus:border-[#676767]'
                      } focus:outline-none`}
                    />
                    {touchedPhone && phoneValidation.isValid && (
                      <CheckCircle2 className="w-4 h-4 text-[#10A37F] absolute right-3 pointer-events-none" />
                    )}
                  </div>

                  {/* Realtime sequence warning helper */}
                  {isObviousSequence && (
                    <p className="text-[11px] text-[#F87171] flex items-center gap-1 mt-1 bg-[#2A1F21] px-2.5 py-1 rounded-lg border border-[#6B3238]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Sequence or dummy numbers (e.g. 1234567890) are not permitted. Please enter your real number.</span>
                    </p>
                  )}

                  {!isObviousSequence && touchedPhone && mobileNumber.length === 10 && !phoneValidation.isValid && (
                    <p className="text-[11px] text-[#F87171] flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{phoneValidation.error}</span>
                    </p>
                  )}

                  {!isObviousSequence && touchedPhone && phoneValidation.isValid && (
                    <p className="text-[11px] text-[#10A37F] flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Verified 10-digit mobile number</span>
                    </p>
                  )}
                </div>

                {/* 3. Select Branch */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor={branchSelectId} className="block text-xs font-medium text-[#ECECEC]">
                      Select Branch
                      <span className="text-[#F87171] ml-1">*</span>
                    </label>
                    <span className="text-[11px] text-[#B4B4B4] font-medium">
                      {branch}
                    </span>
                  </div>

                  {/* Quick Select Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {ENGINEERING_BRANCHES.slice(0, 8).map((b) => {
                      const isSelected = branch === b.code;
                      const IconComp = b.icon;
                      return (
                        <button
                          key={b.code}
                          type="button"
                          onClick={() => handleBranchSelect(b.code)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                            isSelected
                              ? 'bg-[#383838] border-[#676767] text-white shadow-sm'
                              : 'bg-[#212121] border-[#424242] text-[#B4B4B4] hover:bg-[#282828] hover:border-[#525252] hover:text-white'
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'bg-white text-[#171717]'
                                : 'bg-[#2F2F2F] text-[#9E9E9E]'
                            }`}
                          >
                            <IconComp className="w-3.5 h-3.5" />
                          </div>
                          <div className="truncate">
                            <span className="block text-xs font-medium truncate">
                              {b.short}
                            </span>
                            <span className="text-[10px] text-[#8E8E8E] block truncate">
                              {b.label}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Full Dropdown for all branches */}
                  <div className="pt-1">
                    <select
                      id={branchSelectId}
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full bg-[#212121] text-xs text-[#ECECEC] px-3.5 py-2.5 rounded-xl border border-[#424242] focus:border-[#676767] focus:outline-none cursor-pointer"
                    >
                      {ENGINEERING_BRANCHES.map((b) => (
                        <option key={b.code} value={b.code}>
                          {b.label} ({b.short})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Semester selection */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor={semesterSelectId} className="block text-xs font-medium text-[#A1A1A1]">
                      Semester
                    </label>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((semNum) => {
                      const isSelected = semester === semNum;
                      return (
                        <button
                          key={semNum}
                          type="button"
                          onClick={() => setSemester(semNum)}
                          className={`py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white text-[#171717] font-semibold'
                              : 'bg-[#212121] text-[#9E9E9E] hover:text-white border border-[#424242]'
                          }`}
                        >
                          Sem {semNum}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Login Button - Restrained, clean high-contrast */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-xl bg-white hover:bg-neutral-200 text-[#171717] font-semibold text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-neutral-400 border-t-neutral-900 rounded-full animate-spin" />
                        <span>Verifying credentials...</span>
                      </div>
                    ) : (
                      <>
                        <span>Enter Study Hub</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Bottom Guarantee */}
              <div className="mt-5 pt-4 border-t border-[#424242] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#9E9E9E] text-center sm:text-left">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10A37F]" />
                  <span>Verified direct login via Name, Mobile No. & Branch</span>
                </div>
                <span>
                  100% Free Academic Portal
                </span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#303030] py-4 text-center text-xs text-[#8E8E8E]">
        <p>
          EngiNotes Study Hub © {new Date().getFullYear()} · Engineering Notes, PYQs & Syllabi Portal
        </p>
      </footer>
    </div>
  );
};
