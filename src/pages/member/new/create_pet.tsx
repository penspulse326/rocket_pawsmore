import { useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import { useRouter } from "next/router";
import { useState, type ReactElement } from "react";

import CreatePageLayout from "@/containers/createProfile/CreatePageLayout";
import PetForm from "@/containers/createProfile/PetForm";
import { mediaUpload } from "@/common/helpers/mediaManager";

import type { NextPageWithLayout } from "../../_app";
import type { PetFormType } from "@/types";
import { fetchCreatePet, fetchUpdatePet } from "@/common/fetch/petProfile";

const CreateProfilePage: NextPageWithLayout = () => {
  const router = useRouter();

  const { token } = useSelector((state: RootState) => state.userInfo);

  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(0);

  const handleCreatePet = async (data: PetFormType) => {
    setIsLoading(true);
    setStatusCode(0);

    // 請求新增寵物資料
    const response = await fetchCreatePet(data, token);

    if (response.status === 500) {
      setIsLoading(false);
      alert("發生未知錯誤，請稍候再試");
      return;
    }

    if (!response.ok) {
      setStatusCode(response.status);
      setIsLoading(false);
      return;
    }

    // // 確定新增成功才做上傳雲端圖片
    // // 流量有限!要先確定帳號無重複或其他錯誤才執行
    if (data.petPhoto) {
      const petId = response.data.petId;

      try {
        const uploadResult = await mediaUpload(data.petPhoto, "pet");
        const imgUrl = uploadResult.secure_url;

        const response = await fetchUpdatePet(data, token, imgUrl, petId);

        if (!response.ok) {
          setIsLoading(false);
          setStatusCode(response.status);
          alert("新增失敗，請稍候再試");
          return;
        }
      } catch (error) {
        setIsLoading(false);
        setStatusCode(500);
        alert("新增失敗，請稍候再試");
        return;
      }
    }

    setIsLoading(false);
    alert("新增成功");
    router.push("/member/new/select_topic");
  };

  return (
    <PetForm
      isLoading={isLoading}
      statusCode={statusCode}
      onSubmit={handleCreatePet}
    />
  );
};

CreateProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <CreatePageLayout>{page}</CreatePageLayout>;
};

export default CreateProfilePage;
