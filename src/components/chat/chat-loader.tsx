export function ChatLoader({ text }: { text?: string }) {
  return (
    <div className='flex items-baseline gap-x-2'>
      <div className='flex' role='status'>
        <span className='size-2 animate-dots rounded-full bg-foreground opacity-0' />
        <span className='ml-1 size-2 animate-dots2 rounded-full bg-foreground opacity-0' />
        <span className='ml-1 size-2 animate-dots3 rounded-full bg-foreground opacity-0' />
      </div>
      <span>{text}</span>
    </div>
  );
}
