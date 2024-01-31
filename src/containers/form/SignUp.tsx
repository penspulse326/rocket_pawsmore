import Link from "next/link";

interface SignUpPropsType {
  handleSignUp: (e: React.FormEvent) => void;
}

const Login: React.FC<SignUpPropsType> = ({ handleSignUp }) => {
  return (
    <div className="col-span-5 col-start-8 flex flex-col justify-center pr-12">
      <section className="flex flex-col justify-center gap-8 p-8 border border-stroke rounded-[30px]">
        <div>
          <h2 className="text-[32px]">註冊</h2>
          <h3 className="text-note">一同開啟與毛孩相伴的精彩冒險！</h3>
        </div>
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="flex justify-between items-center">Email</span>
            <input
              type="text"
              name="email"
              placeholder="輸入電子郵件地址"
              className="p-3 w-full border border-stroke outline-note rounded-[10px] "
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="flex justify-between items-center">密碼</span>
            <input
              type="password"
              name="password"
              placeholder="輸入8字符以上英數字密碼"
              className="p-3 w-full border border-stroke outline-note rounded-[10px] "
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="flex justify-between items-center">確認密碼</span>
            <input
              type="password"
              name="password"
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
export default Login;
