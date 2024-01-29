import type { ReactElement } from "react";

import type { NextPageWithLayout } from "../../_app";
import Layout from "@/components/social/SocialLayout";
import SocialPostList from "@/components/social/SocialPostList";

const SocialPage: NextPageWithLayout = () => {
  return <SocialPostList />;
};

SocialPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SocialPage;
