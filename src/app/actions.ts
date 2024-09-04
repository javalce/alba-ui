'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { signIn } from '@/auth';
import { type User } from '@/types/user';

export async function refreshDocuments(url: string) {
  revalidateTag('documents');
  redirect(url);
}

export async function submitLoginForm(formData: User) {
  await signIn('credentials', formData);
}
