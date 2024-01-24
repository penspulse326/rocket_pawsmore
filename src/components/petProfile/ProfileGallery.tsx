import { useState } from "react";
import Image from "next/image";
import * as Icons from "@tabler/icons-react";

const ProfileGallery = () => {
  const [selectedTab, setSelectedTab] = useState("貼文");

  const GalleryTabs = () => {
    const tabs = [
      { title: "貼文", icon: "IconLayoutGrid" },
      { title: "里程碑", icon: "IconMedal" },
      { title: "回顧", icon: "IconPinned" },
    ];
    const handleToggleTab = (tab: string) => {
      setSelectedTab(tab);
    };
    return (
      <section className="flex justify-center">
        {tabs.map((tab, index) => {
          const IconComponent = Icons[tab.icon];
          return (
            <div
              className="flex justify-center items-center gap-x-1 w-[132px] py-8"
              key={`${index}-${tab.title}`}
            >
              <IconComponent
                size={16}
                color={` ${selectedTab === tab.title ? "#000000" : "#808080"} `}
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
          );
        })}
      </section>
    );
  };
  const Posts = () => {
    const allPics = [
      { url: "/test/gallery-1.jpg", hasMilestone: false },
      { url: "/test/gallery-2.jpg", hasMilestone: true },
      { url: "/test/gallery-3.jpg", hasMilestone: false },
      { url: "/test/gallery-4.jpg", hasMilestone: false },
      { url: "/test/gallery-5.jpg", hasMilestone: false },
      { url: "/test/gallery-6.jpg", hasMilestone: true },
    ];
    return (
      <section className="flex gap-4 flex-wrap">
        {allPics.map((value, index) => {
          return (
            <div
              className="gallery-card relative max-w-[352px] w-full max-h-[352px] h-full z-0"
              key={index}
            >
              <Image
                className="rounded-[30px]"
                src={value.url}
                width={352}
                height={352}
                alt="gallery photos"
              />
              {/* milestone badge */}
              {value.hasMilestone ? (
                <Image
                  className="absolute bottom-5 left-5"
                  src="/test/milestone-1.svg"
                  width={74}
                  height={70}
                  alt="milestone badge"
                />
              ) : null}
              {/* show favorite icon & comments */}
              <ul className="overlay absolute top-0 -z-10 flex gap-x-4 justify-center items-center bg-black/50 w-full h-full text-white rounded-[30px]">
                <li className="flex gap-x-1 items-center">
                  <Icons.IconHeartFilled size={26} />
                  <div>4</div>
                </li>
                <li className="flex gap-x-1 items-center">
                  <Icons.IconMessageCircle2Filled size={26} />
                  <div>1</div>
                </li>
              </ul>
            </div>
          );
        })}
      </section>
    );
  };
  const Milestones = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const milestoneDataset = [
      {
        icon: "/test/milestone-1.svg",
        title: "破壞王",
        content: "累積5次咬爛物品",
        created_at: "2024/1/8",
      },
      {
        icon: "/test/milestone-2.svg",
        title: "小試身手？",
        content: "第一次咬爛物品",
        created_at: "2023/11/23",
      },
      {
        icon: "/test/milestone-3.svg",
        title: "我是勇者！",
        content: "第一次打針",
        created_at: "2023/11/1",
      },
      {
        icon: "/test/milestone-1.svg",
        title: "破壞王",
        content: "累積5次咬爛物品",
        created_at: "2024/1/8",
      },
      {
        icon: "/test/milestone-2.svg",
        title: "小試身手？",
        content: "第一次咬爛物品",
        created_at: "2023/11/23",
      },
      {
        icon: "/test/milestone-3.svg",
        title: "我是勇者！",
        content: "第一次打針",
        created_at: "2023/11/1",
      },
    ];

    return (
      <section className="flex flex-col gap-y-8 w-full">
        {/* gotten */}
        <div className="flex flex-wrap gap-4 w-full">
          {milestoneDataset.map((item, index) => {
            return (
              <div
                className="flex border border-stroke rounded-[30px] max-w-[352px] max-h-[150px] w-full h-full"
                key={index}
              >
                <div className="flex justify-center items-center max-w-[168px] w-full">
                  <Image
                    src={item.icon}
                    width={168}
                    height={90}
                    alt="milestone badge"
                  />
                  {/* {item.svg} */}
                </div>
                <ul className="flex flex-col justify-center gap-y-1 font-normal max-w-[184px] w-full h-full pl-2 py-8">
                  <li className="text-2xl">{item.title}</li>
                  <li>{item.content}</li>
                  <li className="text-xs text-note">{item.created_at}</li>
                </ul>
              </div>
            );
          })}
        </div>
        {/* yet */}
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-x-1 text-note">
            <div>未獲得</div>
            {isExpanded ? (
              <Icons.IconChevronUp
                size={24}
                className="hover:cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              />
            ) : (
              <Icons.IconChevronDown
                size={24}
                className="hover:cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              />
            )}
          </div>
          {isExpanded ? (
            <div className="flex flex-wrap gap-4 w-full">
              {milestoneDataset.map((item, index) => {
                return (
                  <div
                    className="flex border border-stroke rounded-[30px] max-w-[352px] max-h-[150px] w-full h-full"
                    key={index}
                  >
                    <div className="flex justify-center items-center max-w-[168px] w-full">
                      <Image
                        src={item.icon}
                        className="grayscale"
                        width={168}
                        height={90}
                        alt="milestone badge"
                      />
                      {/* {item.svg} */}
                    </div>
                    <ul className="flex flex-col justify-center gap-y-1 font-normal max-w-[184px] w-full h-full pl-2 py-8">
                      <li className="text-2xl">{item.title}</li>
                      <li>{item.content}</li>
                      <li className="text-xs text-note">{item.created_at}</li>
                    </ul>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </section>
    );
  };
  return (
    <section className="flex flex-col items-center border-t max-w-[1088px] w-full">
      <GalleryTabs />
      {(() => {
        switch (selectedTab) {
          case "貼文":
            return <Posts />;
          case "里程碑":
            return <Milestones />;
          case "回顧":
            return null;
          default:
            return null;
        }
      })()}
    </section>
  );
};

export default ProfileGallery;
