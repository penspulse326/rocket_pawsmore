import cookie from "cookie";
import { GetServerSideProps } from "next";

import Layout from "@/containers/social/Layout";
import Posts from "@/containers/social/posts";
import { fetchGetAllPosts, fetchGetFollowingPosts } from "@/common/fetch/post";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import type { PostDataType } from "@/types";
import { filterPost, sortPosts } from "@/common/helpers/configurePosts";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookieStr = context.req.headers.cookie || "";
  const parsedCookies = cookie.parse(cookieStr);
  const userId = Number(parsedCookies.userId);

  try {
    const allPostsResult = await fetchGetAllPosts();
    const allPosts: PostDataType[] = allPostsResult.data;
    const sortedAllPosts = sortPosts(allPosts);

    if (!userId) {
      return { props: { all: sortedAllPosts } };
    }

    const followingPostsResult = await fetchGetFollowingPosts(userId);
    const followingPosts: PostDataType[] = followingPostsResult.data;
    const filteredPosts = filterPost(sortedAllPosts, followingPosts, userId);

    return { props: { all: filteredPosts, following: followingPosts } };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
};

export interface PropsType {
  all: PostDataType[];
  following: PostDataType[];
}
const SocialPage: NextPageWithLayout<PropsType> = ({ all, following }) => {
  return <Posts all={all} following={following} />;
};

SocialPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SocialPage;
