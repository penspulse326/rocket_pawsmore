import {
  IconChevronDown,
  IconChevronLeft,
  IconMedal,
  IconMovie,
  IconPhoto,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import List from "../milestone/List";
import { MediaType } from "@/common/lib/enums";

interface UploadViewPropsType {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MAX_FILE_SIZE = 1024 * 1024 * 10;

const UploadView: React.FC<UploadViewPropsType> = ({ setIsOpen }) => {
  const [isMilestoneOpen, setIsMilestoneOpen] = useState(false);
  const [mediaType, setMediaType] = useState<MediaType>(0);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    return () => {
      preview && URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    //  限制圖片預覽大小
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert("檔案大小超過 1MB");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      const fileType = file.type;
      if (fileType.startsWith("image/")) {
        setMediaType(MediaType.image);
      } else if (fileType.startsWith("video/")) {
        setMediaType(MediaType.video);
      }
    }
  };

  return (
    <form className="grid grid-cols-10 gap-x-8 gap-y-4 p-8 max-w-[1041px] rounded-[30px] bg-white">
      {/* 新增貼文與關閉按鈕 */}
      <div className="col-span-10 flex justify-between items-center">
        <h2 className="text-2xl font-bold">新增貼文</h2>
        <button type="button" onClick={() => setIsOpen(false)}>
          <IconX size={40} stroke={1} />
        </button>
      </div>
      {/* 上傳圖片或影片 */}
      <label className="col-span-5 flex justify-center items-center gap-8 w-[476px] border border-stroke rounded-[30px] overflow-hidden cursor-pointer">
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
      </label>
      <section className="relative col-span-5">
        {/* 文字輸入 */}
        <textarea className="scrollbar-none p-8 w-full h-[259px] border border-stroke outline-note rounded-[30px] resize-none" />
        <div className="flex gap-8 mt-8">
          <button
            type="button"
            className="flex-grow border border-stroke rounded-[30px] text-center"
            onClick={() => setIsMilestoneOpen(!isMilestoneOpen)}
          >
            <IconMedal size={48} className="mx-auto" />
            <span className="block mt-4 text-note">加上里程碑</span>
          </button>
          <div className="flex flex-col gap-8">
            <button
              type="button"
              className="flex items-center gap-2 p-2 border border-stroke rounded-full"
            >
              <Image
                src="/test/photo-cat-test.png"
                width={48}
                height={48}
                alt="角龍寶寶"
                className="rounded-full"
              />
              <div className="text-left">
                <p className="font-bold">角龍寶寶</p>
                <p className="text-note">@littleprincess126</p>
              </div>
              <IconChevronDown size={24} className="mr-3" />
            </button>
            {/* 送出 */}
            <button
              type="submit"
              className={`${
                isMilestoneOpen ? "bg-white" : "bg-primary"
              } py-3 w-full rounded-full  text-white text-xl font-bold`}
            >
              Pawk!
            </button>
          </div>
        </div>
        {/* 里程碑列表 */}
        {isMilestoneOpen && (
          <div className="absolute flex flex-col px-8 bg-white w-full h-full border border-stroke rounded-[30px]">
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
    </form>
  );
};

export default UploadView;
