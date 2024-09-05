'use client';

import { logout } from '@/app/actions';
import { Button } from '@/components/ui/button';

export function LogoutButton() {
  async function handleLogout() {
    await logout();
  }

  return (
    <Button variant='ghost' onClick={handleLogout}>
      Cerrar sesión
    </Button>
  );
}
