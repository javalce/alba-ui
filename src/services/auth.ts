import { api } from '@/constants/api';
import { type LoginResponse } from '@/types/auth';

export async function login(username: string, password: string) {
  const data = new FormData();

  data.append('username', username);
  data.append('password', password);

  return api
    .post('auth/login', {
      body: data,
    })
    .json<LoginResponse>();
}

export async function refreshToken() {
  return api.get('auth/refresh').json<{ accessToken: string; tokenType: string }>();
}
