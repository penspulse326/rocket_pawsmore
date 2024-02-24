import { IconPhoto } from "@tabler/icons-react";
import Image from "next/image";
import React, { forwardRef, useEffect, useState } from "react";

import ErrorMessage from "@/components/ErrorMessage";

const MAX_FILE_SIZE = 1024 * 1024;

interface UploadPhotoPropsType {
  name: "headShot" | "petPhoto";
  title: string;
  message?: string;
  initialPhoto?: string;
  setError: () => void;
  clearErrors: () => void;
  onChange: (file: File) => void;
}

const UploadPhoto = forwardRef<HTMLInputElement, UploadPhotoPropsType>(
  (
    { name, title, message, initialPhoto, setError, clearErrors, onChange },
    ref
  ) => {
    const [preview, setPreview] = useState<string>(
      initialPhoto || "/images/default-photo.png"
    );

    useEffect(() => {
      return () => {
        preview && URL.revokeObjectURL(preview);
      };
    }, [preview]);

    useEffect(() => {
      if (initialPhoto) {
        setPreview(initialPhoto);
      }
    }, [initialPhoto]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";

      //  限制圖片預覽大小
      if (file) {
        if (file.size > MAX_FILE_SIZE) {
          setError();
        } else {
          clearErrors();
          const previewUrl = URL.createObjectURL(file);
          setPreview(previewUrl);
          onChange(file);
        }
      }
    };

    return (
      <div>
        <h4>{title}</h4>
        <label className="flex flex-col items-center gap-4 mt-4 cursor-pointer">
          <div className="mx-12 w-[172px] h-[172px] rounded-full overflow-hidden">
            <Image
              src={preview}
              alt="member-photo"
              priority={false}
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="file"
            accept=".png, .jpeg, .jpg"
            onChange={handleImageChange}
            ref={ref}
            name={name}
            className="hidden"
          />
          <span className="flex items-center gap-2 text-primary">
            <IconPhoto className="stroke-primary" />
            上傳照片
          </span>
          <ErrorMessage>{message}</ErrorMessage>
        </label>
      </div>
    );
  }
);

UploadPhoto.displayName = "UploadPhoto";
export default UploadPhoto;
