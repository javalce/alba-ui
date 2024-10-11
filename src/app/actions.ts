'use server';

import { AuthError } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth, signIn, signOut } from '@/auth';
import { type UserSchema } from '@/types/user';

export async function authenticate(values: UserSchema) {
  try {
    await signIn('credentials', {
      ...values,
      redirect: false,
    });
    redirect('/admin/dashboard');
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Credenciales incorrectas' };
        default:
          return { error: 'Error desconocido' };
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirect: false });
  redirect('/');
}

export async function getSession() {
  return auth();
}

export async function refreshDocuments() {
  revalidateTag('documents');
}
