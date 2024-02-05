import { useRouter } from "next/router";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { setUserInfo } from "@/common/redux/userInfoSlice";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../pages/_app";

import HomeLayout from "@/containers/home/HomeLayout";
import SignUp from "@/containers/home/SignUp";
import Loading from "@/components/Loading";

export interface errorType {
  email: string;
  password: string;
  checkPassword: string;
}

const SignUpPage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<errorType>({
    email: "",
    password: "",
    checkPassword: "",
  });

  const handleErrorChange = (errorType: string, errorMessage: string) => {
    setError(() => ({ ...error, [errorType]: errorMessage }));
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    const { email, password } = event.target as HTMLFormElement;

    const data = {
      email: email.value,
      password: password.value,
    };

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      console.log(result);

      switch (response.status) {
        case 200: {
          dispatch(setUserInfo(result.user));
          router.push("/social"); // 這邊等個人資料 api 完成再改重新導向的流程
          break;
        }
        case 401: {
          setError({ ...error, email: result.message });
          break;
        }
        case 409: {
          setError({ ...error, email: result.message });
        }
        default:
          break;
      }
    } catch (error) {
      alert("伺服器錯誤，請稍後再試");
    }
    setIsLoading(false);
  };

  return (
    <>
      <SignUp
        onChange={handleErrorChange}
        onSubmit={handleSignUp}
        error={error}
      />
      {isLoading && <Loading />}
    </>
  );
};

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default SignUpPage;
