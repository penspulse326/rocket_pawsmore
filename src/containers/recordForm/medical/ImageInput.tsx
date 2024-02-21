import ErrorMessage from "@/components/ErrorMessage";
import { IconPhoto } from "@tabler/icons-react";
import Image from "next/image";
import { forwardRef, useEffect, useState } from "react";

interface PropsType {
  message?: string;
  setError: () => void;
  onChange: (file: File | null) => void;
}

const MAX_FILE_SIZE = 1024 * 1024 * 2;

const ImageInput = forwardRef<HTMLInputElement, PropsType>(
  ({ message, setError, onChange: handleChange }, ref) => {
    const [preview, setPreview] = useState<string>("");

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";

      //  限制圖片預覽大小
      if (file) {
        if (file.size > MAX_FILE_SIZE) {
          setError();
        } else {
          const previewUrl = URL.createObjectURL(file);
          setPreview(previewUrl);
          handleChange(file);
        }
      }
    };

    const handleRemoveImage = () => {
      setPreview("");
      handleChange(null);
    };

    useEffect(() => {
      return () => {
        preview && URL.revokeObjectURL(preview);
      };
    }, [preview]);

    return (
      <div className="flex justify-between">
        <span className="font-semibold">紀錄照片</span>
        <label
          className={`${
            preview && "hidden"
          } flex flex-col gap-2 max-w-[248px] w-full cursor-pointer`}
        >
          <div className="flex items-center gap-2">
            <IconPhoto />
            <span className="text-note"> 附上照片</span>
          </div>
          {message && <ErrorMessage>{message}</ErrorMessage>}
          <input
            ref={ref}
            type="file"
            name="photo"
            accept=".png, .jpg, .jpeg"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        {preview && (
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
              onClick={handleRemoveImage}
              className="text-note"
            >
              刪除照片
            </button>
          </div>
        )}
      </div>
    );
  }
);

ImageInput.displayName = "ImageInput";
export default ImageInput;
