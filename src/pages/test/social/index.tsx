import PageLayout from "@/containers/social/PageLayout";
import SocialPostList from "@/components/social/SocialPostList";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../../_app";

const SocialPage: NextPageWithLayout = () => {
  return <SocialPostList />;
};

SocialPage.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default SocialPage;
