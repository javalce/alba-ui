import ky, { type KyRequest, type NormalizedOptions } from 'ky';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { requestToSnakeCase } from '@/lib/utils';

describe('requestToSnakeCase', () => {
  const server = setupServer(
    http.post('/test', () => {
      return HttpResponse.json({});
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

  it('should convert request body keys to snake_case', async () => {
    const beforeRequestSpy = vi.fn(async (request: KyRequest, options: NormalizedOptions) => {
      const transformedRequest = (await requestToSnakeCase(request, {
        ...options,
        body: JSON.stringify({ camelCaseKey: 'value' } as unknown),
      })) as Request;
      const jsonData = (await transformedRequest.json()) as unknown;

      expect(jsonData).toEqual({
        camel_case_key: 'value',
      });
    });

    const api = ky.create({
      hooks: { beforeRequest: [beforeRequestSpy] },
    });

    await api.post('/test');

    expect(beforeRequestSpy).toHaveBeenCalled();
  });

  it('should not convert FormData body keys to snake_case', async () => {
    const beforeRequestSpy = vi.fn(async (request: KyRequest, options: NormalizedOptions) => {
      const transformedRequest = await requestToSnakeCase(request, {
        ...options,
        body: new FormData(),
      });

      expect(transformedRequest).toBeUndefined();
    });

    const api = ky.create({
      hooks: { beforeRequest: [beforeRequestSpy] },
    });

    await api.post('/test');

    expect(beforeRequestSpy).toHaveBeenCalled();
  });

  it('should not convert URLSearchParams body keys to snake_case', async () => {
    const beforeRequestSpy = vi.fn(async (request: KyRequest, options: NormalizedOptions) => {
      const transformedRequest = await requestToSnakeCase(request, {
        ...options,
        body: new URLSearchParams(),
      });

      expect(transformedRequest).toBeUndefined();
    });

    const api = ky.create({
      hooks: { beforeRequest: [beforeRequestSpy] },
    });

    await api.post('/test');

    expect(beforeRequestSpy).toHaveBeenCalled();
  });
});
