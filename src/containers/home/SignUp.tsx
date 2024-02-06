import Link from "next/link";
import { useForm } from "react-hook-form";

import ErrorMessage from "@/components/ErrorMessage";
import { errorText } from "@/common/lib/messageText";

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
          <div className="flex flex-col gap-1">
            <h4 className="flex justify-between items-center">
              <span>Email</span>
              {errors.email && (
                <ErrorMessage>{errors.email?.message}</ErrorMessage>
              )}
            </h4>
            <input
              {...register("email", {
                required: errorText.REQUIRED,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: errorText.EMAIL_INVALID,
                },
              })}
              type="text"
              name="email"
              placeholder="輸入電子郵件地址"
              className="p-3 w-full border border-stroke outline-note rounded-[10px] "
            />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="flex justify-between items-center">
              <span>密碼</span>
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </h4>
            <input
              {...register("password", {
                required: errorText.REQUIRED,
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: errorText.PASSWORD_INVALID,
                },
              })}
              type="password"
              name="password"
              placeholder="輸入8字符以上英數字密碼"
              className="p-3 w-full border border-stroke outline-note rounded-[10px] "
            />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="flex justify-between items-center">
              <span>確認密碼</span>
              <ErrorMessage>{errors.checkPassword?.message}</ErrorMessage>
            </h4>
            <input
              {...register("checkPassword", {
                required: errorText.REQUIRED,
                validate: (value) =>
                  value === password || errorText.PASSWORD_NOT_MATCH,
              })}
              type="password"
              name="checkPassword"
              placeholder="再次輸入密碼"
              className="p-3 w-full border border-stroke outline-note rounded-[10px] "
            />
          </div>
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
