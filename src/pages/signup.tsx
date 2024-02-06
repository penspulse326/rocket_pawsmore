import { useRouter } from "next/router";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { setUserInfo } from "@/common/redux/userInfoSlice";

import { FormValidateType } from "@/types";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../pages/_app";

import HomeLayout from "@/containers/home/HomeLayout";
import SignUp from "@/containers/home/SignUp";
import Loading from "@/components/Loading";

const SignUpPage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (data: any) => {
    console.log("sign up", data);
  };

  return (
    <>
      <SignUp onSubmit={handleSignUp} />
      {isLoading && <Loading />}
    </>
  );
};

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default SignUpPage;
