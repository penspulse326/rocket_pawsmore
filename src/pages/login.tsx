import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { setUserInfo } from "@/common/redux/userInfoSlice";
import Footer from "@/components/petProfile/Footer";
import Loading from "@/components/Loading";

const LoginPage: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const { email, password } = event.target as HTMLFormElement;
    const data = {
      email: email.value,
      password: password.value,
    };

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("登入失敗");
      }
      const result = await response.json();

      dispatch(setUserInfo(result.user));
      setIsLoading(false);
      alert("登入成功");
      router.push("/social");
    } catch (error) {
      setIsLoading(false);
      alert("登入失敗");
    }
  };

  return (
    <section className="outer">
      <div className="inner flex flex-col h-screen">
        <section className="flex-grow grid grid-cols-12 gap-8">
          {/* logo 圖片 */}
          <section className="col-span-6 flex flex-col justify-center gap-12 pl-12">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo-rounded.svg"
                alt="logo"
                width={82}
                height={82}
              />
              <Image
                src="/images/logo-text.svg"
                alt="logo-text"
                width={297}
                height={62}
              />
            </div>
            <Image
              src="/images/banner-home.png"
              alt="home-banner"
              width={563}
              height={70}
            />
          </section>
          {/* 表單 */}
          <section className="col-span-5 col-start-8 flex flex-col justify-center pr-12">
            <section className="flex flex-col justify-center gap-8 p-8 border border-note rounded-[30px]">
              <div>
                <h2 className="text-[32px]">歡迎回來！</h2>
                <h3 className="text-note">讓我們繼續記錄美好時光！</h3>
              </div>
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="flex justify-between items-center">
                    Email
                  </span>
                  <input
                    type="text"
                    name="email"
                    placeholder="輸入電子郵件地址"
                    className="p-3 w-full border border-stroke outline-note rounded-[10px] "
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="flex justify-between items-center">
                    密碼
                  </span>
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
        </section>
      </div>
      <footer>
        <Footer />
      </footer>
      {isLoading && <Loading />}
    </section>
  );
};

export default LoginPage;
