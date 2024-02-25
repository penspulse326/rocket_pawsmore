import cookie from "cookie";
import { GetServerSideProps } from "next";

import Layout from "@/containers/social/Layout";
import Posts from "@/containers/social/posts";
import { fetchGetAllPosts, fetchGetFollowingPosts } from "@/common/fetch/post";
import {
  filterPost,
  filterPostsByDate,
  sortPostsByLikes,
} from "@/common/helpers/configurePosts";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import type { PostDataType } from "@/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookieStr = context.req.headers.cookie || "";
  const parsedCookies = cookie.parse(cookieStr);
  const userId = Number(parsedCookies.userId);
  const token = parsedCookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const allPostsResult = await fetchGetAllPosts();
    const allPosts: PostDataType[] = allPostsResult.data;
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
    console.error(error);
    return { props: {} };
  }
};

export interface PropsType {
  all: PostDataType[];
  following: {
    recentPosts: PostDataType[];
    olderPosts: PostDataType[];
  };
}

const SocialPage: NextPageWithLayout<PropsType> = ({ all, following }) => {
  return <Posts all={all} following={following} />;
};

SocialPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SocialPage;
