import { useState } from "react";
import { IconChevronUp } from "@tabler/icons-react";

interface ToggleListPropsType {
  title: string;
  children?: React.ReactNode;
}
const ToggleList: React.FC<ToggleListPropsType> = ({ children, title }) => {
  const [isListOpen, setIsListOpen] = useState(true);

  return (
    <div className="pb-4 border-b flex flex-col gap-y-2">
      {/* 最外層加上標題與內容間的間距 */}
      <div className="flex items-center gap-2 text-note">
        {title}
        <button type="button" onClick={() => setIsListOpen(!isListOpen)}>
          <IconChevronUp
            size={24}
            stroke={2}
            className={`${!isListOpen && "rotate-180"} duration-100`}
          />
        </button>
      </div>
      <div className={`${!isListOpen && "hidden"}`}>{children}</div>
    </div>
  );
};

export default ToggleList;
