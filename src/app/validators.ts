// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation (min 8 chars, at least one number, one uppercase)
export const isValidPassword = (password: string): boolean => {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
};

// Display name validation
export const isValidDisplayName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 50;
};

// XSS prevention - sanitize text
export const sanitizeText = (text: string): string => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Talent description validation
export const isValidTalentDescription = (desc: string): boolean => {
  const trimmed = desc.trim();
  return trimmed.length >= 10 && trimmed.length <= 500;
};

// Email validation for forms
export const validateEmail = (
  email: string
): { isValid: boolean; error?: string } => {
  if (!email) return { isValid: false, error: "Email is required" };
  if (!isValidEmail(email)) {
    return { isValid: false, error: "Please enter a valid email" };
  }
  return { isValid: true };
};

// Password validation for forms
export const validatePassword = (
  password: string
): { isValid: boolean; error?: string } => {
  if (!password) return { isValid: false, error: "Password is required" };
  if (password.length < 8) {
    return { isValid: false, error: "Password must be at least 8 characters" };
  }
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one uppercase letter",
    };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: "Password must contain at least one number" };
  }
  return { isValid: true };
};

// Display name validation for forms
export const validateDisplayName = (
  name: string
): { isValid: boolean; error?: string } => {
  if (!name) return { isValid: false, error: "Display name is required" };
  if (!isValidDisplayName(name)) {
    return {
      isValid: false,
      error: "Display name must be between 2 and 50 characters",
    };
  }
  return { isValid: true };
};

// Talent title validation
export const validateTalentTitle = (
  title: string
): { isValid: boolean; error?: string } => {
  const trimmed = title.trim();
  if (!trimmed) return { isValid: false, error: "Title is required" };
  if (trimmed.length < 3 || trimmed.length > 100) {
    return {
      isValid: false,
      error: "Title must be between 3 and 100 characters",
    };
  }
  return { isValid: true };
};

// Batch validation
export const validateForm = (
  fields: Record<string, { value: string; validator: (v: string) => { isValid: boolean; error?: string } }>
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  let isValid = true;

  Object.entries(fields).forEach(([key, { value, validator }]) => {
    const result = validator(value);
    if (!result.isValid) {
      errors[key] = result.error || "Invalid field";
      isValid = false;
    }
  });

  return { isValid, errors };
};
