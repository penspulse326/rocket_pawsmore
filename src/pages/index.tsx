import Layout from "@/containers/social/Layout";
import Posts from "@/containers/social/posts";
import { fetchGetAllPosts } from "@/common/fetch/post";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import type { PostDataType } from "@/types";

const SocialPage: NextPageWithLayout<{ data: PostDataType[] }> = ({ data }) => {
  return <Posts initialList={data} />;
};

export async function getServerSideProps() {
  try {
    const response = await fetchGetAllPosts();
    const data: PostDataType[] = response.data;
    return { props: { data } };
  } catch (error) {
    console.error(error);
    return { props: { data: [] } };
  }
}

SocialPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SocialPage;
