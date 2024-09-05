'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { signIn } from '@/auth';
import { type UserSchema } from '@/types/user';

export async function refreshDocuments(url: string) {
  revalidateTag('documents');
  redirect(url);
}

export async function submitLoginForm(formData: UserSchema) {
  await signIn('credentials', { ...formData, redirectTo: '/admin/dashboard' });
}
