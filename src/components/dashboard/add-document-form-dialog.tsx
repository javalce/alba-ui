'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const MAX_UPLOAD_SIZE_MB = 5;
const BYTES_IN_MB = 1000000;
const MAX_UPLOAD_SIZE = MAX_UPLOAD_SIZE_MB * BYTES_IN_MB;

const formSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'Debes subir al menos un archivo')
    .refine((files) => files[0].type === 'application/pdf', 'Solo se permiten archivos PDF')
    .refine(
      (files) => files[0].size <= MAX_UPLOAD_SIZE,
      (files) => {
        const size = files[0].size / BYTES_IN_MB;

        return {
          message: `El tamaño de los archivos no debe superar los ${MAX_UPLOAD_SIZE_MB.toFixed(0)}MB (${size.toFixed(1)}MB)`,
        };
      },
    )
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function AddDocumentFormDialog() {
  const formId = useId();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register('file');

  function onSubmit(data: FormValues) {
    // TODO: Implementar la lógica para subir el archivo
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Añadir</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Añadir documento</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className='space-y-8' id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='file'
              render={() => (
                <FormItem>
                  <FormLabel>Documentos</FormLabel>
                  <FormControl>
                    <Input accept='.pdf' type='file' {...fileRef} />
                  </FormControl>
                  <FormDescription>
                    Sube uno o varios archivos PDF. Máximo {MAX_UPLOAD_SIZE_MB}MB por archivo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancelar</Button>
          </DialogClose>
          <Button form={formId} type='submit'>
            Subir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
