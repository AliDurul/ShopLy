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