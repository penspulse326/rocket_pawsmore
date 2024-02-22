import type { ReactElement } from "react";

import CreatePageLayout from "@/containers/createProfile/CreatePageLayout";
import PetForm from "@/containers/createProfile/PetForm";

import type { NextPageWithLayout } from "../../_app";

const CreateProfilePage: NextPageWithLayout = () => {
  return <PetForm />;
};

CreateProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <CreatePageLayout>{page}</CreatePageLayout>;
};

export default CreateProfilePage;
