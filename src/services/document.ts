import { api } from '@/constants/api';
import { type Document } from '@/types/document';
import { type JsonSuccess } from '@/types/error';

export async function addDocuments(file: File) {
  const formData = new FormData();

  formData.append('file', file);

  return api.post('documents', { body: formData }).json<JsonSuccess>();
}

export async function resetDocuments() {
  return api.post('documents/reset').json<JsonSuccess>();
}

export async function getDocuments(name?: string) {
  return api
    .get('documents', {
      searchParams: name ? { name } : undefined,
      cache: 'no-store',
    })
    .json<Document[]>();
}
