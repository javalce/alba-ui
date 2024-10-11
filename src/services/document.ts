import { type UUID } from 'node:crypto';

import { api } from '@/lib/api-client';

export async function addDocuments(file: File) {
  const formData = new FormData();

  formData.append('file', file);

  return api.post('documents', { body: formData }).json<{ message: string }>();
}

export async function resetDocuments() {
  return api.post('documents/reset').json<{ message: string }>();
}

export async function getDocuments(name?: string) {
  return api
    .get('documents', {
      searchParams: name ? { name } : undefined,
      cache: 'no-store',
      next: {
        tags: ['documents'],
      },
    })
    .json<{ id: UUID; name: string; total: string }[]>();
}
