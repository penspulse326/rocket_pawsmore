import { useState } from "react";
import { IconX, IconCircleCheck } from "@tabler/icons-react";

interface AlertCardPropsType {
  setIsDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  handleUnFollow: (event: React.MouseEvent<HTMLButtonElement>) => void;
  cardType:
    | "unFollow"
    | "reportPost"
    | "reportUser"
    | "yetPost"
    | "yetSave"
    | "deletePost";
}

const AlertCard = ({
  cardType,
  setIsDisplayed,
  handleUnFollow,
}: AlertCardPropsType) => {
  const [isReported, setIsReported] = useState(false);
  interface ContentType {
    type: string;
    title: string;
    content: string;
    buttonText: string;
    onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  }

  function handleUnFollowAndClose() {
    handleUnFollow();
    setIsDisplayed(false);
  }

  const cardContent: ContentType[] = [
    {
      type: "unFollow",
      title: "要取消追蹤此帳號嗎？",
      content:
        "此帳號的貼文將不會再出現在您的動態消息，除非他們的貼文受到保護，否則你仍可以查看其個人資料。",
      buttonText: "取消追蹤",
      onClick: handleUnFollowAndClose,
    },
    {
      type: "reportPost",
      title: "檢舉",
      content: "確定要檢舉這篇貼文？",
      buttonText: "檢舉",
      onClick: () => setIsReported(true),
    },
    {
      type: "reportPet",
      title: "檢舉",
      content: "確定要檢舉此寵物檔案？",
      buttonText: "檢舉",
      onClick: () => setIsReported(true),
    },
    {
      type: "reportUser",
      title: "檢舉",
      content: "確定要檢舉此個人檔案？",
      buttonText: "檢舉",
      onClick: () => setIsReported(true),
    },
    {
      type: "yetPost",
      title: "貼文尚未新增完成",
      content: "確定要離開？",
      buttonText: "確定",
    },
    {
      type: "yetSave",
      title: "變更尚未儲存",
      content: "確定要離開？",
      buttonText: "確定",
    },
    {
      type: "deletePost",
      title: "刪除貼文",
      content: "確定要刪除？",
      buttonText: "確定",
    },
  ];
  const selectedCard = cardContent.find((item) => item.type === cardType);

  const ReportSucceed = () => {
    return (
      <ul className="flex flex-col gap-y-6 bg-white rounded-[30px] p-8 max-w-[288px]">
        <ol className="flex justify-between">
          <li className="font-bold">檢舉</li>
          <IconX
            size={24}
            className="hover:cursor-pointer"
            onClick={() => report()}
          />
        </ol>
        <ol className="flex flex-col gap-y-2 items-center">
          <IconCircleCheck size={48} color={"#203170"} />
          <li>已收到你的回饋</li>
          <li className="text-note text-center">
            你的意見回饋非常重要，能夠協助我們維護社群安全。
          </li>
        </ol>
        <button
          className="bg-primary text-white px-8 py-2 rounded-[30px] self-center"
          type="button"
          onClick={() => report()}
        >
          關閉
        </button>
      </ul>
    );
  };

  const report = () => {
    setIsReported(false);
    setIsDisplayed(false);
  };

  return (
    <>
      {selectedCard && !isReported && (
        <ul
          className={`flex flex-col gap-y-6 p-8  w-full bg-white rounded-[30px] ${
            selectedCard.type === "unFollow" ? "max-w-[320px]" : "max-w-[288px]"
          }`}
        >
          <ol className="flex justify-between items-center">
            <li className="font-bold">{selectedCard.title}</li>
            <IconX
              size={24}
              className="hover:cursor-pointer"
              onClick={() => setIsDisplayed(false)}
            />
          </ol>
          <li>{selectedCard.content}</li>
          <ol className="flex justify-between">
            {/* execute button */}
            <button
              className={`rounded-[300px] px-8 py-2 text-white ${
                selectedCard.type === "unFollow" ? "bg-primary" : "bg-error"
              }`}
              type="button"
              onClick={selectedCard.onClick}
            >
              {selectedCard.buttonText}
            </button>
            {/* cancel button */}
            <button
              className={` rounded-[300px] px-8 py-2 ${
                selectedCard.type === "unFollow"
                  ? "border border-stroke"
                  : "bg-note text-white"
              } `}
              onClick={() => setIsDisplayed(false)}
              type="button"
            >
              取消
            </button>
          </ol>
        </ul>
      )}
      {isReported && <ReportSucceed />}
    </>
  );
};

export default AlertCard;
