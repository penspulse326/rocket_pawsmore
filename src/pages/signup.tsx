import { useRouter } from "next/router";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { setUserInfo } from "@/common/redux/userInfoSlice";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../pages/_app";

import HomeLayout from "@/containers/home/HomeLayout";
import SignUp from "@/containers/home/SignUp";
import Loading from "@/components/Loading";

import { errorText } from "@/common/lib/messageText";

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

  console.log(error);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    const { email, password, checkPassword } = event.target as HTMLFormElement;

    // 檢查必填
    if (!email.value || !password.value) {
      setError({
        ...error,
        email: !email.value ? errorText.REQUIRED : "",
        password: !password.value ? errorText.REQUIRED : "",
      });
      return;
    }
    // 檢查密碼是否相同
    if (password.value !== checkPassword.value) {
      setError({
        ...error,
        checkPassword: errorText.PASSWORD_NOT_MATCH,
      });
      return;
    }

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
      <SignUp onSubmit={handleSignUp} error={error} />
      {isLoading && <Loading />}
    </>
  );
};

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default SignUpPage;
