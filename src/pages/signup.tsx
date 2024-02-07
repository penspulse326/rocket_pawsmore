import { useState } from "react";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../pages/_app";

import HomeLayout from "@/containers/home/HomeLayout";
import SignUp from "@/containers/home/SignUp";
import Loading from "@/components/Loading";
import { LoginFormType, SignUpFormType } from "@/types";

const SignUpPage: NextPageWithLayout = () => {
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
        console.log("註冊成功");
        const { data } = result;
      } else {
        console.log("註冊失敗");
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
