import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { useDispatch } from "react-redux";
import { setUserInfo } from "@/common/redux/userInfoSlice";
import { useRouter } from "next/router";

const LoginPage: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const { email, password } = event.target as HTMLFormElement;
    const data = {
      email: email.value,
      password: password.value,
    };

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("登入失敗");
      }

      const result = await response.json();
      console.log(result.user);

      dispatch(setUserInfo(result.user));
      router.push("/social");
    } catch (error) {
      alert("登入失敗");
    }
  };

  return (
    <section className="outter flex justify-center items-center gap-20 h-screen">
      <section className="flex items-center gap-8">
        <Image
          src="/images/logo-rounded.svg"
          alt="logo"
          width={144}
          height={144}
        />
        <Image
          src="/images/logo-text.svg"
          alt="logo-text"
          width={0}
          height={0}
          className="w-auto h-auto"
        />
      </section>
      <section className="flex flex-col justify-center items-center gap-8 p-8 w-[30%] border border-note rounded-[30px] shadow-lg">
        <h2 className="text-3xl font-bold">登入</h2>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
          <input
            type="text"
            name="email"
            placeholder="電子信箱"
            className="p-3 w-full border border-stroke rounded-md outline-note"
          />
          <input
            type="password"
            name="password"
            placeholder="密碼"
            className="p-3 w-full border border-stroke rounded-md"
          />
          <Link href="#" className="self-end underline">
            忘記密碼
          </Link>
          <button
            type="submit"
            className="py-3 rounded-full bg-primary text-white"
          >
            登入
          </button>
        </form>
        <div className="flex gap-8">
          <Link href="#" className="underline">
            還沒有帳號？點此註冊
          </Link>
        </div>
      </section>
    </section>
  );
};

export default LoginPage;
