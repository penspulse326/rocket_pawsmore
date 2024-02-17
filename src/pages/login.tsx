import { ReactElement } from "react";

import HomeLayout from "@/containers/auth/Layout";
import Login from "@/containers/auth/Login";

import type { NextPageWithLayout } from "./_app";

const LoginPage: NextPageWithLayout = () => {
  return <Login />;
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default LoginPage;
