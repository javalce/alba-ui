import { AddDocumentForm } from '@/components/dashboard/add-document-form';

export default function Page() {
  return (
    <div className='flex flex-col gap-y-6'>
      <h3 className='text-2xl'>Añadir documento</h3>
      <AddDocumentForm />
    </div>
  );
}
