import { FC } from 'react';
import useRequireAuth from '@/hooks/useRequireAuth';
import { useHandleLogout } from '@/hooks/useHandleLogout';

export const Index: FC = () => {
  const { user } = useRequireAuth();

  const { handleLogout } = useHandleLogout();

  return (
    <>
      <h1>Userinfo</h1>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
      <button onClick={handleLogout}>
        ログアウト
      </button>
    </>
  )
}
