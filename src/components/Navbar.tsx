import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="outter flex justify-between items-center h-16">
      <Link href="/test/social">Pawsmore</Link>
      <div>
        <Link href="/test/social">社群首頁</Link>
        <Link href="/test/social">數據紀錄</Link>
      </div>
    </nav>
  );
}
