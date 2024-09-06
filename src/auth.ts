import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// eslint-disable-next-line import/no-cycle -- auth is imported in api
import { login } from '@/services/auth';
import { userSchema } from '@/types/user';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { username, password } = await userSchema.parseAsync(credentials);

          const { accessToken } = await login(username, password);

          return {
            name: username,
            accessToken,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return Boolean(auth);
    },
    jwt: async ({ token, user }) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- user can be undefined
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
});
