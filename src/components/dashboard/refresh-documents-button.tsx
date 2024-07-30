'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export function RefreshDocumentsButton() {
  const router = useRouter();

  async function handleRefreshDocuments() {
    router.refresh();
  }

  return (
    <Button onClick={handleRefreshDocuments}>
      <ReloadIcon className='mr-2 size-4' /> Recargar
    </Button>
  );
}
