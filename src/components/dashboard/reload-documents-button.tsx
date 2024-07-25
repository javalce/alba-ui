'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export function ReloadDocumentsButton() {
  const router = useRouter();

  function reloadDocuments() {
    router.refresh();
  }

  return <Button onClick={reloadDocuments}>Recargar</Button>;
}
