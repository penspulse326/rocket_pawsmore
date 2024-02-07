import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

import TextInput from "@/components/form/profile/TextInput";
import PasswordInpput from "@/components/form/profile/PasswordInput";
import { errorText } from "@/common/lib/messageText";
import { useEffect } from "react";

interface LoginPropsType {
  onSubmit: (data: LoginFormType) => void;
  statusCode: number;
}
interface LoginFormType {
  email: string;
  password: string;
}

const Login: React.FC<LoginPropsType> = ({
  onSubmit: handleLogin,
  statusCode,
}) => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginFormType>();

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
  }, [statusCode, setError]);

  const onSubmit = (data: LoginFormType) => handleLogin(data);

  return (
    <div className="col-span-5 col-start-8 flex flex-col justify-center pr-12">
      <section className="flex flex-col justify-center gap-8 p-8 border border-stroke rounded-[30px]">
        <div className="flex flex-col gap-y-1">
          <h2 className="text-[32px]">歡迎回來！</h2>
          <h3 className="text-note">讓我們繼續記錄美好時光！</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
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
                <PasswordInpput
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
            disabled={!isValid}
            className={`${
              isValid ? "bg-primary" : "bg-note"
            } mt-4 py-3 rounded-full  text-white`}
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
      </section>
    </div>
  );
};

export default Login;

// type VerifyEmailType = () => JSX.Element | null;

// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");
// const [isFormChanged, setIsFormChanged] = useState(false);

// const isFormValid: boolean = email.trim() !== "" && password.trim() !== "";
// const isEmailValid: boolean = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
//   email.toString()
// );

// const verifyEmail: VerifyEmailType = () => {
//   if (isFormChanged) {
//     if (email === "") {
//       return <ErrorMessage>{errorText.REQUIRED}</ErrorMessage>;
//     } else if (!isEmailValid) {
//       return <ErrorMessage>{errorText.EMAIL_INVALID}</ErrorMessage>;
//     }
//   }
//   if (isFormValid) {
//     switch (statusCode) {
//       case 400:
//         return <ErrorMessage>{errorText.EMAIL_NOT_EXIST}</ErrorMessage>;
//       case 402:
//         return <ErrorMessage>{errorText.LOGIN_FAILED}</ErrorMessage>;
//     }
//   }
//   return null;
// };

{
  /* <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="flex justify-between items-center"
            >
              <span>Email</span>
              {verifyEmail()}
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="輸入電子郵件地址"
              className={`p-3 w-full border ${
                (isFormChanged && !isEmailValid) ||
                (isFormChanged && email === "") ||
                statusCode === 400 ||
                statusCode === 402
                  ? "border-error outline-error"
                  : "border-stroke"
              } outline-note rounded-[10px]`}
            />
          </div> */
}
