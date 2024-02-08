import React from "react";
import Account from "@/components/userDashboard/Account";

const MainContent: React.FC<{ targetPage: string }> = ({ targetPage }) => {
  return (
    <div className="max-w-[1192px] w-full mt-8 ml-[144px]">
      {(() => {
        switch (targetPage) {
          case "帳號資料":
            return <Account title={targetPage} />;
          case "個人檔案":
          // return <Profile />;
          case "寵物檔案清單":
          // return <PetList />;
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
