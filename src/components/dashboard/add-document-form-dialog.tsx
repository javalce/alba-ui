'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import { addDocuments } from '@/services/document';

const MAX_UPLOAD_SIZE_MB = 10;
const BYTES_IN_MB = 1000000;
const MAX_UPLOAD_SIZE = MAX_UPLOAD_SIZE_MB * BYTES_IN_MB;

const formSchema = z.object({
  file: z
    .unknown()
    .transform((files) => files as FileList)
    .superRefine((files, ctx) => {
      if (files.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Debes subir al menos un archivo',
          fatal: true,
        });

        return z.NEVER;
      }

      const { type, size } = files[0];

      if (type !== 'application/pdf') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Solo se permiten archivos PDF',
        });
      }

      if (size > MAX_UPLOAD_SIZE) {
        const sizeInMb = size / BYTES_IN_MB;

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `El tamaño de los archivos no debe superar los ${MAX_UPLOAD_SIZE_MB.toFixed(0)}MB (${sizeInMb.toFixed(1)}MB)`,
        });
      }
    }),
});

type FormValues = z.infer<typeof formSchema>;

export function AddDocumentFormDialog() {
  const [open, setOpen] = useState(false);

  const formId = useId();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const fileRef = form.register('file');

  function onOpenChange(nextOpen: boolean) {
    setOpen(() => nextOpen);
  }

  function onSubmit({ file }: FormValues) {
    const files = Array.from(file);

    addDocuments(files)
      .then(() => {
        toast.info('Se enviará un correo cuando los documentos estén listos');
      })
      .catch(() => {
        toast.error('Error al subir los archivos');
      })
      .finally(() => {
        onOpenChange(false);
      });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
