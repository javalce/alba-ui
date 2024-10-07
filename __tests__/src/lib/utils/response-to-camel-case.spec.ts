import ky, { type KyRequest, type KyResponse, type NormalizedOptions } from 'ky';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { responseToCamelCase } from '@/lib/utils';

describe('responseToCamelCase', () => {
  const server = setupServer(
    http.get('/test', () => {
      return HttpResponse.json({ camel_case_key: 'value' });
    }),
  );

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should convert response body keys to camelCase', async () => {
    const afterReponseSpy = vi.fn(
      async (request: KyRequest, options: NormalizedOptions, response: KyResponse) => {
        const transformedResponse = (await responseToCamelCase(request, options, {
          ...response,
          json: async <T>() => ({ camel_case_key: 'value' }) as unknown as T,
        })) as KyResponse;

        const jsonData = await transformedResponse.json();

        expect(jsonData).toEqual({ camelCaseKey: 'value' });
      },
    );

    const api = ky.create({
      hooks: {
        afterResponse: [afterReponseSpy],
      },
    });

    await api.get('/test').json();

    expect(afterReponseSpy).toHaveBeenCalled();
  });
});
