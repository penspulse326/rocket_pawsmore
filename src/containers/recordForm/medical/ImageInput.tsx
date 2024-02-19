import { IconPhoto } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

const MAX_FILE_SIZE = 1024 * 1024;

const ImageInput: React.FC = () => {
  const [preview, setPreview] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    //  限制圖片預覽大小
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
      } else {
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
      }
    }
  };

  return (
    <div className="flex justify-between">
      <span className="font-semibold">紀錄照片</span>
      {!preview ? (
        <label className="flex items-center gap-2 max-w-[248px] w-full cursor-pointer">
          <IconPhoto />
          <span className="text-note">附上照片</span>
          <input
            type="file"
            name="photo"
            accept=".png, .jpg, .jpeg"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="flex flex-col items-end max-w-[248px] w-full">
          <div className="relative self-start max-h-[186px] w-full h-[186px] rounded-[10px] overflow-hidden">
            <Image
              src={preview}
              alt="preview"
              priority={false}
              fill={true}
              sizes="100%"
              className="w-auto h-auto object-cover"
            />
          </div>
          <button
            type="button"
            onClick={() => setPreview("")}
            className="text-note"
          >
            刪除照片
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
