import Layout from "@/containers/social/Layout";
import List from "@/containers/social/posts/List";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const SocialPage: NextPageWithLayout = () => {
  return <List />;
};

SocialPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SocialPage;
