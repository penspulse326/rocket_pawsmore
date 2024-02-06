import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-3 p-24 min-h-screen bg-blue-300">
      <h1 className="text-xl">靜態頁面展示</h1>
      <Link href="/social" className="underline">
        社群頁面
      </Link>
      <Link href="/pet_profile" className="underline">
        寵物檔案
      </Link>
      <Link href="/test/upload" className="underline ">
        檔案上傳
      </Link>
      <Link href="/record_dashboard" className="underline">
        數據頁面
      </Link>
      <Link href="/login" className="underline">
        登入
      </Link>
      <Link href="/test/daily" className="underline">
        日常卡片測試
      </Link>
      <Link href="/member/create_profile" className="underline">
        建立個人檔案
      </Link>
      <Link href="/member/create_pet" className="underline">
        建立寵物檔案
      </Link>
      <Link href="/member/select_topic  " className="underline">
        選擇主題
      </Link>
    </main>
  );
}
