'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { authenticate } from '@/app/actions';
import { SpinnerIcon } from '@/components/icons/spinner-icon';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type UserSchema, userSchema } from '@/types/user';

export function LoginForm() {
  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const [isPending, startTransition] = useTransition();

  function onSubmit(values: UserSchema) {
    startTransition(async () => {
      const res = await authenticate(values);

      if (res?.error) {
        form.setError('root', {
          type: 'manual',
          message: res.error,
        });
      }
    });
  }

  return (
    <div className='container flex flex-1 items-center justify-center'>
      <Form {...form}>
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
          {form.formState.errors.root ? (
            <FormMessage>{form.formState.errors.root.message}</FormMessage>
          ) : null}
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuario</FormLabel>
                <FormControl>
                  <Input placeholder='my-usuario' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full' disabled={isPending}>
            {isPending ? <SpinnerIcon className='mr-2 animate-spin' /> : null}
            Iniciar sesión
          </Button>
        </form>
      </Form>
    </div>
  );
}
