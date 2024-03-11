import { GetServerSidePropsContext } from 'next';

import cookie from 'cookie';

import { fetchGetAllPosts, fetchGetFollowingPosts } from '@/common/fetch/post';
import { filterPost, filterPostsByDate, sortPostsByLikes } from '@/common/helpers/configurePosts';
import Layout from '@/containers/Social/Layout';
import Posts from '@/containers/Social/Posts';

import type { PostDataType } from '@/types';

interface PropsType {
  all: PostDataType[];
  following: {
    recentPosts: PostDataType[];
    olderPosts: PostDataType[];
  };
}

function SocialPage({ all, following }: PropsType) {
  return (
    <Layout>
      <Posts all={all} following={following} />
    </Layout>
  );
}

// 利用 userId 取得所有貼文
async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookieStr = context.req.headers.cookie || '';
  const parsedCookies = cookie.parse(cookieStr);
  const userId = Number(parsedCookies.userId);
  const { token } = parsedCookies;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const allPostsResult = await fetchGetAllPosts();
    const allPosts: PostDataType[] = allPostsResult.data;

    if (!allPosts) {
      return { props: { all: [] } };
    }

    const sortedAllPosts = sortPostsByLikes(allPosts);

    if (!userId) {
      return { props: { all: sortedAllPosts } };
    }

    const followingPostsResult = await fetchGetFollowingPosts(userId);
    const followingPosts: PostDataType[] = followingPostsResult.data;
    const { recentPosts, olderPosts } = filterPostsByDate(followingPosts);
    const filteredPosts = sortPostsByLikes(filterPost(allPosts, recentPosts));

    return {
      props: { all: filteredPosts, following: { recentPosts, olderPosts } },
    };
  } catch (error) {
    return { props: {} };
  }
}

export { getServerSideProps };
export default SocialPage;
