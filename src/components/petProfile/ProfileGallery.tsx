import Image from "next/image";
import * as Icons from "@tabler/icons-react";

const ProfileGallery = () => {
  const GalleryTabs = () => {
    return (
      <section className="flex justify-center">
        <div className="flex justify-center items-center gap-x-1 w-[132px] border-t-4 border-primary py-8">
          <div className="h-1 bg-gradient-to-r from-[#7CCBFF] via-[#7CCBFF] to-[#0057FF]"></div>
          <Icons.IconLayoutGrid size={16} />
          <div className="font-bold">貼文</div>
        </div>
        <div className="flex justify-center items-center gap-x-1 w-[132px]">
          <Icons.IconMedal size={16} color={"#808080"} />
          <div className="text-note font-normal">里程碑</div>
        </div>
        <div className="flex justify-center items-center gap-x-1 w-[132px]">
          <Icons.IconPinned size={16} color={"#808080"} />
          <div className="text-note font-normal">回顧</div>
        </div>
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
    const milestoneDataset = [
      {
        icon: "/images/milestone_1.svg",
        title: "破壞王",
        description: "累積5次咬爛物品",
        date: "2024/1/8",
      },
      {
        icon: "/images/milestone_2.svg",
        title: "小試身手？",
        description: "第一次咬爛物品",
        date: "2023/11/23",
      },
      {
        icon: "/images/milestone_3.svg",
        title: "我是勇者！",
        description: "第一次打針",
        date: "2023/11/1",
      },
    ];

    return (
      <section className="w-full">
        {/* gotten */}
        <div className="flex gap-x-4">
          {milestoneDataset.map((item, index) => {
            return (
              <div
                className="flex gap-x-8 border border-stroke rounded-[30px] pl-[26px] pr-[56px] py-8"
                key={index}
              >
                <Image
                  src={item.icon}
                  width={115}
                  height={90}
                  alt="milestone badge"
                />
                <ul className="flex flex-col justify-center gap-y-1 font-normal">
                  <li className="text-2xl">{item.title}</li>
                  <li>{item.description}</li>
                  <li className="text-xs text-note">{item.date}</li>
                </ul>
              </div>
            );
          })}
        </div>
        {/* yet */}
      </section>
    );
  };
  return (
    <section className="border-t max-w-[1088px]">
      <GalleryTabs />
      <Posts />
      {/* <Milestones /> */}
    </section>
  );
};

export default ProfileGallery;
