import type { ThemeConfig } from '@portfolio/types';

/** Converts a hex color (#rgb or #rrggbb) into an "r g b" triplet for CSS vars. */
function hexToRgbTriplet(hex: string): string {
  let value = hex.replace('#', '').trim();
  if (value.length === 3) {
    value = value
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const int = parseInt(value, 16);
  if (Number.isNaN(int) || value.length !== 6) {
    return '110 231 183';
  }
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `${r} ${g} ${b}`;
}

/** Builds the inline CSS-variable style object applied to <html>. */
export function themeToCssVars(theme: ThemeConfig): Record<string, string> {
  return {
    '--accent': hexToRgbTriplet(theme.accent),
    '--accent-2': hexToRgbTriplet(theme.accentSecondary),
    '--bg': hexToRgbTriplet(theme.background),
  };
}
