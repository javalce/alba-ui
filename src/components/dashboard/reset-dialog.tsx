'use client';

import { ResetIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

import { refreshDocuments } from '@/app/actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { resetDocuments } from '@/services/document';

export function ResetDialog() {
  function handleReset() {
    resetDocuments()
      .then(({ message }) => {
        toast.success(message);
      })
      .catch(() => {
        toast.error('Error al resetear los documentos');
      })
      .finally(() => {
        refreshDocuments();
      });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>
          <ResetIcon className='mr-2 size-4' /> Resetear
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>
          ¿Estás seguro de que quieres eliminar todos los documentos?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Esta acción no se puede deshacer. Esto eliminará permanentemente todos los documentos
          almacenados.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleReset}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
