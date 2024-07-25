import { AddDocumentFormDialog } from '@/components/dashboard/add-document-form-dialog';
import { ResetDialog } from '@/components/dashboard/reset-dialog';
import { Input } from '@/components/ui/input';
import { getDocuments } from '@/services/document';

export default async function Page() {
  const documents = await getDocuments();

  return (
    <div className='space-y-6'>
      <section className='flex gap-x-4 px-2 py-1'>
        <Input placeholder='Buscar documentos' type='text' />
        <AddDocumentFormDialog />
        <ResetDialog />
      </section>
      <section className='space-y-2'>
        {documents.map((document) => (
          <article key={document.id}>{document.name}</article>
        ))}
      </section>
    </div>
  );
}
