export function ChatLoader({ text }: { text?: string }) {
  return (
    <div className='flex items-baseline gap-x-2'>
      <div className='flex' role='status'>
        <span className='animate-dots size-2 rounded-full bg-foreground opacity-0' />
        <span className='animate-dots2 ml-1 size-2 rounded-full bg-foreground opacity-0' />
        <span className='animate-dots3 ml-1 size-2 rounded-full bg-foreground opacity-0' />
      </div>
      <span>{text}</span>
    </div>
  );
}
