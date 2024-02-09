import type { ReactElement } from "react";

import CreatePageLayout from "@/containers/createProfile/CreatePageLayout";
import MemberForm from "@/containers/createProfile/MemberForm";
import { mediaUpload } from "@/common/helpers/mediaManager";

import type { NextPageWithLayout } from "../../_app";
import type { MemberFormType } from "@/types";

const CreateProfilePage: NextPageWithLayout = () => {
  const handleCreateProfile = async (data: MemberFormType) => {
    const { headShot, ...rest } = data;

    // 先上傳圖片
    if (headShot) {
      try {
        const response = await mediaUpload(headShot, "member");
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return <MemberForm onSubmit={handleCreateProfile} />;
};

CreateProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <CreatePageLayout>{page}</CreatePageLayout>;
};

export default CreateProfilePage;
