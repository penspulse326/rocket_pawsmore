import { useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import { useRouter } from "next/router";
import { useState, type ReactElement } from "react";

import CreatePageLayout from "@/containers/createProfile/CreatePageLayout";
import PetForm from "@/containers/createProfile/PetForm";
import { mediaUpload } from "@/common/helpers/mediaManager";

import apiNext from "@/pages/api/apiNext";

import type { NextPageWithLayout } from "../../_app";
import type { PetFormType } from "@/types";

const CreateProfilePage: NextPageWithLayout = () => {
  const router = useRouter();

  const { token } = useSelector((state: RootState) => state.userInfo);

  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(0);

  // 請求新增寵物資料
  const sendCreatePetRequest = async (data: PetFormType) => {
    const { petPhoto, ...rest } = data;

    try {
      const response = await fetch(apiNext.CREATE_PET, {
        method: "POST",
        body: JSON.stringify({ ...rest }),
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();

      if (response.ok) {
        setStatusCode(200);
        return result.data.petId;
      } else {
        setStatusCode(response.status);
        return null;
      }
    } catch (error) {
      setStatusCode(500);
      return null;
    }
  };

  const sendUpdatePetRequest = async (
    data: PetFormType,
    imgUrl = "",
    petId: number
  ) => {
    const { petPhoto, ...rest } = data;

    try {
      const response = await fetch(`${apiNext.UPDATE_PET}/${petId}`, {
        method: "PATCH",
        body: JSON.stringify({ ...rest, petPhoto: imgUrl }),
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setStatusCode(200);
        return true;
      } else {
        setStatusCode(response.status);
        return false;
      }
    } catch (error) {
      setStatusCode(500);
      return false;
    }
  };

  const handleCreatePet = async (data: PetFormType) => {
    setIsLoading(true);
    setStatusCode(0);

    const petId = await sendCreatePetRequest(data);

    // 確定新增成功才做上傳雲端圖片
    // 流量有限!要先確定帳號無重複或其他錯誤才執行
    if (!petId) {
      setIsLoading(false);
      return;
    }

    // 請求上傳圖片，有傳入照片才執行
    if (data.petPhoto) {
      try {
        const response = await mediaUpload(data.petPhoto, "pet");
        const imgUrl = response.secure_url;
        await sendUpdatePetRequest(data, imgUrl, petId);
      } catch (error) {
        console.error(error);
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
