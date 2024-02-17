import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { IconX } from "@tabler/icons-react";

import { UserListDataType } from "@/types";
import handleFreezeScroll from "@/common/helpers/handleFreezeScroll";

interface PropsType {
  type: "following" | "follower";
  userList: UserListDataType[];
  isClosed: boolean;
  setIsClosed: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CardContentDataType {
  type: string;
  TITLE: string;
  CONTENT: string;
}

const NetworkList: React.FC<PropsType> = (props) => {
  const { type, userList, isClosed, setIsClosed } = props;
  const router = useRouter();

  const cardContent: CardContentDataType[] = [
    {
      type: "follower",
      TITLE: "粉絲",
      CONTENT: "尚無粉絲",
    },
    {
      type: "following",
      TITLE: "追蹤中",
      CONTENT: "尚無追蹤",
    },
  ];

  const selectedCard = cardContent.find((item) => item.type === type);

  const handleCheckUser = (account: string) => {
    (type === "follower" && router.push(`/member/${account}`)) ||
      router.push(`/pet/${account}`);
  };

  const handleCloseCard = () => {
    setIsClosed(!isClosed);
    handleFreezeScroll(false);
  };

  return (
    <div className="flex flex-col gap-y-6 max-w-[322px] w-full max-h-[427px] h-full bg-white border border-stroke rounded-[32px] p-8">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">{selectedCard?.TITLE}</div>
        <IconX
          size={24}
          color={"#808080"}
          className="hover:cursor-pointer"
          onClick={handleCloseCard}
        />
      </div>
      <ul className="flex flex-col gap-y-4 max-h-[304px] h-full overflow-y-auto">
        {userList.length > 0 ? (
          userList.map((user, index) => {
            const { name, account, photo } = user;
            return (
              <li
                className="flex gap-x-4 hover:cursor-pointer"
                onClick={() => handleCheckUser(account)}
                key={index}
              >
                <div className="w-12 h-12">
                  <Image
                    className="w-full h-full rounded-[53.3px] object-cover"
                    src={photo || "/images/default-photo.svg"}
                    width={48}
                    height={48}
                    alt="avatar photo"
                  />
                </div>
                <ol>
                  <li>{name}</li>
                  <li>@{account}</li>
                </ol>
              </li>
            );
          })
        ) : (
          <div className="flex flex-col gap-y-4 items-center h-full">
            <Image
              src="/icons/icon-paw-gradient.svg"
              width={162}
              height={162}
              alt="no followers"
            />
            <span className="text-lg">{selectedCard?.CONTENT}</span>
          </div>
        )}
      </ul>
    </div>
  );
};

export default NetworkList;
