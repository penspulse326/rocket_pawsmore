import { useRouter } from "next/router";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { setUserInfo } from "@/common/redux/userInfoSlice";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../pages/_app";

import HomeLayout from "@/containers/home/HomeLayout";
import Login from "@/containers/home/Login";
import Loading from "@/components/Loading";

import { LoginFormType } from "@/types";

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
        console.log("登入成功");
        const { data } = result;
        // dispatch(setUserInfo(data));
        // router.push("/social");
      } else {
        console.log("登入失敗");
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
