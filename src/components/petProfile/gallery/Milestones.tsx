import React, { useState } from "react";
import Image from "next/image";
import { IconChevronUp } from "@tabler/icons-react";

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
          <IconChevronUp
            size={24}
            className={`${
              !isExpanded && "rotate-180"
            } duration-300 hover:cursor-pointer`}
            onClick={() => setIsExpanded(!isExpanded)}
          />
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

export default Milestones;
