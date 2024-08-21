import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

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
import { documentFormSchema, type DocumentFormValues, MAX_UPLOAD_SIZE_MB } from '@/types/document';

export function AddDocumentForm({
  formId,
  closeDialog,
}: {
  formId: string;
  closeDialog: () => void;
}) {
  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const fileRef = form.register('file');

  function onSubmit({ file }: DocumentFormValues) {
    addDocuments(file.item(0)!)
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
  );
}
