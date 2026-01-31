export function isValidPhone(phone) {
  const cleaned = phone.trim();
  const phoneRegex = /^\+?[0-9\s\-()]{10,}$/;
  return phoneRegex.test(cleaned);
}
