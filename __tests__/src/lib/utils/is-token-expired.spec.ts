import { describe, expect, it } from 'vitest';

import { isTokenExpired } from '@/lib/utils';

describe('isTokenExpired', () => {
  it('should return true for an empty token', () => {
    expect(isTokenExpired('')).toBe(true);
  });

  it('should return true for an expired token', () => {
    const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDAwMDAwMDB9.abc';

    expect(isTokenExpired(expiredToken)).toBe(true);
  });

  it('should return false for a valid token', () => {
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjQ3Mjg1MzIwMDB9.abc';

    expect(isTokenExpired(validToken)).toBe(false);
  });
});
