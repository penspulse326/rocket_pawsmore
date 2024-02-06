import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import CreatePageLayout from "@/containers/createProfile/CreatePageLayout";
import MemberForm from "@/containers/createProfile/MemberForm";

const CreateProfilePage: NextPageWithLayout = () => {
  return <MemberForm />;
};

CreateProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <CreatePageLayout>{page}</CreatePageLayout>;
};

export default CreateProfilePage;
