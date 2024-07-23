import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm } from 'react-hook-form';

import { documentFormSchema, type DocumentFormValues } from '@/types/document';

export function useDocumentForm() {
  const formId = useId();

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const fileRef = form.register('file');

  return { formId, form, fileRef };
}
