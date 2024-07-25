'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from '@/components/ui/input';

export function DocumentSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Input
      className='bg-background'
      defaultValue={searchParams.get('q')?.toString()}
      placeholder='Buscar documentos...'
      type='text'
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
