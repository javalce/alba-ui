import { useState } from 'react';

export function useDialog() {
  const [open, setOpen] = useState(false);

  function onOpenChange(nextOpen: boolean) {
    setOpen(() => nextOpen);
  }

  function openDialog() {
    setOpen(() => true);
  }

  function closeDialog() {
    setOpen(() => false);
  }

  return { open, onOpenChange, openDialog, closeDialog };
}
