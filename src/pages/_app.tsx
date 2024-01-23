import "@/styles/globals.css";
import "@/styles/animations.css";
import type { AppProps } from "next/app";
import { Noto_Sans_TC } from "next/font/google";

const notos = Noto_Sans_TC({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={notos.className}>
      <Component {...pageProps} />
    </main>
  );
}
