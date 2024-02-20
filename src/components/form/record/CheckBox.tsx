import { IconCheck } from "@tabler/icons-react";

const CheckBox: React.FC<{
  name: string;
  text: string;
  checked: boolean;
  onChange: (name: string, value: boolean) => void;
}> = ({ name, text, checked, onChange: handleMultiChange }) => {
  const checkedStyle = { border: "0px", background: "#203170" };
  const normalStyle = { border: "2px solid #DEE2E6", background: "white" };
  const renderStyle = checked ? checkedStyle : normalStyle;

  return (
    <label key={name} className="flex items-center ">
      <div
        style={renderStyle}
        className="flex items-center justify-center mr-1 w-4 h-4 rounded-sm"
      >
        {checked && <IconCheck size={16} color={"white"} stroke={4} />}
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => handleMultiChange(name, e.currentTarget.checked)}
          className="hidden"
        />
      </div>

      {text}
    </label>
  );
};
export default CheckBox;
