import { FC } from "react";
import Image from "next/image";
import { IconX } from "@tabler/icons-react";

interface PropsType {
  title: string;
  isClosed: boolean;
  setIsClosed: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ListType {
  imgUrl: string;
  userName: string;
  userId: string;
}

const ShowNetworkListCard: FC<PropsType> = (props) => {
  const { title, isClosed, setIsClosed } = props;
  const networkList: ListType[] = [
    { imgUrl: "/test/photo-user-1.jpg", userName: "梅子", userId: "@may99883" },
    { imgUrl: "/test/photo-user-2.jpg", userName: "怡昕", userId: "@yisin___" },
    { imgUrl: "/test/photo-user-1.jpg", userName: "梅子", userId: "@may99883" },
    { imgUrl: "/test/photo-user-2.jpg", userName: "怡昕", userId: "@yisin___" },
    { imgUrl: "/test/photo-user-1.jpg", userName: "梅子", userId: "@may99883" },
    { imgUrl: "/test/photo-user-2.jpg", userName: "怡昕", userId: "@yisin___" },
    { imgUrl: "/test/photo-user-1.jpg", userName: "梅子", userId: "@may99883" },
    { imgUrl: "/test/photo-user-2.jpg", userName: "怡昕", userId: "@yisin___" },
  ];
  return (
    <section className="bg-black/50 fixed w-full h-full z-10 top-0 left-0 flex justify-center items-center">
      <div className="flex flex-col gap-y-5 max-w-[322px] w-full max-h-[427px] h-full bg-white border border-stroke rounded-[32px] p-8">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">{title}</div>
          <IconX
            size={24}
            color={"#808080"}
            className="hover:cursor-pointer"
            onClick={() => setIsClosed(!isClosed)}
          />
        </div>
        <ul className="flex flex-col gap-y-4 max-h-[304px] overflow-y-auto">
          {networkList.map((item, index) => {
            return (
              <li className="flex gap-x-4" key={`${index}-${item.userName}`}>
                <Image
                  className="rounded-[53.3px]"
                  src={item.imgUrl}
                  width={48}
                  height={48}
                  alt="close"
                />
                <ol>
                  <li>{item.userName}</li>
                  <li>{item.userId}</li>
                </ol>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ShowNetworkListCard;
