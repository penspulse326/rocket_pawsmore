// 引入依赖
import Layout from "@/containers/social/Layout";
import Posts from "@/containers/social/posts";
import { fetchGetAllPosts } from "@/common/fetch/post";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import type { PostDataType } from "@/types";

const SocialPage: NextPageWithLayout<{ data: PostDataType[] }> = ({ data }) => {
  return <Posts initialPosts={data} />;
};

export async function getServerSideProps() {
  try {
    const response = await fetchGetAllPosts();
    const list: PostDataType[] = response.data;
    return { props: { list } };
  } catch (error) {
    console.error(error);
    return { props: { list: [] } };
  }
}

SocialPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SocialPage;
