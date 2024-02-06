import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import CreatePageLayout from "@/containers/createProfile/CreatePageLayout";
import SelectTopic from "@/containers/createProfile/SelectTopic";

const CreateProfilePage: NextPageWithLayout = () => {
  return <SelectTopic />;
};

CreateProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <CreatePageLayout>{page}</CreatePageLayout>;
};

export default CreateProfilePage;
