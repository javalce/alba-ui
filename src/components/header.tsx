import { MenuLink } from '@/components/menu-link';
import Link from 'next/link';

export function Header() {
  return (
    <header className='sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-background/80 px-4'>
      <Link href='/' className='scroll-m-20 text-4xl font-bold tracking-tight'>
        Alba
      </Link>
      <section className='flex items-center justify-center gap-x-3'>
        <MenuLink href='/admin/dashboard'>Dashboard</MenuLink>
      </section>
    </header>
  );
}
