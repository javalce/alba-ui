import { Skeleton } from '@/components/ui/skeleton';

export function DocumentListPlaceholder() {
  return (
    <div className='space-y-4'>
      {Array.from({ length: 10 }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key -- Placeholder
        <Skeleton key={i} className='h-8' />
      ))}
    </div>
  );
}
