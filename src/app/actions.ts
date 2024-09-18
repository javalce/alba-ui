'use server';

import { AuthError } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { signIn, signOut } from '@/auth';
import { type UserSchema } from '@/types/user';

export async function refreshDocuments(url: string) {
  revalidateTag('documents');
  redirect(url);
}

export async function submitLoginForm(formData: UserSchema) {
  try {
    await signIn('credentials', { ...formData, redirectTo: '/admin/dashboard' });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return {
          message: 'Usuario o contraseña incorrectos',
        };
      }

      return {
        message: 'Error desconocido',
      };
    }
  }
}

export async function logout() {
  return signOut({ redirectTo: '/' });
}
