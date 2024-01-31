const LoginLayout = () => {
  return (
    <section className="col-span-5 col-start-8 flex flex-col justify-center pr-12">
      <section className="flex flex-col justify-center gap-8 p-8 border border-stroke rounded-[30px]">
        <div>
          <h2 className="text-[32px]">歡迎回來！</h2>
          <h3 className="text-note">讓我們繼續記錄美好時光！</h3>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
    </section>
  );
};
export default LoginLayout;
