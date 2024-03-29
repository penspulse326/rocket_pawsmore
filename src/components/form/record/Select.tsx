import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";

interface OptionType {
  label: string;
  value: any;
}

interface SelectProps {
  title: string;
  name?: string;
  options: OptionType[];
  onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  title,
  name,
  options,
  onChange: handleChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState({ label: title, value: "" });

  const handleSelectChange = ({ label, value }: OptionType) => {
    setSelected({ label, value });
    handleChange && handleChange(value);
    setIsOpen(false);
  };

  const handleBlur = (e: React.FocusEvent) => {
    e.stopPropagation();
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <div className="relative">
      {/* 選單容器 標題與 Icon */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={handleBlur}
        className="form-input flex items-center gap-1"
      >
        <span className="flex-grow">{selected.label || title}</span>
        <IconChevronDown
          size={20}
          className={`${isOpen && "-rotate-180"} duration-100`}
        />
      </button>
      {/* 選項列表 */}
      <ul
        style={{ visibility: isOpen ? "visible" : "hidden" }}
        className="shadow-custom absolute z-50 m-1 p-2 rounded-[10px] bg-white"
      >
        {options.map(({ label, value }: OptionType) => (
          <li
            key={label}
            onClick={() => handleSelectChange({ label, value })}
            style={{ background: value === selected ? "#C5E5FF" : "white" }}
            className="px-2 py-1 rounded-[10px] cursor-pointer hover:bg-secondary"
          >
            {label}
          </li>
        ))}
      </ul>
      <input type="hidden" name={name} value={selected.value} />
    </div>
  );
};

export default Select;
