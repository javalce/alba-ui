import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(1, 'Debes ingresar un nombre de usuario'),
  password: z.string().min(1, 'Debes ingresar una contraseña'),
});

export type User = z.infer<typeof userSchema>;
