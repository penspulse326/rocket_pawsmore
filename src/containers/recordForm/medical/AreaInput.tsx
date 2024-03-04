import { forwardRef } from "react";

interface PropsType {
  title: string;
  name: string;
  placeholder: string;
  star?: boolean;
  onChange?: () => void;
}

const AreaInput: React.FC<PropsType> = forwardRef<
  HTMLTextAreaElement,
  PropsType
>(({ title, name, placeholder, star, onChange }, ref) => {
  return (
    <div className="flex justify-between items-center">
      <span className="self-start mt-1font-semibold">
        {title}
        {star && <span className="text-error">*</span>}
      </span>
      <div className="flex-grow flex items-center max-w-[248px]">
        <textarea
          ref={ref}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          className="px-2 py-1 w-full h-8 border border-stroke outline-note rounded-[10px]"
        />
      </div>
    </div>
  );
});

AreaInput.displayName = "AreaInput";
export default AreaInput;
