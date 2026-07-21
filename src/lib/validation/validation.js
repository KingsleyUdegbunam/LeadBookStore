export const isValidEmail = (email) => {
  const trimmed = email.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(trimmed);
};

export const validatePassword = (password) => {
  return {
    minLength: password.length >= 8,
    maxLength: password.length <= 128,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasDigit: /\d/.test(password),
    hasSpecialCharacters: /[^A-Za-z0-9]/.test(password),
    hasNoSpaces: !/\s/.test(password),
  };
};

export const validateName = (name) => {
  const trimmed = name.trim().replace(/\s+/g, " ");

  if (trimmed.length < 2)
    return {
      valid: false,
      message: "Name must be at least 2 characters.",
    };

  const regex = /^[\p{L}\p{M}]+(?:[-' ][\p{L}\p{M}]+)*$/u;

  if (!regex.test(trimmed)) {
    return {
      valid: false,
      message: "Only letters, spaces, hyphens, and apostrophes are allowed.",
    };
  }

  return {
    valid: true,
    message: "",
  };
};

export const validateEmail = (email) => {
  const trimmed = email.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const result = regex.test(trimmed);

  if (!result)
    return {
      valid: false,
      message: "Enter a valid email address",
    };

  return {
    valid: true,
    message: "",
  };
};
