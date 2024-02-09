import { useState, type ReactElement } from "react";

import CreatePageLayout from "@/containers/createProfile/CreatePageLayout";
import MemberForm from "@/containers/createProfile/MemberForm";
import { mediaUpload } from "@/common/helpers/mediaManager";
import apiNext from "@/pages/api/apiNext";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import { setUserInfo } from "@/common/redux/userInfoSlice";

import type { NextPageWithLayout } from "../../_app";
import type { MemberFormType } from "@/types";

const CreateProfilePage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.userInfo);

  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(0);

  // 請求新增個人資料
  const sendRequest = async (data: MemberFormType, imgUrl = "") => {
    const { headShot, ...rest } = data;

    try {
      const response = await fetch(apiNext.CREATE_MEMBER, {
        method: "POST",
        body: JSON.stringify({ ...rest, headShot: imgUrl }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setStatusCode(200);
        dispatch(setUserInfo({ ...data, headShot: imgUrl }));
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

  const handleCreateProfile = async (data: MemberFormType) => {
    setIsLoading(true);
    setStatusCode(0);

    const isSuccess = await sendRequest(data);

    // 確定新增成功才做上傳雲端圖片
    // 流量有限!要先確定帳號無重複或其他錯誤才執行
    if (!isSuccess) {
      return;
    }

    // 請求上傳圖片，有傳入照片才執行
    if (data.headShot) {
      try {
        const response = await mediaUpload(data.headShot, "member");
        const imgUrl = response.secure_url;
        const isSuccess = await sendRequest(data, imgUrl);
        isSuccess && alert("新增成功");
      } catch (error) {
        console.error(error);
        setStatusCode(500);
        return;
      }
    }

    setIsLoading(false);
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
