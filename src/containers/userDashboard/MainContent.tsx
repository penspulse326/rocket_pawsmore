import React from "react";
import Account from "@/components/userDashboard/Account";
import Profile from "@/components/userDashboard/Profile";
import PetList from "@/components/userDashboard/PetList";

const MainContent: React.FC<{ targetPage: string }> = ({ targetPage }) => {
  return (
    <div className="max-w-[1192px] mt-8 ml-[144px]">
      {(() => {
        switch (targetPage) {
          case "account":
            return <Account />;
          case "profile":
            return <Profile />;
          case "pet_list":
            return <PetList />;
          case "add_pet":
          // return <AddPet />;
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default MainContent;
