import ky from 'ky';

import { getSession } from '@/app/actions';
import { API_URL } from '@/constants';

import { requestToSnakeCase, responseToCamelCase } from './utils';

export const api = ky.create({
  prefixUrl: API_URL,
  hooks: {
    beforeRequest: [
      async (request, _) => {
        const session = await getSession();

        if (session?.accessToken) {
          request.headers.set('Authorization', `Bearer ${session.accessToken}`);
        }
      },
      requestToSnakeCase,
    ],
    afterResponse: [responseToCamelCase],
  },
});
