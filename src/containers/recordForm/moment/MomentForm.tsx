import { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IconPhoto } from "@tabler/icons-react";
import Image from "next/image";

import Loading from "@/components/hint/Loading";
import Select from "@/components/form/record/Select";

import { mediaUpload } from "@/common/fetch/mediaManager";
import { fetchAddMomentCard } from "@/common/fetch/recordCard";

import type { RootState } from "@/common/redux/store";
import { momentCategory } from "@/common/lib/formText";
import { PetIdContext, DateContext } from "@/pages/record_dashboard";
import {
  behaviorOptions,
  habitOptions,
  surpriseOptions,
  socialOptions,
} from "@/common/lib/formText";

import { MomentCategoryType, MomentIdType } from "@/types/enums";
import { MomentDataType } from "@/types";

const MAX_FILE_SIZE = 1024 * 1024 * 2;

interface MomentFormStateType {
  momentType: MomentCategoryType | null;
  momentId: MomentIdType | null;
  momentDetails: string;
  desc: string;
  photo: File | string | null;
  targetDate: string;
}

const initialState: MomentFormStateType = {
  momentType: null,
  momentId: null,
  momentDetails: "",
  desc: "",
  photo: null,
  targetDate: "",
};

interface PropsType {
  onClose: () => void;
}

const MomentForm: React.FC<PropsType> = ({ onClose: handleClose }) => {
  const { selectedDate } = useContext(DateContext);
  const { petId } = useContext(PetIdContext);
  const { token } = useSelector((state: RootState) => state.userInfo);

  const [formState, setFormState] = useState<MomentFormStateType>({
    ...initialState,
    targetDate: selectedDate,
  });

  const [filteredContent, setFilteredContent] = useState([
    { label: "選擇重要時刻內容", value: "選擇重要時刻內容" },
  ]);
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 事件分類 momentType
  const handleCategoryChange = (category: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [category]: MomentCategoryType[value as any],
    }));
  };

  // 內容(id) momentId
  const handleContentIdChange = (contentId: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [contentId]: MomentIdType[value as any],
    }));
  };

  // 內容(只存技能字串) momentDetails
  const handleContentChange = (content: string, value: string) => {
    setFormState((prev) => ({ ...prev, [content]: value }));
  };

  // 事件描述 desc
  const handleDescChange = (desc: string, value: string) => {
    setFormState((prev) => ({ ...prev, [desc]: value }));
  };

  // 上傳照片
  const handlePhotoChange = (photo: string, value: string) => {
    setFormState((prev) => ({ ...prev, [photo]: value }));
  };

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    setFile(file);

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert("檔案不能超過 2MB");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleUploadImg = async () => {
    if (file) {
      setIsLoading(true);
      try {
        const uploadResult = await mediaUpload(file, "moment");
        formState.photo = uploadResult.secure_url;
        setIsLoading(false);
      } catch (error) {
        alert("上傳圖片失敗，請稍後再試");
        console.error("Error uploading the file:", error);
        return;
      }
    }
  };

  const handleAddCard = async () => {
    // try {
    //   const response = await fetchAddMomentCard(token, petId!, formState);
    //   if (!response.ok) {
    //     alert("新增失敗，請稍後再試");
    //     return;
    //   }
    //   alert("新增成功");
    //   handleClose();
    // } catch (error) {
    //   alert("新增失敗，請稍後再試");
    //   console.error("Error adding moment card:", error);
    // }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (file) await handleUploadImg();
    await handleAddCard();
  };

  useEffect(() => {
    const eventContent = (category: number) => {
      setFilteredContent(() => {
        switch (MomentCategoryType[category]) {
          case "驚喜":
            return surpriseOptions;
          case "行為表現":
            return behaviorOptions;
          case "生活習慣":
            return habitOptions;
          case "社交":
            return socialOptions;
          default:
            return [{ label: "選擇重要時刻內容", value: "選擇重要時刻內容" }];
        }
      });
    };
    // eventContent(formState.momentType);
  }, [formState.momentType]);

  useEffect(() => {
    return () => {
      preview && URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <>
      {isLoading && <Loading />}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          {/* event category */}
          <div className="flex items-center gap-x-12">
            <div className="font-semibold min-w-[72px]">
              事件分類<span className="text-error font-semibold">*</span>
            </div>
            <div className="min-w-[104px]">
              <Select
                title="事件分類"
                options={momentCategory}
                onChange={(e) => {
                  handleCategoryChange("momentType", e);
                }}
              />
            </div>
          </div>
          {/* event content */}
          <div className="flex items-center gap-x-12">
            <div className="font-semibold min-w-[72px]">
              內容<span className="text-error font-semibold">*</span>
            </div>
            {formState.momentType === 2 ? (
              <input
                type="text"
                className="px-2 py-1 border border-stroke rounded-[10px] w-full"
                placeholder="自填"
                onChange={(e) => {
                  handleContentChange("momentDetails", e.target.value);
                  handleContentIdChange("momentId", "25");
                }}
              />
            ) : (
              <div className="min-w-[168px]">
                <Select
                  title="選擇重要時刻內容"
                  options={filteredContent}
                  onChange={(e) => {
                    handleContentChange("momentDetails", "");
                    handleContentIdChange("momentId", e);
                  }}
                />
              </div>
            )}
          </div>
          {/* photo */}
          <div className="flex items-center gap-x-12">
            <div className="font-semibold min-w-[72px] self-start">
              紀錄照片
            </div>
            {preview ? (
              <div className="flex flex-col gap-y-2">
                <div className="w-[248px] h-[186px]">
                  <Image
                    src={preview}
                    width={248}
                    height={186}
                    alt="preview"
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                </div>
                <div
                  className="text-note hover:cursor-pointer text-right"
                  onClick={() => {
                    setPreview(null);
                    handlePhotoChange("photo", "");
                    setFile(undefined);
                  }}
                >
                  刪除照片
                </div>
              </div>
            ) : (
              <label
                htmlFor="media"
                className="flex gap-x-2 hover:cursor-pointer"
              >
                <span className="text-note">附上照片</span>
                <IconPhoto size={24} />
                <input
                  id="media"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleMediaChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          {/* description */}
          <div className="flex items-center gap-x-12">
            <div className="font-semibold min-w-[72px] self-start">
              事件描述
            </div>
            <textarea
              name="remark"
              value={formState.desc}
              onChange={(e) => handleDescChange("desc", e.target.value)}
              placeholder="詳細描述這個重要時刻，紀錄你與寵物獨特的難忘體驗。"
              className="px-4 py-3 h-[120px] border border-stroke rounded-[10px] max-w-[248px] w-full resize-none"
              maxLength={150}
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="py-2 rounded-full bg-primary text-white"
        >
          儲存
        </button>
      </form>
    </>
  );
};

export default MomentForm;
