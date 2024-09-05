import Link from 'next/link';

import { auth } from '@/auth';
import { MenuLink } from '@/components/menu-link';

export async function Header() {
  const session = await auth();

  return (
    <header className='sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-background/80 px-4'>
      <Link className='scroll-m-20 text-4xl font-bold tracking-tight' href='/'>
        Alba
      </Link>
      <section className='flex items-center justify-center gap-x-3'>
        {session !== null ? (
          <MenuLink href='/admin/dashboard'>Dashboard</MenuLink>
        ) : (
          <MenuLink href='/login'>Login</MenuLink>
        )}
      </section>
    </header>
  );
}
