'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { submitLoginForm } from '@/app/actions';
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
import { type User, userSchema } from '@/types/user';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  function onSubmit(values: User) {
    setIsLoading(true);

    submitLoginForm(values).then(() => {
      setIsLoading(false);
    });
  }

  return (
    <div className='container flex flex-1 items-center justify-center'>
      <Form {...form}>
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
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
          <Button className='w-full' disabled={isLoading}>
            {isLoading ? <SpinnerIcon className='mr-2 animate-spin' /> : null}
            Iniciar sesión
          </Button>
        </form>
      </Form>
    </div>
  );
}
