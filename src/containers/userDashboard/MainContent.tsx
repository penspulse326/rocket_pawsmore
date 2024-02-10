import React from "react";
import Account from "@/components/userDashboard/Account";
import Profile from "@/components/userDashboard/Profile";
import PetList from "@/components/userDashboard/PetList";

const MainContent: React.FC<{ targetPage: string }> = ({ targetPage }) => {
  return (
    <div className="max-w-[1192px] mt-8 ml-[144px]">
      {(() => {
        switch (targetPage) {
          case "帳號資料":
            return <Account title={targetPage} />;
          case "個人檔案":
            return <Profile title={targetPage} />;
          case "寵物檔案清單":
            return <PetList title={targetPage} />;
          case "新增寵物檔案":
          // return <AddPet />;
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default MainContent;
