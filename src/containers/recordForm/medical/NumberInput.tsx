import { forwardRef } from "react";

interface PropsType {
  title: string;
  name: string;
  placeholder: string;
  star?: boolean;
  onChange?: (value: number) => void;
}

const NumberInput: React.FC<PropsType> = forwardRef<
  HTMLInputElement,
  PropsType
>(({ title, name, placeholder, star, onChange }, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const num = value ? parseInt(value) : 0;
    onChange?.(num);
  };

  return (
    <div className="flex justify-between items-center">
      <span className="font-semibold">
        {title}
        {star && <span className="text-error">*</span>}
      </span>
      <div className="flex-grow flex items-center max-w-[248px]">
        <input
          ref={ref}
          type="number"
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          className="px-2 py-1 w-full border border-stroke outline-note rounded-[10px]"
        />
      </div>
    </div>
  );
});

NumberInput.displayName = "NumberInput";
export default NumberInput;
