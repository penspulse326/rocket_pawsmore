import type { GetServerSideProps } from 'next';

import { fetchGetSpeciesPosts } from '@/common/fetch/post';
import Explore from '@/containers/Social/Explore';
import Layout from '@/containers/Social/Layout';
import { PostDataType } from '@/common/types';

import type { NextPageWithLayout } from '../_app';
import type { ReactElement } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { species } = context.query;

  try {
    const response = await fetchGetSpeciesPosts(Number(species));
    if (!response.ok) {
      return { props: { posts: [] } };
    }
    const posts = response.data;
    return { props: { posts } };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
};

export interface PropsType {
  posts: PostDataType[];
}

const ExplorePage: NextPageWithLayout<PropsType> = ({ posts }) => {
  return <Explore posts={posts} />;
};

ExplorePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ExplorePage;
