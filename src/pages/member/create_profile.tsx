import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import CreatePageLayout from "@/containers/createProfile/CreatePageLayout";

const CreateProfilePage: NextPageWithLayout = () => {
  return 123;
};

CreateProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <CreatePageLayout>{page}</CreatePageLayout>;
};

export default CreateProfilePage;
