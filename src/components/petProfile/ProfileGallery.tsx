import { useState } from "react";
import Image from "next/image";
import moment from "moment";
import {
  IconLayoutGrid,
  IconMedal,
  IconPinned,
  IconHeartFilled,
  IconMessageCircle2Filled,
  IconChevronUp,
  IconChevronDown,
  IconPaw,
} from "@tabler/icons-react";
import getIconColor from "@/common/helpers/getIconColor";
import { originalData } from "@/common/lib/test/eventData";
import sortByAge from "@/common/helpers/sortByAge";

const ProfileGallery = () => {
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
                  <IconHeartFilled size={26} />
                  <div>4</div>
                </li>
                <li className="flex gap-x-1 items-center">
                  <IconMessageCircle2Filled size={26} />
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
                <ul className="flex flex-col justify-center gap-y-1 max-w-[184px] w-full h-full pl-2 py-8">
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
              <IconChevronUp
                size={24}
                className="hover:cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              />
            ) : (
              <IconChevronDown
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
                    <ul className="flex flex-col justify-center gap-y-1 max-w-[184px] w-full h-full pl-2 py-8">
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
  const Moments = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [filterEvent, setFilterEvent] = useState("全部紀錄");

    const EventFilter = () => {
      const category: string[] = [
        "全部紀錄",
        "日常紀錄",
        "醫療紀錄",
        "重要時刻",
      ];

      return (
        <div
          className="relative flex gap-x-1 justify-between items-center w-[158px] border border-stroke px-4 py-1 rounded-[300px] hover:cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div>{filterEvent}</div>
          <IconChevronDown size={24} />
          {isExpanded && (
            <ul className="absolute top-10 left-0.5 bg-white rounded-3xl p-2 w-[124px] shadow-[0_0_10px_0_rgba(0,0,0,0.15)]">
              {category.map((item, index) => {
                return (
                  <li
                    className="flex items-center gap-x-1 px-3 py-1 rounded-3xl hover:cursor-pointer hover:bg-secondary"
                    key={index}
                    onClick={() => {
                      setFilterEvent(item);
                      setIsExpanded(!isExpanded);
                    }}
                  >
                    {item === "全部類型" ? (
                      ""
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="6"
                        viewBox="0 0 6 6"
                        fill="none"
                      >
                        <circle cx="3" cy="3" r="3" fill={getIconColor(item)} />
                      </svg>
                    )}
                    {item}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      );
    };
    const AgeCard = () => {
      // let filteredData = originalData;
      let sortedData;

      if (filterEvent === "全部紀錄") {
        sortedData = sortByAge(originalData);
      } else {
        const filteredData = originalData.filter(
          (event) => event.card === filterEvent
        );
        sortedData = sortByAge(filteredData);
      }

      return (
        <div className="flex flex-col gap-y-16">
          {sortedData.map((ageGroup, index) => {
            const ageInYear = Math.floor(ageGroup.ageInMonth / 12);
            const ageInMonth = ageGroup.ageInMonth % 12;

            return (
              <div className="flex flex-col gap-y-1" key={index}>
                {/* age */}
                <ul className="flex gap-x-2 text-xl font-medium">
                  <ol className="flex gap-x-1">
                    <li className="w-[30px] text-center">{ageInYear}</li>
                    <li>歲</li>
                  </ol>
                  <ol className="flex gap-x-1">
                    <li className="w-[30px] text-center">{ageInMonth}</li>
                    <li>個月</li>
                  </ol>
                </ul>
                <div className="ml-14 flex flex-col">
                  <div className="h-8 border-l-2 border-stroker ml-3"></div>
                  <div className="flex gap-x-4">
                    <div className="flex flex-col gap-y-8 w-full">
                      {ageGroup.events.map((dateGroup, index) => {
                        return (
                          <div className="flex gap-x-4" key={index}>
                            {/* date */}
                            <ul className="flex gap-x-2">
                              <li className="">
                                <div className="h-4 border-l-2 border-stroker ml-3"></div>
                                <IconPaw color={"#203170"} fill={"#203170"} />
                                {index === ageGroup.events.length - 1 || (
                                  <div className="h-full border-l-2 border-stroker ml-3"></div>
                                )}
                              </li>
                              <li className="w-[84px] h-10 flex items-end">
                                {moment(dateGroup.date).format("YYYY/M/D")}
                              </li>
                            </ul>
                            {/* card */}
                            <ul className="flex flex-col gap-y-4 max-w-[472px] w-full">
                              {dateGroup.events.map((event, index) => {
                                return (
                                  <ol
                                    className="flex justify-between border border-stroke rounded-[30px] px-6 py-4"
                                    key={index}
                                  >
                                    <li className="flex gap-x-1 items-center">
                                      {event.card === "醫療紀錄" &&
                                      event.type === "醫療提醒" ? (
                                        <Image
                                          src="/test/icon-exclamation.svg"
                                          width={6}
                                          height={24}
                                          alt="exclamation mark"
                                        />
                                      ) : (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="6"
                                          height="6"
                                          viewBox="0 0 6 6"
                                          fill="none"
                                        >
                                          <circle
                                            cx="3"
                                            cy="3"
                                            r="3"
                                            fill={getIconColor(event.card)}
                                          />
                                        </svg>
                                      )}
                                      {event.type === "醫療提醒"
                                        ? event.reserve_type
                                        : event.card}
                                    </li>
                                    <IconChevronDown
                                      size={24}
                                      color={"#808080"}
                                      className="hover:cursor-pointer"
                                    />
                                  </ol>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    };
    return (
      <section className="flex flex-col max-w-[1088px] w-full">
        <div
          className="flex justify-end"
          tabIndex={0}
          onBlur={() => setIsExpanded(false)}
        >
          <EventFilter />
        </div>
        <div className="max-w-[660px] w-full mx-auto">
          <AgeCard />
        </div>
      </section>
    );
  };
  const NoContent = () => {
    return (
      <div className="flex flex-col items-center gap-y-4 pt-[64px]">
        <Image
          src="/icons/icon-paw-gradient.svg"
          width={162}
          height={162}
          alt="no content"
        />
        <div className="text-2xl">尚無內容</div>
      </div>
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
