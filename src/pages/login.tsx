import { useRouter } from "next/router";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { setUserInfo } from "@/common/redux/userInfoSlice";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../pages/_app";

import HomeLayout from "@/containers/home/HomeLayout";
import Login from "@/containers/home/Login";
import Loading from "@/components/Loading";

const LoginPage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const { email, password } = event.target as HTMLFormElement;
    const data = {
      email: email.value,
      password: password.value,
    };

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("登入失敗");
      }
      const result = await response.json();

      dispatch(setUserInfo(result.user));
      setIsLoading(false);
      alert("登入成功");
      router.push("/social");
    } catch (error) {
      setIsLoading(false);
      alert("登入失敗");
    }
  };

  return (
    <>
      <Login handleLogin={handleLogin} />
      {isLoading && <Loading />}
    </>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default LoginPage;
