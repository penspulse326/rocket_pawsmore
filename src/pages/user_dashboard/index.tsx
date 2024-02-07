import React from "react";
import SideBar from "@/containers/userDashboard/SideBar";
import MainContent from "@/containers/userDashboard/MainContent";
import Footer from "@/components/Footer";

const UserDashboard: React.FC = () => {
  return (
    <main className="outer mt-16 flex">
      <SideBar />
      <div className="flex flex-col justify-between w-full">
        <MainContent />
        <Footer />
      </div>
    </main>
  );
};

export default UserDashboard;
