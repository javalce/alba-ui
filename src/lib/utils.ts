import { type ClassValue, clsx } from 'clsx';
import { jwtDecode } from 'jwt-decode';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isTokenExpired(token: string): boolean {
  if (token === '') return true;

  const decoded = jwtDecode(token);

  if (decoded.exp === undefined) return true;

  return decoded.exp * 1000 < Date.now();
}
