import { NextPage } from 'next';
import Head from 'next/head';
import React, { FC } from 'react';

import { Login } from '@/components/pages/login';

const Component: FC = () => (
  <>
    <Head>
      <title>ログイン</title>
    </Head>

    <Login />
  </>
);

const Page: NextPage = () => {
  return <Component />;
};

export default Page;
