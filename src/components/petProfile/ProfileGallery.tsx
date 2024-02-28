import React, { useState } from "react";
import { IconLayoutGrid, IconMedal, IconPinned } from "@tabler/icons-react";
import Posts from "./gallery/Posts";
import Milestones from "./gallery/Milestones";
import Moments from "./gallery/Moments";

const ProfileGallery: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("貼文");

  const GalleryTabs = () => {
    interface TabType {
      title: string;
      icon: React.ComponentType<any>;
    }
    const tabs: TabType[] = [
      { title: "貼文", icon: IconLayoutGrid },
      { title: "里程碑", icon: IconMedal },
      { title: "回顧", icon: IconPinned },
    ];
    const handleToggleTab = (tab: string) => {
      setSelectedTab(tab);
    };
    return (
      <section className="flex justify-center">
        {tabs.map((tab, index) => {
          const IconComponent = tab.icon;
          return (
            <div key={index}>
              <div
                className={`h-[5px] w-full ${
                  selectedTab === tab.title &&
                  "bg-gradient-to-r from-[#7CCBFF] via-[#7CCBFF] to-[#0057FF]"
                }`}
              ></div>
              <div className="flex justify-center items-center gap-x-1 w-[132px] py-8">
                <IconComponent
                  size={16}
                  color={` ${
                    selectedTab === tab.title ? "#000000" : "#808080"
                  } `}
                />
                <div
                  className={`hover:cursor-pointer ${
                    selectedTab === tab.title ? "font-bold" : "text-note"
                  }`}
                  onClick={() => handleToggleTab(tab.title)}
                >
                  {tab.title}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    );
  };
  return (
    <section className="flex flex-col items-center mb-4 border-t max-w-[1088px] w-full">
      <GalleryTabs />
      {(() => {
        switch (selectedTab) {
          case "貼文":
            return <Posts />;
          case "里程碑":
            return <Milestones />;
          case "回顧":
            return <Moments />;
          default:
            return null;
        }
      })()}
    </section>
  );
};

export default ProfileGallery;
