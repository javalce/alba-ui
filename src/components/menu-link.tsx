'use client';

import { cn } from '@/lib/utils';
import Link, { LinkProps as NextLinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

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
