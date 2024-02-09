import { useRouter } from "next/router";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { setUserInfo } from "@/common/redux/userInfoSlice";

import HomeLayout from "@/containers/home/HomeLayout";
import SignUp from "@/containers/home/SignUp";
import Loading from "@/components/Loading";
import apiNext from "./api/apiNext";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../pages/_app";
import type { LoginFormType } from "@/types";

const SignUpPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [statusCode, setStatusCode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (data: LoginFormType) => {
    setIsLoading(true);
    setStatusCode(0); // 重置狀態 否則 hook-form 的 error 會被清空

    try {
      const response = await fetch(apiNext.SIGN_UP, {
        method: "POST",
        body: JSON.stringify(data),
      });

      // 登入請求
      if (response.ok) {
        const response = await fetch(apiNext.LOGIN, {
          method: "POST",
          body: JSON.stringify(data),
        });
        const result = await response.json();

        result.data && dispatch(setUserInfo(result.data));
        router.push("/member/new/create_profile");
      } else {
        setStatusCode(response.status);
      }
    } catch (error) {
      console.error("未知的錯誤");
    }

    setIsLoading(false);
  };

  return (
    <>
      <SignUp onSubmit={handleSignUp} statusCode={statusCode} />
      {isLoading && <Loading />}
    </>
  );
};

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default SignUpPage;
