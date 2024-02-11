import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const useHandleLogout = () => {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    await router.push('/login');
  }, [router]);

  return { handleLogout };
}
