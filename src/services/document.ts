import { API_URL } from '@/constants/api';
import { type JsonError, type JsonSuccess } from '@/types/error';

export async function addDocuments(files: FileList) {
  const formData = new FormData();

  for (const file of Array.from(files)) {
    formData.append('files', file);
  }

  const response = await fetch(`${API_URL}/api/documents`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 500) {
      const { details } = (await response.json()) as JsonError;

      throw new Error(details);
    }
  }

  return response.json() as Promise<JsonSuccess>;
}
