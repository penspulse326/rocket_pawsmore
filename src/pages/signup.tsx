import { useState } from "react";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../pages/_app";

import HomeLayout from "@/containers/home/HomeLayout";
import SignUp from "@/containers/home/SignUp";
import Loading from "@/components/Loading";

const SignUpPage: NextPageWithLayout = () => {
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
