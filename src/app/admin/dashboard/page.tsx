import { Suspense } from 'react';

import { AddDocumentFormDialog } from '@/components/dashboard/add-document-form-dialog';
import { DocumentList } from '@/components/dashboard/document-list';
import { DocumentSearch } from '@/components/dashboard/document-search';
import { ResetDialog } from '@/components/dashboard/reset-dialog';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    q?: string;
  };
}) {
  const query = searchParams?.q ?? '';

  return (
    <div className='space-y-6'>
      <section className='flex gap-x-4 px-2 py-1'>
        <DocumentSearch />
        <AddDocumentFormDialog />
        <ResetDialog />
      </section>
      <Suspense key={query} fallback={<div>Cargando...</div>}>
        <DocumentList query={query} />
      </Suspense>
    </div>
  );
}
