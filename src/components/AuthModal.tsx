import React, { useState } from 'react';
import {
  X,
  User as UserIcon,
  Phone,
  GraduationCap,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { validateMobileNumber, validateName, cleanMobileNumber } from '../utils/mobileValidator';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BRANCHES = [
  'Computer Engineering',
  'Information Technology',
  'AI & Data Science',
  'Electronics & Telecommunication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'First Year (FE - Common)'
];

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginWithMobile } = useAuth();

  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [branch, setBranch] = useState('Computer Engineering');
  const [semester, setSemester] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const phoneCheck = validateMobileNumber(mobileNumber);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const nameCheck = validateName(name);
    if (!nameCheck.isValid) {
      setError(nameCheck.error || 'Please enter your name.');
      return;
    }

    const mobCheck = validateMobileNumber(mobileNumber);
    if (!mobCheck.isValid) {
      setError(mobCheck.error || 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = loginWithMobile({
        name: name.trim(),
        mobileNumber: cleanMobileNumber(mobileNumber),
        branch,
        semester
      });

      setLoading(false);
      if (res.success) {
        onClose();
      } else {
        setError(res.error || 'Login failed.');
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#2F2F2F] border border-[#424242] rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-2xl relative space-y-4 text-[#ECECEC]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#212121] text-[#8E8E8E] hover:text-white transition-colors cursor-pointer border border-[#424242]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-xl bg-[#212121] border border-[#424242] flex items-center justify-center text-white mx-auto mb-2">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-white">
            Student Login
          </h2>
          <p className="text-xs text-[#8E8E8E]">
            Enter your details to access the study hub
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-[#212121] border border-red-500/40 text-red-400 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-[#8E8E8E] mb-1">
              Full Name
            </label>
            <div className="relative">
              <UserIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E8E]" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Student Name"
                className="w-full bg-[#212121] text-xs text-[#ECECEC] placeholder-[#8E8E8E] pl-9 pr-3 py-2 rounded-lg border border-[#424242] focus:border-[#8E8E8E] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-[#8E8E8E]">
                Mobile Number
              </label>
              <span className="text-[10px] font-mono text-[#8E8E8E]">
                {mobileNumber.length}/10
              </span>
            </div>
            <div className="relative flex items-center">
              <div className="absolute left-2.5 text-xs text-[#8E8E8E] border-r border-[#424242] pr-2 flex items-center gap-1 font-mono">
                <Phone className="w-3 h-3 text-[#B4B4B4]" />
                <span>+91</span>
              </div>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                required
                value={mobileNumber}
                onChange={(e) => {
                  setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10));
                  if (error) setError(null);
                }}
                placeholder="10-digit number"
                className="w-full bg-[#212121] font-mono text-xs text-[#ECECEC] placeholder-[#8E8E8E] pl-16 pr-8 py-2 rounded-lg border border-[#424242] focus:border-[#8E8E8E] focus:outline-none transition-colors"
              />
              {phoneCheck.isValid && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 absolute right-3 pointer-events-none" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-medium text-[#8E8E8E] mb-1">
                Branch
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full bg-[#212121] text-xs text-[#ECECEC] px-2.5 py-2 rounded-lg border border-[#424242] focus:border-[#8E8E8E] focus:outline-none cursor-pointer"
              >
                {BRANCHES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#8E8E8E] mb-1">
                Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="w-full bg-[#212121] text-xs text-[#ECECEC] px-2.5 py-2 rounded-lg border border-[#424242] focus:border-[#8E8E8E] focus:outline-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#ECECEC] hover:bg-white text-[#212121] font-semibold text-xs transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
