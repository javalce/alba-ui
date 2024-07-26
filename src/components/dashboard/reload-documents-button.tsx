'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export function ReloadDocumentsButton() {
  const router = useRouter();

  function reloadDocuments() {
    router.refresh();
  }

  return (
    <Button onClick={reloadDocuments}>
      <ReloadIcon className='mr-2 size-4' /> Recargar
    </Button>
  );
}
