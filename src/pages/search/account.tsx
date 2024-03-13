import type { GetServerSideProps } from 'next';

import Layout from '@/containers/Social/Layout';
import SearchResult from '@/containers/Social/Search';
import { PostDataType } from '@/types';

import type { NextPageWithLayout } from '../_app';
import type { ReactElement } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { keyword } = context.query;

  try {
    const response = await fetch(
      `${process.env.API_URL}/social/search?keyword=${keyword}&types=PetAccount,Account`
    );

    if (!response.ok) {
      return { props: { data: [] } };
    }

    const result = await response.json();

    return { props: { data: result.data.PetResults } };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
};

export interface PropsType {
  data: any;
}

const ExplorePage: NextPageWithLayout<PropsType> = ({ data }) => {
  return <SearchResult data={data} />;
};

ExplorePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ExplorePage;
