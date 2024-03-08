import { IconPhoto, IconMovie, IconMedal } from "@tabler/icons-react";
import { useState } from "react";

import Mask from "../../../components/hint/Mask";
import UploadView from "../../../components/post/UploadView";
import { useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import useToken from "@/common/hooks/useToken";

interface PropsType {
  getList: () => void;
}

const PawkBtn: React.FC<PropsType> = ({ getList }) => {
  const { token } = useToken();
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleClick = () => {
    if (!token) {
      alert("請先登入");
      return;
    }
    setIsUploadOpen(!isUploadOpen);
  };

  return (
    <section>
      {/* 貼文按鈕 */}
      <div
        className="px-8 pt-8 pb-6 border border-stroke rounded-[30px] cursor-pointer"
        onClick={handleClick}
      >
        {isUploadOpen && (
          <Mask maskType="upload" setIsOpen={setIsUploadOpen}>
            <UploadView setIsOpen={setIsUploadOpen} getList={getList} />
          </Mask>
        )}
        <div className="px-8 py-4 w-full border border-stroke rounded-[30px] outline-none text-note">
          在想些什麼呢？
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-8 text-note">
            <button type="button" className="flex items-center gap-2">
              <IconPhoto className="stroke-black" />
              附上照片
            </button>
            <button type="button" className="flex items-center gap-2">
              <IconMovie className="stroke-black" />
              附上影片
            </button>
            <button type="button" className="flex items-center gap-2">
              <IconMedal className="stroke-black" />
              附上里程碑
            </button>
          </div>
          <button
            type="button"
            className="px-8 py-2 rounded-[30px] bg-primary text-white font-bold"
          >
            Pawk!
          </button>
        </div>
      </div>
    </section>
  );
};

export default PawkBtn;
