'use client';

import Link, { type LinkProps as NextLinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { cn } from '@/lib/utils';

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> &
  NextLinkProps;

export function MenuLink({ className, children, ...props }: LinkProps) {
  const pathname = usePathname();

  const isActive = useMemo(() => {
    return pathname === props.href;
  }, [pathname, props.href]);

  return (
    <Link
      className={cn('text-primary/50', className, {
        'text-primary': isActive,
        'transition-colors hover:text-primary': !isActive,
      })}
      {...props}
    >
      {children}
    </Link>
  );
}
