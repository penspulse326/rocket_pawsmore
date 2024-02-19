interface PropsType {
  title: string;
  name: string;
  star?: boolean;
  isMoney?: boolean;
  onChange?: () => void;
}

const TextInput: React.FC<PropsType> = ({
  title,
  name,
  star,
  isMoney,
  onChange: handleChange,
}) => {
  return (
    <div className="flex justify-between items-center">
      <span className="font-semibold">
        {title}
        {star && <span className="text-error">*</span>}
      </span>
      <div className="flex items-center">
        {isMoney && <span className="mr-2">NTD</span>}
        <input
          type="text"
          name={name}
          onChange={handleChange}
          className="px-2 py-1 max-w-[248px] w-full border border-stroke outline-note rounded-[10px]"
        />
      </div>
    </div>
  );
};

export default TextInput;
