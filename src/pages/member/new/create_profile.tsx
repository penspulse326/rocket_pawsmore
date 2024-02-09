import { useState, type ReactElement } from "react";

import CreatePageLayout from "@/containers/createProfile/CreatePageLayout";
import MemberForm from "@/containers/createProfile/MemberForm";
import { mediaUpload } from "@/common/helpers/mediaManager";
import apiNext from "@/pages/api/apiNext";

import type { NextPageWithLayout } from "../../_app";
import type { MemberFormType } from "@/types";

const CreateProfilePage: NextPageWithLayout = () => {
  const [statusCode, setStatusCode] = useState(0);

  const handleCreateProfile = async (data: MemberFormType) => {
    const { headShot, ...rest } = data;
    let imgUrl = "";

    // // 請求上傳圖片，有傳入才進行
    // if (headShot) {
    //   try {
    //     const response = await mediaUpload(headShot, "member");
    //     imgUrl = response.secure_url;
    //   } catch (error) {
    //     console.error(error);
    //     setStatusCode(500);
    //     return;
    //   }
    // }

    // 請求新增個人資料
    try {
      const response = await fetch(apiNext.CREATE_MEMBER, {
        method: "POST",
        body: JSON.stringify({ ...rest, headShot: imgUrl }),
      });

      console.log(data);
      if (response.ok) {
        setStatusCode(200);
      } else {
        console.log("請求不OK");
        setStatusCode(response.status);
      }
    } catch (error) {
      console.error(error);
      setStatusCode(500);
    }
  };
  return <MemberForm onSubmit={handleCreateProfile} statusCode={statusCode} />;
};

CreateProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <CreatePageLayout>{page}</CreatePageLayout>;
};

export default CreateProfilePage;
