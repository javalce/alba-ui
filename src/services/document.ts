import ky from 'ky';

import { api, API_URL } from '@/constants/api';
import { type Document } from '@/types/document';
import { type JsonSuccess } from '@/types/error';

export async function addDocuments(files: File[]) {
  const formData = new FormData();

  for (const file of Array.from(files)) {
    formData.append('files', file);
  }

  return ky
    .post('documents', {
      prefixUrl: API_URL,
      body: formData,
    })
    .json<JsonSuccess>();
}

export async function resetDocuments() {
  return api.post('documents/reset').json<JsonSuccess>();
}

export async function getDocuments() {
  return api.get('documents').json<Document[]>();
}
