import { IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";

interface ToggleGroupPropsType {
  title: string;
  children?: React.ReactNode;
}

const ToggleGroup: React.FC<ToggleGroupPropsType> = ({ children, title }) => {
  const [isListOpen, setIsListOpen] = useState(true);

  return (
    <div className="pb-4 border-b">
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

export default ToggleGroup;
