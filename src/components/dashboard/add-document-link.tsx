import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function AddDocumentLink() {
  return (
    <Button asChild>
      <Link href='/admin/dashboard/add-document'>Añadir</Link>
    </Button>
  );
}
