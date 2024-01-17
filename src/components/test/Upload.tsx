import { useState } from "react";
import { mediaDelete, mediaUpload } from "@/common/helpers/mediaManager";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [assestData, setAssetData] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files) setFile(files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      // 設定預覽
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setPreview(reader.result);

      try {
        const response = await mediaUpload(file);
        setAssetData(response);
      } catch (error) {
        console.error("Error uploading the file:", error);
      }
    }
  };

  const handleDelete = async () => {
    if (assestData) {
      try {
        const response = await mediaDelete(
          assestData.public_id,
          assestData.resource_type
        );
        console.log(response);
        setAssetData(null);
      } catch (error) {
        console.error("Error deleting the file:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <div>
        <input
          type="file"
          className="p-2 bg-white"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={handleUpload} className="p-2 bg-white">
          上傳圖片
        </button>
        <button type="button" onClick={handleDelete} className="p-2 bg-white">
          刪除圖片
        </button>
      </div>
      <div>
        預覽圖片：
        {preview && <img src={preview} alt="preview" />}
      </div>
      回傳圖片：
      {assestData &&
        (assestData.resource_type === "image" ? (
          <img src={assestData.secure_url} alt="圖片" />
        ) : (
          <video controls autoPlay={true}>
            <source src={assestData.secure_url} type="video/mp4"></source>
          </video>
        ))}
    </div>
  );
}
