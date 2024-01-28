import Image from "next/image";

export default function Milestones() {
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
    <section className="flex flex-col gap-8">
      {milestoneDataset.map((item, index) => {
        return (
          <div
            className="flex border border-stroke rounded-[30px] p-4 w-full"
            key={index}
          >
            <div className="flex justify-center items-center">
              <Image
                src={item.icon}
                width={168}
                height={150}
                alt="milestone badge"
              />
            </div>
            <ul className="flex flex-col justify-center gap-y-1">
              <li>{item.title}</li>
              <li>{item.content}</li>
              <li className="text-xs text-note">{item.created_at}</li>
            </ul>
          </div>
        );
      })}
    </section>
  );
}
