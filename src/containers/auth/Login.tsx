import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/common/redux/userInfoSlice";

import Loading from "@/components/hint/Loading";
import TextInput from "@/components/form/profile/TextInput";
import PasswordInput from "@/components/form/profile/PasswordInput";
import { errorText } from "@/common/lib/messageText";
import { fetchLogin } from "@/common/fetch/auth";
import useToken from "@/common/hooks/useToken";

interface LoginFormType {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
    setValue,
  } = useForm<LoginFormType>({
    defaultValues: {
      email: "ss@11.com", // 預設的電子郵件地址
      password: "sss111", // 空的預設值，稍後手動設置
    },
  });

  const { updateUser } = useToken();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(0);

  const isBtnDisabled = !isValid || isLoading;

  const onSubmit = async (data: LoginFormType) => {
    setIsLoading(true);
    setStatusCode(0); // 重置狀態 否則 hook-form 的 error 會被清空

    const response = await fetchLogin(data);
    if (response.ok) {
      const { token, userId, username } = response.data;
      dispatch(setUserInfo(response.data));
      updateUser(token, userId);
      if (!username) {
        router.push("/member/new/profile");
        return;
      }
      router.push("/");
    }

    setStatusCode(response.status);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    switch (statusCode) {
      case 400:
        setError("email", { message: errorText.EMAIL_NOT_EXIST });
        break;
      case 401:
        setError("email", { message: errorText.ALL_NOT_MATCH });
        break;
      case 500:
        setError("email", { message: errorText.UNKNOWN_ERROR });
        break;
      default:
        break;
    }
  }, [statusCode]);

  return (
    <>
      <div className="flex flex-col gap-y-1">
        <h2 className="text-[32px]">歡迎回來！</h2>
        <h3 className="text-note">讓我們繼續記錄美好時光！</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Email */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: errorText.REQUIRED,
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
              message: errorText.EMAIL_INVALID,
            },
          }}
          render={({ field }) => (
            <TextInput
              title="Email"
              placeholder="輸入電子郵件地址"
              message={errors.email?.message}
              {...field}
            />
          )}
        />
        {/* 密碼 */}
        <div className="flex flex-col gap-1">
          <Controller
            name="password"
            control={control}
            rules={{
              required: errorText.REQUIRED,
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/,
                message: errorText.PASSWORD_INVALID,
              },
            }}
            render={({ field }) => (
              <PasswordInput
                title="密碼"
                placeholder="輸入密碼"
                message={errors.password?.message}
                {...field}
              />
            )}
          />
          <Link href="#" className="self-end text-primary">
            忘記密碼？
          </Link>
        </div>
        <button
          type="submit"
          disabled={isBtnDisabled}
          className={`${
            isValid ? "bg-primary" : "bg-note"
          } mt-4 py-3 rounded-full text-white`}
        >
          登入
        </button>
      </form>
      <div className="flex justify-center gap-4">
        還沒有帳號？
        <Link href="/signup" className="text-primary underline">
          立刻加入
        </Link>
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default Login;
