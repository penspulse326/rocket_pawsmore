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
import {
  emailValidate,
  passwordValidate,
  useValidator,
} from "@/common/helpers/formValidate";

const SignUpPage: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const validateData = {
    isValid: false,
    fields: {
      email: {
        value: "",
        message: "",
        required: true,
        validate: (email: string) => emailValidate(email),
      },
      password: {
        value: "",
        message: "",
        required: true,
        validate: (password: string) => passwordValidate(password),
      },
      checkPassword: {
        value: "",
        message: "",
        required: true,
        validate: (password: string, checkPassword: string) =>
          password === checkPassword,
      },
    },
  };

  const [validation, handleValidate] = useValidator(validateData);
  const fields = validation.fields;

  console.log(fields);

  // const handleErrorChange = (errorType: string, errorMessage: string) => {
  //   setValidator((prev) => ({
  //     ...prev,
  //     [errorType]: { message: errorMessage },
  //   }));
  // };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    const { email, password, checkPassword } = event.target as HTMLFormElement;

    const data = {
      email: email.value,
      password: password.value,
      checkPassword: checkPassword.value,
    };

    handleValidate(data);

    //setIsLoading(true);

    // try {
    //   const response = await fetch("/api/auth/signup", {
    //     method: "POST",
    //     body: JSON.stringify(data),
    //   });

    //   const result = await response.json();

    //   console.log(result);

    //   switch (response.status) {
    //     case 200: {
    //       dispatch(setUserInfo(result.user));
    //       router.push("/social"); // 這邊等個人資料 api 完成再改重新導向的流程
    //       break;
    //     }
    //     case 401: {
    //       setValidator({
    //         ...errors,
    //         email: { ...errors.email, message: result.message },
    //       });
    //       break;
    //     }
    //     case 409: {
    //       setErrors({
    //         ...errors,
    //         email: { ...errors.email, message: result.message },
    //       });
    //     }
    //     default:
    //       break;
    //   }
    // } catch (error) {
    //   alert("伺服器錯誤，請稍後再試");
    // }
    // setIsLoading(false);
  };

  return (
    <>
      <SignUp data={fields} onSubmit={handleSignUp} />
      {isLoading && <Loading />}
    </>
  );
};

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default SignUpPage;
