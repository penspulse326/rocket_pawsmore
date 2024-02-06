import Image from "next/image";
import Footer from "@/components/Footer";

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <section className="outer">
    <div className="inner flex flex-col h-screen">
      <section className="flex-grow grid grid-cols-12 gap-8">
        {/* 圖片 */}
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
        {/* 表單*/}
        {children}
      </section>
    </div>
    <Footer />
  </section>
);

export default HomeLayout;
