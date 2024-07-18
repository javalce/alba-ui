'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5MB

const formSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'Debes subir al menos un archivo')
    .refine(
      (files) => Array.from(files).every((file) => file.type === 'application/pdf'),
      'Solo se permiten archivos PDF',
    )
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_UPLOAD_SIZE),
      'El tamaño del archivo no debe superar los 5MB',
    )
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function AddDocumentForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register('file');

  function onSubmit(data: FormValues) {
    // TODO: Implementar la lógica para subir el archivo
  }

  return (
    <Form {...form}>
      <form className='w-2/3 space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='file'
          render={() => (
            <FormItem>
              <FormLabel>Documentos</FormLabel>
              <FormControl>
                <Input accept='.pdf' type='file' {...fileRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='space-x-2'>
          <Button asChild variant='ghost'>
            <Link href='/admin/dashboard'>Cancelar</Link>
          </Button>
          <Button type='submit'>Subir</Button>
        </div>
      </form>
    </Form>
  );
}
