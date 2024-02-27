import {
  IconChevronLeft,
  IconMedal,
  IconMovie,
  IconPhoto,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";

import List from "../milestone/List";
import AccountList from "../petInfo/AccountList";
import Loading from "../hint/Loading";
import AlertCard from "../hint/AlertCard";
import Mask from "../hint/Mask";
import { mediaUpload } from "@/common/fetch/mediaManager";
import { fetchAddPost } from "@/common/fetch/post";

import { MediaType, RecordCardType } from "@/types/enums";
import type { RootState } from "@/common/redux/store";
import { fetchCheckAuth } from "@/common/fetch/auth";
import { AddPostType, CardUnionDataType } from "@/types";
import CardData from "./CardData";

interface UploadViewPropsType {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getList?: () => void;
  card?: CardUnionDataType;
  petId?: number;
}

const MAX_FILE_SIZE = 1024 * 1024 * 10;

const UploadView: React.FC<UploadViewPropsType> = ({
  setIsOpen,
  getList,
  card,
  petId,
}) => {
  const { token, userId } = useSelector((state: RootState) => state.userInfo);

  // 表單相關
  const [file, setFile] = useState<File>();
  const [postContent, setPostContent] = useState("");
  const [mediaType, setMediaType] = useState<MediaType>();
  const [preview, setPreview] = useState("");

  // 寵物相關
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [isMilestoneOpen, setIsMilestoneOpen] = useState(false);

  // 提示
  const [isLoading, setIsLoading] = useState(false);
  const [isYetHint, setIsYetHint] = useState(false);

  // 按鈕樣式
  const isBtnDisabled = !file || !postContent || !selectedPetId;
  const submitBtnStyle = isMilestoneOpen
    ? {
        backgroundColor: "white",
      }
    : {
        backgroundColor: isBtnDisabled ? "#808080" : "#203170",
      };

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    setFile(file);

    //  限制大小
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert("檔案不能超過 10MB");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      const fileType = file.type.split("/")[0];
      switch (fileType) {
        case "image":
          setMediaType(MediaType.image);
          break;
        case "video":
          setMediaType(MediaType.video);
          break;
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    // 上傳圖片影片
    try {
      const uploadResult = await mediaUpload(file!, "post");
      if (!uploadResult) {
        alert("上傳失敗，請稍後再試");
        return;
      }

      const mediaUrl = uploadResult.secure_url;
      const data: AddPostType = {
        postContent,
        mediaType: mediaType!,
        media: mediaUrl,
      };

      // 確認是否有卡片資料
      if (card) {
        switch (RecordCardType[card.card]) {
          case "日常紀錄":
            data.dailyRecordId = card.cardId;
            break;
          case "醫療紀錄":
            data.medicalRecordId = card.cardId;
            break;
          case "重要時刻":
            data.momentId = card.cardId;
            break;
        }
      }

      const response = await fetchAddPost(token, data, selectedPetId!);
      if (!response.ok) {
        alert("上傳失敗，請稍後再試");
      }
    } catch (error) {
      alert("上傳失敗，請稍後再試");
      console.error("Error uploading the file:", error);
    }

    setIsLoading(false);
    setIsOpen(false);
    getList && getList();
  };

  const handleClose = () => {
    if (file || postContent) {
      setIsYetHint(true);
      return;
    }
    setIsOpen(false);
  };

  return (
    <>
      {isYetHint && (
        <Mask setIsOpen={setIsYetHint}>
          <AlertCard
            cardType="yetPost"
            setIsDisplayed={setIsYetHint}
            setPostView={setIsOpen}
          />
        </Mask>
      )}
      <form
        onSubmit={handleSubmit}
        className="mx-8 p-8 max-w-[1041px] w-full rounded-[30px] bg-white"
      >
        {/* 新增貼文與關閉按鈕 */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">新增貼文</h2>
          <button type="button" onClick={handleClose}>
            <IconX size={40} stroke={1} />
          </button>
        </div>
        {/* 內容 */}
        <div className="flex mt-4 gap-8">
          <label className="relative flex-grow flex justify-center items-center gap-8 max-w-[476px] max-h-[476px] aspect-square border border-stroke rounded-[30px] overflow-hidden cursor-pointer">
            <input
              name="media"
              type="file"
              accept=".png, .jpg, .jpeg, .mp4, .mov"
              onChange={handleMediaChange}
              className="hidden"
            />
            <div className="flex items-center">
              <IconPhoto size={24} />
              <span className="ml-2 text-note">附上照片</span>
            </div>
            <div className="flex items-center">
              <IconMovie size={24} />
              <span className="ml-2 text-note">附上影片</span>
            </div>
            {/* 預覽 */}
            <div className="absolute w-full h-full">
              {mediaType === MediaType.image && (
                <Image
                  src={preview}
                  fill={true}
                  style={{ objectFit: "cover" }}
                  alt="preview"
                />
              )}
              {mediaType === MediaType.video && (
                <video
                  src={preview}
                  autoPlay={true}
                  controls={true}
                  loop={true}
                  muted={true}
                  className="absolute w-full h-full"
                ></video>
              )}
            </div>
          </label>
          <section className="relative flex-grow flex flex-col max-w-[469px]">
            {/* 文字輸入 */}
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="scrollbar-none flex-grow p-8 min-h-[150px] w-full border border-stroke outline-note rounded-[30px] resize-none"
            />
            {/* 卡片資料 */}
            {card && <CardData data={card} />}
            <div className="flex gap-8 mt-8">
              {/* 里程碑按鈕 */}
              {!card && (
                <button
                  type="button"
                  className="flex-grow border border-stroke rounded-[30px] text-center"
                  onClick={() => setIsMilestoneOpen(!isMilestoneOpen)}
                >
                  <IconMedal size={48} className="mx-auto" />
                  <span className="block mt-4 text-note">加上里程碑</span>
                </button>
              )}
              <div
                style={{
                  flexDirection: card ? "row" : "column",
                  maxWidth: card ? "none" : "250px",
                }}
                className={`flex-grow flex gap-8 max-w-[250px] w-full`}
              >
                {/* 寵物列表 */}
                <AccountList petId={petId} setId={setSelectedPetId} />
                {/* 送出 */}
                <button
                  type="submit"
                  disabled={isBtnDisabled}
                  style={submitBtnStyle}
                  className="py-3 w-full rounded-full  text-white text-xl font-bold"
                >
                  Pawk!
                </button>
              </div>
            </div>
            {/* 里程碑列表 */}
            {isMilestoneOpen && (
              <div className="absolute top-0 flex flex-col px-8 bg-white w-full h-full border border-stroke rounded-[30px]">
                <div className="flex items-center py-6">
                  <button
                    type="button"
                    className="absolute"
                    onClick={() => setIsMilestoneOpen(false)}
                  >
                    <IconChevronLeft stroke={1} size={40} />
                  </button>
                  <h3 className="w-full text-xl text-center">加上里程碑</h3>
                </div>
                <ul className="scrollbar-none pb-6 overflow-y-scroll">
                  <List />
                </ul>
              </div>
            )}
          </section>
        </div>
      </form>
      {isLoading && <Loading />}
    </>
  );
};

export default UploadView;
