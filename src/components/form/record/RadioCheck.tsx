interface RadioCheckPropsType {
  text: string;
  name: string;
  checked: boolean;
  onChange: () => void;
}

const RadioCheck: React.FC<RadioCheckPropsType> = ({
  name,
  text,
  checked,
  onChange: handleChange,
}) => {
  const radioStyle = {
    border: checked ? "4px solid #203170" : "2px solid #EAEAEA",
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div style={radioStyle} className="w-4 h-4 rounded-full bg-white">
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={handleChange}
          className="hidden"
        />
      </div>
      <span>{text}</span>
    </label>
  );
};
export default RadioCheck;
