import Textarea from 'react-textarea-autosize';

import { SendIcon } from '@/components/icons/send-icon';
import { Button } from '@/components/ui/button';
import { useEnterSubmit } from '@/hooks/use-enter-submit';
import { type ChatInputProps } from '@/types/chat';

export function ChatInput({ input, handleInputChange, handleSubmit }: ChatInputProps) {
  const { formRef, onKeyDown } = useEnterSubmit();

  return (
    <form
      ref={formRef}
      className='max-w-[calc(100dvw-32px) relative flex flex-row items-end gap-2 px-4 md:min-w-[600px] md:px-0'
      onSubmit={handleSubmit}
    >
      <div className='relative flex max-h-60 w-full grow flex-col justify-center overflow-hidden bg-background pr-10 sm:rounded-md sm:border sm:pr-12'>
        <Textarea
          autoComplete='off'
          autoCorrect='off'
          className='min-h-[60px] w-full resize-none overflow-hidden bg-background px-4 py-[1.3rem] focus-within:outline-none sm:text-sm'
          placeholder='Escribe tu mensaje...'
          rows={1}
          spellCheck={false}
          tabIndex={0}
          value={input}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
        />
        <div className='absolute bottom-4 top-[13px] sm:right-3'>
          <Button disabled={input === ''} size='icon' type='submit'>
            <SendIcon className='size-5' />
            <span className='sr-only'>Enviar mensaje</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
