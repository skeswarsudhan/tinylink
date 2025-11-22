export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidCode(code: string) {
  return /^[A-Za-z0-9]{6,8}$/.test(code);
}

export function randomCode() {
  return Math.random().toString(36).substring(2, 10).slice(0, 6);
}
