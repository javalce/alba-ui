import ky from 'ky';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { API_URL } from '@/constants/api';
import { isTokenExpired, requestToSnakeCase, responseToCamelCase } from '@/lib/utils';
import { userSchema } from '@/types/user';

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { username, password } = await userSchema.parseAsync(credentials);

          const data = new FormData();

          data.append('username', username);
          data.append('password', password);

          const { accessToken, refreshToken } = await ky
            .post('auth/login', {
              prefixUrl: API_URL,
              body: data,
              hooks: {
                beforeRequest: [requestToSnakeCase],
                afterResponse: [responseToCamelCase],
              },
            })
            .json<{ accessToken: string; refreshToken: string; tokenType: string }>();

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

      const { accessToken } = auth;

      if (!accessToken) return false;

      return !isTokenExpired(accessToken);
    },
    jwt: async ({ token, user, account }) => {
      if (account?.provider === 'credentials') {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      } else if (token.accessToken && !isTokenExpired(token.accessToken)) {
        return token;
      }

      if (!token.refreshToken) throw new TypeError('Missing refreshToken');

      const { accessToken } = await ky
        .get('auth/refresh', {
          prefixUrl: API_URL,
          headers: {
            Authorization: `Bearer ${token.refreshToken}`,
          },
          hooks: {
            afterResponse: [responseToCamelCase],
          },
        })
        .json<{ accessToken: string; tokenType: string }>();

      token.accessToken = accessToken;

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
