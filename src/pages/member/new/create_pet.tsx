import { useState, type ReactElement } from "react";
import type { NextPageWithLayout } from "../../_app";
import CreatePageLayout from "@/containers/createProfile/CreatePageLayout";
import PetForm from "@/containers/createProfile/PetForm";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import { PetFormType } from "@/types";
import { mediaUpload } from "@/common/helpers/mediaManager";
import apiNext from "@/pages/api/apiNext";

const CreateProfilePage: NextPageWithLayout = () => {
  const router = useRouter();

  const { token } = useSelector((state: RootState) => state.userInfo);

  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(0);

  // 請求新增寵物資料
  const sendRequest = async (data: PetFormType, imgUrl = "") => {
    const { petPhoto, ...rest } = data;

    try {
      const response = await fetch(apiNext.CREATE_PET, {
        method: "POST",
        body: JSON.stringify({ ...rest, petPhoto: imgUrl }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

    const isSuccess = await sendRequest(data);

    // 確定新增成功才做上傳雲端圖片
    // 流量有限!要先確定帳號無重複或其他錯誤才執行
    if (!isSuccess) {
      return;
    }

    // 請求上傳圖片，有傳入照片才執行
    // if (data.petPhoto) {
    //   try {
    //     const response = await mediaUpload(data.petPhoto, "pet");
    //     const imgUrl = response.secure_url;
    //     const isSuccess = await sendRequest(data, imgUrl);
    //     isSuccess && alert("新增成功");
    //   } catch (error) {
    //     console.error(error);
    //     setStatusCode(500);
    //     return;
    //   }
    // }

    setIsLoading(false);
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
