import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { login } from '@/services/auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const username = credentials.username as string;
        const password = credentials.password as string;

        return await login(username, password);
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return Boolean(auth);
    },
  },
  pages: {
    signIn: '/login',
  },
});
