import { useRouter } from "next/router";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { setUserInfo } from "@/common/redux/userInfoSlice";

import HomeLayout from "@/containers/auth/Layout";
import SignUp from "@/containers/auth/SignUp";
import Loading from "@/components/hint/Loading";
import apiNext from "../common/fetch/apiNext";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../pages/_app";
import type { LoginFormType } from "@/types";

const SignUpPage: NextPageWithLayout = () => {
  return <SignUp />;
};

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default SignUpPage;
