import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../../_app";
import CreatePageLayout from "@/containers/createProfile/CreatePageLayout";
import PetForm from "@/containers/createProfile/PetForm";

const CreateProfilePage: NextPageWithLayout = () => {
  return <PetForm />;
};

CreateProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <CreatePageLayout>{page}</CreatePageLayout>;
};

export default CreateProfilePage;
