import type { ReactElement } from "react";

import type { NextPageWithLayout } from "../../_app";
import Layout from "@/components/social/SocialLayout";
import PostExploration from "@/components/social/PostExploration";

const ExplorePage: NextPageWithLayout = () => {
  return <PostExploration />;
};

ExplorePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ExplorePage;
