import { type ClassValue, clsx } from 'clsx';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { jwtDecode } from 'jwt-decode';
import { type AfterResponseHook, type BeforeRequestHook } from 'ky';
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

export const requestToSnakeCase = ((): BeforeRequestHook => {
  return async (request, options) => {
    if (options.body && !(options.body instanceof FormData)) {
      const body = JSON.parse(options.body as never) as object;
      const convertedBody = decamelizeKeys(body);

      return new Request(request, { body: JSON.stringify(convertedBody) });
    }
  };
})();

export const responseToCamelCase = ((): AfterResponseHook => {
  return async (request, options, response) => {
    const data = await response.json();
    const convertedBody = camelizeKeys(data);

    return new Response(JSON.stringify(convertedBody), response);
  };
})();
