import { camelizeKeys } from 'humps';
import ky from 'ky';

// eslint-disable-next-line import/no-cycle -- auth is imported in api
import { auth } from '@/auth';

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export const api = ky.create({
  prefixUrl: API_URL,
  hooks: {
    beforeRequest: [
      async (request, _) => {
        const session = await auth();

        if (session?.accessToken) {
          return new Request(request, {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });
        }
      },
      async (request, options) => {
        if (options.body && !(options.body instanceof FormData)) {
          const body = JSON.parse(options.body as never) as object;
          const convertedBody = camelizeKeys(body);

          return new Request(request, { body: JSON.stringify(convertedBody) });
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        const data = await response.json();
        const convertedBody = camelizeKeys(data);

        return new Response(JSON.stringify(convertedBody), response);
      },
    ],
  },
});
