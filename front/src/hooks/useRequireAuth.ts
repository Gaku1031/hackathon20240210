import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

const useRequireAuth = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return { user, isAuthenticated };
};

export default useRequireAuth;
