import { useRouter } from "next/router";
import { useState, ReactElement } from "react";

import HomeLayout from "@/containers/home/HomeLayout";
import Login from "@/containers/home/Login";
import Loading from "@/components/Loading";
import apiNext from "./api/apiNext";

import { useDispatch } from "react-redux";
import { setUserInfo } from "@/common/redux/userInfoSlice";

import type { NextPageWithLayout } from "../pages/_app";
import type { LoginFormType } from "@/types";

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(0);

  const handleLogin = async (data: LoginFormType) => {
    setIsLoading(true);
    setStatusCode(0); // 重置狀態 否則 hook-form 的 error 會被清空

    try {
      const response = await fetch(apiNext.LOGIN, {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        dispatch(setUserInfo(result.data));
        router.push("/social");
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
      <Login
        isLaoding={isLoading}
        statusCode={statusCode}
        onSubmit={handleLogin}
      />
      {isLoading && <Loading />}
    </>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default LoginPage;
