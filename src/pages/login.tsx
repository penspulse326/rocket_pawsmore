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
  const [statusCode, setStatusCode] = useState(NaN);

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

      const result = await response.json();

      if (response.ok) {
        setStatusCode(200);
        dispatch(setUserInfo(result.user));
        setIsLoading(false);
        router.push("/social");
      } else {
        setStatusCode(result.statusCode);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Login handleLogin={handleLogin} statusCode={statusCode} />
      {isLoading && <Loading />}
    </>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default LoginPage;
