import { type Message } from 'ai';
import remarkGfm from 'remark-gfm';

import { BotIcon } from '@/components/icons/bot-icon';
import { UserIcon } from '@/components/icons/user-icon';
import { MemoizedReactMarkdown } from '@/components/markdown';
import { cn } from '@/lib/utils';

export function ChatMessage({ message }: { message: Message }) {
  return (
    <div className={cn('group relative mb-4 flex items-start md:-ml-12')}>
      <div
        className={cn(
          'flex size-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
          message.role === 'user' ? 'bg-background' : 'bg-primary text-primary-foreground',
        )}
      >
        {message.role === 'user' ? <UserIcon /> : <BotIcon />}
      </div>
      <div className='ml-4 flex-1 space-y-2 overflow-hidden px-1'>
        <MemoizedReactMarkdown
          className='prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0'
          components={{
            /* eslint-disable react/no-unstable-nested-components -- required for remark plugins */
            p({ children }) {
              return <p className='mb-2 last:mb-0'>{children}</p>;
            },
            /* eslint-enable react/no-unstable-nested-components -- finish disabling */
          }}
          remarkPlugins={[remarkGfm]}
        >
          {message.content}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
}
