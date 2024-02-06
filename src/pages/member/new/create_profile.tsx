import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../../_app";
import CreatePageLayout from "@/containers/createProfile/CreatePageLayout";
import MemberForm, {
  FormInputType,
} from "@/containers/createProfile/MemberForm";

const CreateProfilePage: NextPageWithLayout = () => {
  const handleCreateProfile = (data: FormInputType) => {
    console.log(data);
  };
  return <MemberForm onSubmit={handleCreateProfile} />;
};

CreateProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <CreatePageLayout>{page}</CreatePageLayout>;
};

export default CreateProfilePage;
