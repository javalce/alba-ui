import { AddDocumentFormDialog } from '@/components/dashboard/add-document-form-dialog';
import { ResetDialog } from '@/components/dashboard/reset-dialog';
import { Input } from '@/components/ui/input';

export default function Page() {
  return (
    <div className='space-y-6'>
      <section className='flex gap-x-4 px-2 py-1'>
        <Input placeholder='Buscar documentos' type='text' />
        <AddDocumentFormDialog />
        <ResetDialog />
      </section>
      <section className='space-y-2'>
        <article>documento 1</article>
        <article>documento 2</article>
        <article>documento 3</article>
      </section>
    </div>
  );
}
