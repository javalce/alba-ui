'use client';

import { toast } from 'sonner';

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
import { useDialog } from '@/hooks/use-dialog';
import { useDocumentForm } from '@/hooks/use-document-form';
import { addDocuments } from '@/services/document';
import { type DocumentFormValues, MAX_UPLOAD_SIZE_MB } from '@/types/document';

export function AddDocumentFormDialog() {
  const { open, onOpenChange, closeDialog } = useDialog();

  const { formId, form, fileRef } = useDocumentForm();

  function onSubmit({ file }: DocumentFormValues) {
    const files = Array.from(file);

    addDocuments(files)
      .then(() => {
        toast.info('Se enviará un correo cuando los documentos estén listos');
      })
      .catch(() => {
        toast.error('Error al subir los archivos');
      })
      .finally(() => {
        closeDialog();
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
