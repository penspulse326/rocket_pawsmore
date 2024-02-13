import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import SideBar from "@/containers/userDashboard/SideBar";
import MainContent from "@/containers/userDashboard/MainContent";
import Footer from "@/components/Footer";

const UserDashboard: React.FC = () => {
  const params = useSearchParams();
  const to = params.get("to") || "";

  const router = useRouter();
  const [targetPage, setTargetPage] = useState(to);

  const handleSelectPage = (targetPage: string) => {
    setTargetPage(targetPage);
    router.push(`/user_dashboard?to=${targetPage}`, undefined, {
      shallow: true,
    });
  };

  return (
    <main className="outer pt-16 flex h-screen relative">
      <SideBar setTargetPage={handleSelectPage} />
      <div className="flex flex-col gap-y-16 justify-between w-full pl-[248px]">
        <MainContent targetPage={targetPage} />
        <Footer />
      </div>
    </main>
  );
};

export default UserDashboard;
