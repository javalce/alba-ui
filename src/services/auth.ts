import { type User } from 'next-auth';

import { api } from '@/constants/api';

export function login(username: string, password: string) {
  return api
    .post('/auth/login', {
      json: { username, password },
    })
    .json<User>();
}
