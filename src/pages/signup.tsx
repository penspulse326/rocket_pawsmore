import { useState } from "react";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../pages/_app";

import { useDispatch } from "react-redux";
import { setUserInfo } from "@/common/redux/userInfoSlice";

import HomeLayout from "@/containers/home/HomeLayout";
import SignUp from "@/containers/home/SignUp";
import Loading from "@/components/Loading";
import { LoginFormType, SignUpFormType } from "@/types";
import { useRouter } from "next/router";

const SignUpPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [statusCode, setStatusCode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (data: LoginFormType) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("前端", result);

      if (response.ok) {
        // 登入請求
        const response = await fetch("/api/auth/login", {
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
