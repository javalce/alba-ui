import { z } from 'zod';

export const MAX_UPLOAD_SIZE_MB = 10;
const BYTES_IN_MB = 1000000;
const MAX_UPLOAD_SIZE = MAX_UPLOAD_SIZE_MB * BYTES_IN_MB;

export const documentFormSchema = z.object({
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

export type DocumentFormValues = z.infer<typeof documentFormSchema>;
