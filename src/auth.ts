import { jwtDecode } from 'jwt-decode';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { isTokenExpired } from '@/lib/utils';
// eslint-disable-next-line import/no-cycle -- auth is imported in api
import { login, refreshToken } from '@/services/auth';
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

          const { accessToken, refreshToken } = await login(username, password);

          return {
            name: username,
            accessToken,
            refreshToken,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      if (auth === null) return false;

      const expiresAt = Date.parse(auth.expires);

      return expiresAt > Date.now();
    },
    jwt: async ({ token, user }) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- user can be undefined
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      }

      if (!token.accessToken) {
        return token;
      }

      if (token.accessToken && !isTokenExpired(token.accessToken)) {
        return token;
      }

      if (!token.refreshToken) throw new TypeError('Missing refreshToken');

      try {
        const { accessToken } = await refreshToken();

        token.accessToken = accessToken;
      } catch (error) {
        // eslint-disable-next-line no-console -- error is logged
        console.error('Error refreshing access token', error);
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      if (session.accessToken) {
        const expiresAt = jwtDecode(session.accessToken).exp!;
        const date = new Date(0);

        date.setUTCSeconds(expiresAt);
        session.expires = date as Date & string;
      }

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
