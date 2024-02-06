import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

import ErrorMessage from "@/components/ErrorMessage";
import { errorText } from "@/common/lib/messageText";
import Input from "@/components/form/Input";

interface SignUpPropsType {
  onSubmit: (data: any) => void;
}

interface FormInputType {
  email: string;
  password: string;
  checkPassword: string;
}

const SignUp: React.FC<SignUpPropsType> = ({ onSubmit: handleSignUp }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormInputType>();

  const password = watch("password");

  const onSubmit = (data: any) => handleSignUp(data);

  return (
    <div className="col-span-5 col-start-8 flex flex-col justify-center pr-12">
      <section className="flex flex-col justify-center gap-8 p-8 border border-stroke rounded-[30px]">
        <div>
          <h2 className="text-[32px]">註冊</h2>
          <h3 className="text-note">一同開啟與毛孩相伴的精彩冒險！</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Controller
            name="email"
            control={control}
            rules={{
              required: errorText.REQUIRED,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: errorText.EMAIL_INVALID,
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                title="Email"
                placeholder="輸入電子郵件地址"
                message={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: errorText.REQUIRED,
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: errorText.PASSWORD_INVALID,
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                title="密碼"
                placeholder="輸入8個字以上英數字"
                message={errors.password?.message}
              />
            )}
          />
          <Controller
            name="checkPassword"
            control={control}
            rules={{
              required: errorText.REQUIRED,
              validate: (value) =>
                value === password || errorText.PASSWORD_NOT_MATCH,
            }}
            render={({ field }) => (
              <Input
                {...field}
                title="確認密碼"
                placeholder="再次輸入密碼"
                message={errors.checkPassword?.message}
              />
            )}
          />
          <button
            type="submit"
            className="mt-4 py-3 rounded-full bg-primary text-white"
          >
            註冊
          </button>
        </form>
        <div className="flex justify-center gap-4">
          已有帳號？
          <Link href="/login" className="text-primary underline">
            登入
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
