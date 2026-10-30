export function normalizePhone(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const digits = trimmed.replace(/[^\d]/g, "");
  let national = digits;
  if (national.length === 11 && national.startsWith("0")) {
    national = `91${national.slice(1)}`;
  } else if (national.length === 10) {
    national = `91${national}`;
  }
  if (!/^\d{11,15}$/.test(national)) return null;
  return national;
}
