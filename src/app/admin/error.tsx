'use client';

export default function Error() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-y-2'>
      <h2 className='scroll-m-20 pb-2 text-4xl font-semibold tracking-tight'>Algo ha ido mal</h2>
      <p className='scroll-m-20 pb-2 text-lg font-medium text-primary'>
        Por favor, inténtalo de nuevo más tarde.
      </p>
    </div>
  );
}
