export function isValidPhone(phone) {
  const cleaned = phone.trim();
  // 10-20 chars, digits with optional +, spaces, dashes, parens
  const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
  // Must contain at least 10 actual digits
  const digitCount = cleaned.replace(/\D/g, "").length;
  return phoneRegex.test(cleaned) && digitCount >= 10 && digitCount <= 15;
}
