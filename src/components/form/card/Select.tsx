import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";

interface OptionType {
  label: string;
  value: string;
}

interface SelectProps {
  title: string;
  options: OptionType[];
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  title,
  options,
  onChange: handleChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSelectChange = (selectedValue: string) => {
    setSelected(() => selectedValue);
    handleChange(selectedValue);
    setIsOpen(false);
  };

  const handleBlur = (e: React.FocusEvent) => {
    e.stopPropagation();
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const getBgColor = (value: string) => {
    switch (value) {
      case "行為表現":
        return "#F9E6FF";
      case "驚喜":
        return "#FFF5CF";
      case "生活習慣":
        return "#FFE9EC";
      case "社交":
        return "#D5F0FF";
      case "技能":
        return "#E0FFDF";
      default:
        return "#C5E5FF";
    }
  };

  return (
    <div className="relative">
      {/* 選單容器 標題與 Icon */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={handleBlur}
        className="form-input flex items-center gap-1 w-full text-left"
      >
        <span className="flex-grow">{selected || title}</span>
        <IconChevronDown
          size={20}
          className={`${isOpen && "-rotate-180"} duration-100`}
        />
      </button>
      {/* 選項列表 */}
      <ul
        style={{ visibility: isOpen ? "visible" : "hidden" }}
        className="shadow-custom absolute -left-1 z-10 m-1 p-2 rounded-[10px] bg-white w-full"
      >
        {options.map(({ label, value }: OptionType) => {
          const isMoment = [
            "行為表現",
            "生活習慣",
            "技能",
            "社交",
            "驚喜",
          ].includes(label);

          return (
            <li
              key={label}
              onClick={() => handleSelectChange(value)}
              style={{
                background: value === selected ? getBgColor(label) : "white",
              }}
              className={`px-2 py-1 ${
                isMoment ? "rounded-[30px]" : "rounded-[10px]"
              } cursor-pointer hover:bg-secondary w-full`}
            >
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
