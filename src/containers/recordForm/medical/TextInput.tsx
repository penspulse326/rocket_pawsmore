import { forwardRef } from "react";

interface PropsType {
  title: string;
  name: string;
  placeholder: string;
  star?: boolean;
  isMoney?: boolean;
  isArea?: boolean;
  onChange?: () => void;
}

const TextInput: React.FC<PropsType> = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  PropsType
>(({ title, name, placeholder, star, isMoney, isArea, onChange }, ref) => {
  return (
    <div className="flex justify-between items-center">
      <span className={`${isArea && "self-start mt-1"} font-semibold`}>
        {title}
        {star && <span className="text-error">*</span>}
      </span>
      <div className="flex-grow flex items-center max-w-[248px]">
        {isArea ? (
          <textarea
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            className="px-2 py-1 w-full h-8 border border-stroke outline-note rounded-[10px]"
          />
        ) : (
          <>
            {isMoney && <span className="mr-2">NTD</span>}
            <input
              type={isMoney ? "number" : "text"}
              name={name}
              placeholder={placeholder}
              onChange={onChange}
              className="px-2 py-1 w-full border border-stroke outline-note rounded-[10px]"
            />
          </>
        )}
      </div>
    </div>
  );
});

TextInput.displayName = "TextInput";
export default TextInput;
