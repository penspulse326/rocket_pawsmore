import type { ReactElement } from "react";

import type { NextPageWithLayout } from "../../_app";
import PageLayout from "@/containers/social/PageLayout";
import PostExploration from "@/containers/social/PostExploration";

const ExplorePage: NextPageWithLayout = () => {
  return <PostExploration />;
};

ExplorePage.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default ExplorePage;
