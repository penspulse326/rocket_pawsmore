import { useRouter } from "next/router";
import { useState, ReactElement } from "react";

import type { NextPageWithLayout } from "../pages/_app";
import { LoginFormType } from "@/types";

import HomeLayout from "@/containers/home/HomeLayout";
import Login from "@/containers/home/Login";
import Loading from "@/components/Loading";

import { useDispatch } from "react-redux";
import { setUserInfo } from "@/common/redux/userInfoSlice";

const LoginPage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(0);

  const handleLogin = async (data: LoginFormType) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        dispatch(setUserInfo(result.data));
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
      <Login onSubmit={handleLogin} statusCode={statusCode} />
      {isLoading && <Loading />}
    </>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default LoginPage;
