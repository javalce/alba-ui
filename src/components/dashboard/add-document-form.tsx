import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

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

const documentFormSchema = z.object({
  file: z
    .unknown()
    .transform((files) => files as FileList)
    .superRefine((files, ctx) => {
      if (files.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Debes subir un archivo',
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

type DocumentFormValues = z.infer<typeof documentFormSchema>;

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
