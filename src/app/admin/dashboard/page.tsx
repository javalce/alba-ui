import { ResetDialog } from '@/components/dashboard/reset-dialog';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <div className='flex flex-col gap-y-6'>
      <section className='flex gap-x-4'>
        <input className='w-full' placeholder='Buscar documentos' type='text' />
        <Button>Añadir</Button>
        <ResetDialog />
      </section>
      <section className='flex flex-col gap-y-2'>
        <article>documento 1</article>
        <article>documento 2</article>
        <article>documento 3</article>
      </section>
    </div>
  );
}
