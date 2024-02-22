import cookie from "cookie";
import Layout from "@/containers/social/Layout";
import Posts from "@/containers/social/posts";
import { GetServerSideProps } from "next";
import { fetchGetAllPosts } from "@/common/fetch/post";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import type { PostDataType } from "@/types";

const SocialPage: NextPageWithLayout<{ data: PostDataType[] }> = ({ data }) => {
  return <Posts initialList={data} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = context.req.headers.cookie;

  try {
    const response = await fetchGetAllPosts();
    const data: PostDataType[] = response.data;
    return { props: { data } };
  } catch (error) {
    console.error(error);
    return { props: { data: [] } };
  }
};

SocialPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SocialPage;
