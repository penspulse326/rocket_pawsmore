import Image from "next/image";
import Footer from "@/components/Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <section className="outer">
    <div className="inner flex flex-col h-screen">
      <section className="flex-grow grid grid-cols-12 gap-8">
        {/* 圖片 */}
        <header className="col-span-6 flex flex-col justify-center gap-12 pl-12">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo-rounded.svg"
              alt="logo"
              priority={true}
              width={82}
              height={82}
            />
            <Image
              src="/images/logo-text.svg"
              alt="logo-text"
              priority={true}
              width={297}
              height={62}
              className="w-auto h-auto"
            />
          </div>
          <Image
            src="/images/banner-home.png"
            alt="home-banner"
            priority={true}
            width={563}
            height={70}
            className="w-auto h-auto"
          />
        </header>
        {/* 表單*/}
        <div className="col-span-5 col-start-8 flex flex-col justify-center pr-12">
          <section className="flex flex-col justify-center gap-8 p-8 border border-stroke rounded-[30px]">
            {children}
          </section>
        </div>
      </section>
    </div>
    <Footer />
  </section>
);

export default Layout;
