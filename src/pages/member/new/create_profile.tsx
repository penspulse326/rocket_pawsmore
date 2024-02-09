import type { ReactElement } from "react";

import CreatePageLayout from "@/containers/createProfile/CreatePageLayout";
import MemberForm from "@/containers/createProfile/MemberForm";

import type { NextPageWithLayout } from "../../_app";
import type { MemberFormType } from "@/types";

const CreateProfilePage: NextPageWithLayout = () => {
  const handleCreateProfile = (data: MemberFormType) => {
    console.log(data);
  };
  return <MemberForm onSubmit={handleCreateProfile} />;
};

CreateProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <CreatePageLayout>{page}</CreatePageLayout>;
};

export default CreateProfilePage;
