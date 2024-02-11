import axios from 'axios';
import { useCallback } from 'react';
import { UseFormGetValues } from 'react-hook-form';
import { LoginFormType } from '@/services/schema/types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

type Props = {
  getValues: UseFormGetValues<LoginFormType>;
  setIsLoading: (isLoading: boolean) => void;
};

export const useHandleLogin = ({ 
  getValues,
  setIsLoading,
}: Props) => {
  const router = useRouter();

  const handleLogin = useCallback(async () => {
    const http = axios.create({
      baseURL: 'http://localhost',
      withCredentials: true,
    });

    const formData = getValues();

    try {
      setIsLoading(true);
      await http.get('/sanctum/csrf-cookie');
      const res = await http.post('/api/login', { 
        email: formData.email, 
        password: formData.password,
      });

      const token = res.data.token;
      localStorage.setItem('token', token);

      await router.push('/');
    } catch (error) {
      toast.error('予期せぬエラーが発生しました');
      setIsLoading(false);
    }
  }, [router, setIsLoading, getValues]);

  return { handleLogin };
}
