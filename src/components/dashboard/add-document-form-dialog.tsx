'use client';

import { UploadIcon } from '@radix-ui/react-icons';
import { useId } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDialog } from '@/hooks/use-dialog';

import { AddDocumentForm } from './add-document-form';

export function AddDocumentFormDialog() {
  const { open, onOpenChange, closeDialog } = useDialog();

  const formId = useId();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <UploadIcon className='mr-2 size-4' /> Añadir
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Añadir documento</DialogTitle>
        </DialogHeader>
        <AddDocumentForm closeDialog={closeDialog} formId={formId} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancelar</Button>
          </DialogClose>
          <Button form={formId} type='submit'>
            Subir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
