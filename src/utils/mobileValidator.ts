/**
 * Validation utility for student mobile numbers and names.
 * Strictly prevents sequence patterns (e.g., 1234567890, 9876543210),
 * repeated digits, dummy numbers, and non-Indian mobile prefixes.
 * All error messages are in clear, standard English.
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

const FORBIDDEN_SEQUENCES = new Set([
  '1234567890',
  '0123456789',
  '2345678901',
  '3456789012',
  '9876543210',
  '0987654321',
  '8765432109',
  '7654321098',
  '1122334455',
  '9898989898',
  '9191919191',
  '9090909090',
  '1212121212',
  '9876598765',
  '1234512345',
  '9000000000',
  '8000000000',
  '7000000000',
  '6000000000',
  '9123456780',
  '9012345678'
]);

export function validateMobileNumber(rawPhone: string): ValidationResult {
  if (!rawPhone) {
    return {
      isValid: false,
      error: 'Please enter a valid 10-digit mobile number'
    };
  }

  // Remove spaces, hyphens, and +91 prefix if pasted
  let cleaned = rawPhone.replace(/[\s\-\(\)\.]/g, '');
  if (cleaned.startsWith('+91')) {
    cleaned = cleaned.substring(3);
  } else if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.substring(2);
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.substring(1);
  }

  // Check digits only
  if (!/^\d+$/.test(cleaned)) {
    return {
      isValid: false,
      error: 'Mobile number must contain digits only'
    };
  }

  // Check length
  if (cleaned.length < 10) {
    return {
      isValid: false,
      error: `Number incomplete. ${10 - cleaned.length} more digits required (10 digits needed)`
    };
  }

  if (cleaned.length > 10) {
    return {
      isValid: false,
      error: 'Mobile number must be exactly 10 digits'
    };
  }

  // Starting digit check (Standard Indian mobile prefix: 6, 7, 8, 9)
  if (!/^[6-9]/.test(cleaned)) {
    return {
      isValid: false,
      error: 'Valid mobile number must start with 6, 7, 8, or 9'
    };
  }

  // Check against known dummy sequence list
  if (FORBIDDEN_SEQUENCES.has(cleaned)) {
    return {
      isValid: false,
      error: 'Sequence or dummy numbers (e.g. 1234567890 or 9876543210) are not allowed. Please enter your real number.'
    };
  }

  // Check 1: All identical digits (e.g. 9999999999, 8888888888, 7777777777)
  if (/^(\d)\1{9}$/.test(cleaned)) {
    return {
      isValid: false,
      error: 'All 10 digits cannot be identical (e.g. 9999999999). Please enter a genuine number.'
    };
  }

  // Check 2: 5 or more consecutive identical digits (e.g. 9888888888, 7000000123)
  if (/(\d)\1{4,}/.test(cleaned)) {
    return {
      isValid: false,
      error: 'Excessive repeated consecutive digits detected. Please enter a valid number.'
    };
  }

  // Check 3: Check for strict ascending sequence modulo 10
  let isAscending = true;
  let isDescending = true;
  for (let i = 0; i < 9; i++) {
    const curr = parseInt(cleaned[i], 10);
    const next = parseInt(cleaned[i + 1], 10);
    if ((curr + 1) % 10 !== next) {
      isAscending = false;
    }
    if ((curr - 1 + 10) % 10 !== next) {
      isDescending = false;
    }
  }

  if (isAscending || isDescending) {
    return {
      isValid: false,
      error: 'Sequential numbers (e.g. 1234567890 or 9876543210) are not permitted. Please enter a genuine mobile number.'
    };
  }

  // Check 4: Check if any contiguous chunk of 5 or more digits is an arithmetic sequence (+1 or -1)
  let maxConsecutiveAsc = 1;
  let maxConsecutiveDesc = 1;
  let currentAsc = 1;
  let currentDesc = 1;

  for (let i = 0; i < 9; i++) {
    const curr = parseInt(cleaned[i], 10);
    const next = parseInt(cleaned[i + 1], 10);

    if ((curr + 1) % 10 === next) {
      currentAsc++;
      if (currentAsc > maxConsecutiveAsc) maxConsecutiveAsc = currentAsc;
    } else {
      currentAsc = 1;
    }

    if ((curr - 1 + 10) % 10 === next) {
      currentDesc++;
      if (currentDesc > maxConsecutiveDesc) maxConsecutiveDesc = currentDesc;
    } else {
      currentDesc = 1;
    }
  }

  if (maxConsecutiveAsc >= 5 || maxConsecutiveDesc >= 5) {
    return {
      isValid: false,
      error: 'Continuous sequence patterns (e.g. 12345 or 98765) detected. Please enter a genuine number.'
    };
  }

  // Check 5: Repetitive two-digit pairs (e.g. 9898989898, 9797979797)
  const pair = cleaned.substring(0, 2);
  if (cleaned === pair.repeat(5)) {
    return {
      isValid: false,
      error: 'Repetitive pattern (e.g. 9898989898) is not allowed.'
    };
  }

  return { isValid: true };
}

export function validateName(rawName: string): ValidationResult {
  if (!rawName || !rawName.trim()) {
    return {
      isValid: false,
      error: 'Please enter your full name'
    };
  }

  const trimmed = rawName.trim();
  if (trimmed.length < 2) {
    return {
      isValid: false,
      error: 'Name must be at least 2 characters'
    };
  }

  // Should contain alphabetic characters
  if (!/[a-zA-Z]/.test(trimmed)) {
    return {
      isValid: false,
      error: 'Name must contain letters'
    };
  }

  // Purely digits not allowed
  if (/^\d+$/.test(trimmed.replace(/\s+/g, ''))) {
    return {
      isValid: false,
      error: 'Name cannot be numbers'
    };
  }

  return { isValid: true };
}

export function cleanMobileNumber(rawPhone: string): string {
  let cleaned = rawPhone.replace(/[\s\-\(\)\.]/g, '');
  if (cleaned.startsWith('+91')) {
    cleaned = cleaned.substring(3);
  } else if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.substring(2);
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.substring(1);
  }
  return cleaned;
}
