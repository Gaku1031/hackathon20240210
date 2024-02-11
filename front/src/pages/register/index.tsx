import { NextPage } from 'next';
import Head from 'next/head';
import React, { FC } from 'react';

import { Register } from '@/components/pages/register';

const Component: FC = () => (
  <>
    <Head>
      <title>新規登録</title>
    </Head>

    <Register/>
  </>
);

const Page: NextPage = () => {
  return <Component />;
};

export default Page;
