import { useRouter } from "next/router";
import { useState, type ReactElement } from "react";

import CreatePageLayout from "@/containers/createProfile/CreatePageLayout";
import MemberForm from "@/containers/createProfile/MemberForm";
import { mediaUpload } from "@/common/fetch/mediaManager";
import apiNext from "@/common/fetch/apiNext";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import { setUserInfo } from "@/common/redux/userInfoSlice";

import type { NextPageWithLayout } from "../../_app";
import type { MemberFormType } from "@/types";
import { fetchCreateMember } from "@/common/fetch/memberProfile";

const CreateProfilePage: NextPageWithLayout = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.userInfo);

  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(0);

  // 請求新增個人資料
  const handleCreateProfile = async (data: MemberFormType) => {
    setIsLoading(true);
    setStatusCode(0);

    const response = await fetchCreateMember(data, token);

    // 確定新增成功才做上傳雲端圖片
    // 流量有限!要先確定帳號無重複或其他錯誤才執行
    if (response.status === 500) {
      setIsLoading(false);
      alert("發生未知錯誤，請稍候再試");
      return;
    }

    if (!response.ok) {
      setIsLoading(false);
      setStatusCode(response.status);
      return;
    }

    // 請求上傳圖片，有傳入照片才執行
    if (data.headShot) {
      try {
        const uploadResult = await mediaUpload(data.headShot, "member");
        const imgUrl = uploadResult.secure_url;

        const response = await fetchCreateMember(data, token, imgUrl);

        if (!response.ok) {
          setIsLoading(false);
          setStatusCode(response.status);
          alert("新增失敗，請稍候再試");
          return;
        }

        dispatch(setUserInfo(response.data));
        router.push("/member/new/create_pet");
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setStatusCode(500);
        return;
      }
    }

    setIsLoading(false);
    alert("新增成功");
    router.push("/member/new/create_pet");
  };
  return (
    <MemberForm
      isLoading={isLoading}
      statusCode={statusCode}
      onSubmit={handleCreateProfile}
    />
  );
};

CreateProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <CreatePageLayout>{page}</CreatePageLayout>;
};

export default CreateProfilePage;
