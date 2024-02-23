import type { ReactElement } from "react";

import CreatePageLayout from "@/containers/createProfile/CreatePageLayout";
import MemberForm from "@/containers/createProfile/MemberForm";

import type { NextPageWithLayout } from "../../_app";

const CreateProfilePage: NextPageWithLayout = () => {
  return <MemberForm />;
};

CreateProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <CreatePageLayout>{page}</CreatePageLayout>;
};

export default CreateProfilePage;
