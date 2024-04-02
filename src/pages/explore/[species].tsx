import type { GetServerSideProps } from 'next';

import { PostDataType } from '@/common/constants/types';
import { fetchGetSpeciesPosts } from '@/common/fetch/post';
import Explore from '@/containers/Social/Explore';
import Layout from '@/containers/Social/Layout';

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

function ExplorePage({ posts }: PropsType) {
  return (
    <Layout>
      <Explore posts={posts} />
    </Layout>
  );
}

export default ExplorePage;
