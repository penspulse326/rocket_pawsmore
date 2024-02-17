import { GetServerSideProps } from "next";
import { ReactElement } from "react";

import HomeLayout from "@/containers/auth/Layout";
import Login from "@/containers/auth/Login";
import { fetchCheckAuth } from "@/common/fetch/auth";

import type { NextPageWithLayout } from "./_app";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.token;

  // 如果 token 存在並合法，直接重導至 /social
  if (token) {
    const response = await fetchCheckAuth(token);

    if (response.ok) {
      return {
        redirect: {
          destination: "/social",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};

const LoginPage: NextPageWithLayout = () => {
  return <Login />;
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default LoginPage;
