import "@/styles/globals.css";
import "@/styles/animations.css";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Noto_Sans_TC } from "next/font/google";

import { Provider } from "react-redux";
import { store } from "@/common/redux/store";

import Navbar from "@/components/navbar";

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

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <main className={notos.className}>
        <Navbar />
        {getLayout(<Component {...pageProps} />)}
      </main>
    </Provider>
  );
}
