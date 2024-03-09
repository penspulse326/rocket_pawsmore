import HomeLayout from "@/containers/auth/Layout";
import SignUp from "@/containers/auth/SignUp";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";

const SignUpPage: NextPageWithLayout = () => {
  return <SignUp />;
};

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default SignUpPage;
