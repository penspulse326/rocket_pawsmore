import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="outter flex justify-between items-center pl-8 pr-6 h-16">
      <Link href="/test/social" className="flex">
        <Image src="/images/logo.svg" alt="logo" width={32} height={32} />
        <Image
          src="/images/logo-text.svg"
          alt="logo-text"
          width={114}
          height={24}
          className="ml-2 items-center"
        ></Image>
      </Link>
      <div>
        <Link href="/test/social">社群首頁</Link>
        <Link href="/test/social">數據紀錄</Link>
      </div>
      <div>個人資訊</div>
    </nav>
  );
}
