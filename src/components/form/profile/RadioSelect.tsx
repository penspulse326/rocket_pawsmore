import { forwardRef, useState } from "react";
import ErrorMessage from "../../ErrorMessage";

interface RadioSelectPropsType {
  name: string;
  title: string;
  dataSet: { label: string; value: number }[];
  message?: string;
  onChange: (value: number) => void;
  onBlur: () => void;
  star?: boolean;
}

const RadioSelect = forwardRef<HTMLInputElement, RadioSelectPropsType>(
  ({ name, title, dataSet, message, onChange, onBlur, star }, ref) => {
    const [target, setTarget] = useState<number | null>(null);

    const selectedStyle = (value: number) => {
      return value === target
        ? {
            backgroundColor: "rgba(32, 49, 112, 1)",
            color: "white",
            border: "1px solid transparent",
            background: "#c5e5ff7f",
          }
        : {};
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      setTarget(value);
      onChange(value);
    };

    return (
      <div className="flex flex-col gap-1">
        <h4 className="flex justify-between items-center">
          <span>
            {title}
            {star && <span className="text-error">*</span>}
          </span>
          {message && <ErrorMessage>{message}</ErrorMessage>}
        </h4>
        <div className="flex gap-1">
          {dataSet.map(({ label, value }) => (
            <label
              key={value + label}
              style={selectedStyle(value)}
              className="flex justify-center items-center px-4 py-2 border border-stroke rounded-full cursor-pointer"
            >
              {label}
              <input
                type="radio"
                ref={ref}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={onBlur}
                className="hidden"
              />
            </label>
          ))}
        </div>
      </div>
    );
  }
);

RadioSelect.displayName = "RadioSelect";
export default RadioSelect;
