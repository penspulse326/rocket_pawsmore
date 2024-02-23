import { useRouter } from "next/router";

import Layout from "@/containers/social/Layout";
import Explore from "@/containers/social/explore";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import type { GetServerSideProps } from "next";
import { fetchGetSpeciesPosts } from "@/common/fetch/post";
import { PostDataType } from "@/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { species } = context.query;

  try {
    const response = await fetchGetSpeciesPosts(Number(species));
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
