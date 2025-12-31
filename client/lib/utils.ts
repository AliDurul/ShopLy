import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const slugify = (s: string) =>
  s.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");


export const formatCurrency = (amount: number, locale = 'en-US', currency = 'USD') => {
  return amount.toLocaleString(locale, {
    style: 'currency',
    currency,
  });
}

// Helpers
export function mapColor(col: string): string {
  const lower = col.toLowerCase();
  switch (lower) {
    case 'black': return '#000';
    case 'white': return '#fff';
    case 'blue': return '#2563eb';
    case 'red': return '#dc2626';
    case 'green': return '#16a34a';
    case 'gray': return '#6b7280';
    case 'yellow': return '#eab308';
    case 'purple': return '#7e22ce';
    case 'pink': return '#db2777';
    default: return col; // attempt direct CSS color
  }
}

export function isNamedColor(val: string): boolean {
  return /^#/.test(val); // if hex we assume we don't need letter overlay
}
