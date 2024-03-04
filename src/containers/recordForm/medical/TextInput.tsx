import { forwardRef } from "react";

interface PropsType {
  title: string;
  name: string;
  placeholder: string;
  star?: boolean;
  onChange?: () => void;
}

const TextInput: React.FC<PropsType> = forwardRef<HTMLInputElement, PropsType>(
  ({ title, name, placeholder, star, onChange }, ref) => {
    return (
      <div className="flex justify-between items-center">
        <span className="font-semibold">
          {title}
          {star && <span className="text-error">*</span>}
        </span>
        <div className="flex-grow flex items-center max-w-[248px]">
          <input
            ref={ref}
            type="text"
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            className="px-2 py-1 w-full border border-stroke outline-note rounded-[10px]"
          />
        </div>
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
export default TextInput;
