import React, { useState } from "react";
import SideBar from "@/containers/userDashboard/SideBar";
import MainContent from "@/containers/userDashboard/MainContent";
import Footer from "@/components/Footer";

const UserDashboard: React.FC = () => {
  const [targetPage, setTargetPage] = useState("");

  return (
    <main className="outer pt-16 flex h-screen relative">
      <SideBar prop="user" setTargetPage={setTargetPage} />
      <div className="flex flex-col gap-y-16 justify-between w-full pl-[248px]">
        <MainContent targetPage={targetPage} />
        <Footer />
      </div>
    </main>
  );
};

export default UserDashboard;
