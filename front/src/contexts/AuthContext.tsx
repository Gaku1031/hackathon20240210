import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/services/schema/types';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { toast } from 'react-toastify';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  setIsAuthenticated: (authState: boolean) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticatedState] = useState(false);
  const [loading, setLoading] = useState(true);

  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/user`, fetcher, {
    revalidateOnFocus: false
  });

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          setUser({
            id: data.id,
            name: data.name,
            email: data.email,
            generation: data.generation,
            is_present: data.is_present,
          });
          setIsAuthenticatedState(true);
        } catch (error) {
          toast.error('認証に失敗しました。');
          setUser(null);
          setIsAuthenticatedState(false);
        }
      } else {
        // トークンがない場合
        setUser(null);
        setIsAuthenticatedState(false);
        setLoading(false);
      }
    };

    loadUser();
  }, [data]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, setIsAuthenticated: setIsAuthenticatedState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

