import ky from 'ky';
import { getSession } from 'next-auth/react';

import { auth } from '@/auth';
import { API_URL } from '@/constants/api';

import { requestToSnakeCase, responseToCamelCase } from './utils';

export const api = ky.create({
  prefixUrl: API_URL,
  hooks: {
    beforeRequest: [
      async (request, _) => {
        const isServer = typeof window === 'undefined';

        const session = isServer ? await auth() : await getSession();

        if (session?.accessToken) {
          return new Request(request, {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });
        }
      },
      requestToSnakeCase,
    ],
    afterResponse: [responseToCamelCase],
  },
});
