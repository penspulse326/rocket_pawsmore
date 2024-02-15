import SocialLayout from "@/containers/social/SocialLayout";
import List from "@/containers/post/List";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";

const SocialPage: NextPageWithLayout = () => {
  return <List />;
};

SocialPage.getLayout = function getLayout(page: ReactElement) {
  return <SocialLayout>{page}</SocialLayout>;
};

export default SocialPage;
