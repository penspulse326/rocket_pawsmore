import Image from "next/image";
import React, { forwardRef, useEffect, useState } from "react";
import { IconPhoto } from "@tabler/icons-react";
import { UseFormClearErrors, UseFormSetError } from "react-hook-form";

import ErrorMessage from "@/components/ErrorMessage";

import type { MemberFormType } from "@/types";

const MAX_FILE_SIZE = 1024 * 1024;

interface UploadPhotoPropsType {
  name: string;
  title: string;
  message?: string;
  setError: UseFormSetError<MemberFormType>;
  clearErrors: UseFormClearErrors<MemberFormType>;
  onChange?: (file: File) => void;
}

const UploadPhoto = forwardRef<HTMLInputElement, UploadPhotoPropsType>(
  ({ name, title, message, setError, clearErrors, onChange }, ref) => {
    const [preview, setPreview] = useState<string>("/images/default-photo.png");

    useEffect(() => {
      return () => {
        preview && URL.revokeObjectURL(preview);
      };
    }, [preview]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      //  限制圖片預覽大小
      if (file) {
        if (file && file.size > MAX_FILE_SIZE) {
          setError("headShot", {
            message: "圖片大小不能超過 1MB",
          });
        } else {
          clearErrors("headShot");
          const previewUrl = URL.createObjectURL(file);
          setPreview(previewUrl);
          onChange && onChange(file);
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
