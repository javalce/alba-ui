// eslint-disable-next-line import/no-cycle -- auth is imported in api
import { api } from '@/constants/api';
import { type LoginResponse } from '@/types/auth';

export function login(username: string, password: string) {
  const data = new FormData();

  data.append('username', username);
  data.append('password', password);

  return api
    .post('auth/login', {
      body: data,
    })
    .json<LoginResponse>();
}
