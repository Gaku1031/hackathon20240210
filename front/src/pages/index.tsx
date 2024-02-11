import { NextPage } from 'next';
import Head from 'next/head';
import React, { FC, Suspense } from 'react';

import { Index } from '@/components/pages';
import { PageSpinner } from '@/components/atoms/PageSpinner';

const Component: FC = () => (
  <>
    <Head>
      <title>トップページ</title>
    </Head>

    <Suspense fallback={<PageSpinner />}>
      <Index />
    </Suspense>
  </>
);

const Page: NextPage = () => {
  return <Component />;
};

export default Page;
