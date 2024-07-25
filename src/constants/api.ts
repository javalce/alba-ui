import ky from 'ky';

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export const api = ky.create({
  prefixUrl: API_URL,
});
