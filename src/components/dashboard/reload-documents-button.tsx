'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import { usePathname, useSearchParams } from 'next/navigation';

import { refreshDocuments } from '@/app/actions';
import { Button } from '@/components/ui/button';

export function ReloadDocumentsButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  async function handleRefreshDocuments() {
    const params = new URLSearchParams(searchParams);
    const url = `${pathname}?${params.toString()}`;

    refreshDocuments(url);
  }

  return (
    <Button onClick={handleRefreshDocuments}>
      <ReloadIcon className='mr-2 size-4' /> Recargar
    </Button>
  );
}
