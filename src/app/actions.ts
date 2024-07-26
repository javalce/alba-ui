'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function refreshDocuments(url: string) {
  revalidateTag('documents');
  redirect(url);
}
