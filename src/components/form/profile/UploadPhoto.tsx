import React, { forwardRef, useEffect, useState } from "react";

import ErrorMessage from "@/components/ErrorMessage";
import { IconPhoto } from "@tabler/icons-react";
import Image from "next/image";

interface UploadPhotoPropsType {
  name: string;
  title: string;
  message?: string;
  onChange?: () => void;
  onBlur?: () => void;
}

const UploadPhoto = forwardRef<HTMLInputElement, UploadPhotoPropsType>(
  ({ name, title, message, onChange, onBlur }, ref) => {
    const [preview, setPreview] = useState<string>("/images/default-photo.png");

    useEffect(() => {
      return () => {
        preview && URL.revokeObjectURL(preview);
      };
    }, [preview]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
      }

      if (onChange) {
        onChange();
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
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="file"
            accept=".png, .jpeg, .jpg"
            onChange={handleImageChange}
            onBlur={onBlur}
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
