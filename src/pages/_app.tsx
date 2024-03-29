import "@/styles/globals.css";
import "@/styles/animations.css";
import "@/styles/loadings.css";

import moment from "moment";
import "moment/locale/zh-tw";
import { Noto_Sans_TC } from "next/font/google";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "@/common/redux/store";

import Navbar from "@/components/navbar/Navbar";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const notos = Noto_Sans_TC({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

moment.locale("zh-tw");

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Pawsmore!</title>
        <meta
          name="description"
          content="紀錄寵物生活點滴，擴大您的毛孩生活圈"
        />
        <meta name="keywords" content="寵物, 社交平台, 數據記錄, 生活管理" />
      </Head>
      <Provider store={store}>
        <main className={notos.className}>
          <Navbar />
          {getLayout(<Component {...pageProps} />)}
        </main>
      </Provider>
    </>
  );
}
