import Link from "next/link";

import ErrorMessage from "@/components/ErrorMessage";
import { error } from "@/common/lib/messageText";

interface LoginPropsType {
  handleLogin: (e: React.FormEvent) => void;
}

const Login: React.FC<LoginPropsType> = ({ handleLogin }) => {
  return (
    <div className="col-span-5 col-start-8 flex flex-col justify-center pr-12">
      <section className="flex flex-col justify-center gap-8 p-8 border border-stroke rounded-[30px]">
        <div>
          <h2 className="text-[32px]">歡迎回來！</h2>
          <h3 className="text-note">讓我們繼續記錄美好時光！</h3>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h4 className="flex justify-between items-center">
              <span>Email</span>
              <ErrorMessage>{error.EMAIL_INVALID}</ErrorMessage>
            </h4>
            <input
              type="text"
              name="email"
              placeholder="輸入電子郵件地址"
              className="p-3 w-full border border-stroke outline-note rounded-[10px] "
            />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="flex justify-between items-center">
              <span>密碼</span>
              <ErrorMessage>{error.PASSWORD_INVALID}</ErrorMessage>
            </h4>
            <input
              type="password"
              name="password"
              placeholder="密碼"
              className="p-3 w-full border border-stroke outline-note rounded-[10px] "
            />
            <Link href="#" className="self-end text-primary">
              忘記密碼？
            </Link>
          </div>
          <button
            type="submit"
            className="mt-4 py-3 rounded-full bg-primary text-white"
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
