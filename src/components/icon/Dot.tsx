const dotColor: Record<string, string> = {
  日常紀錄: "#969AFF",
  醫療紀錄: "#FF6D80",
  重要時刻: "#FFA959",
};

const dotSize: Record<string, string> = {
  sm: "mr-1 w-[6px] h-[6px] rounded-full",
  lg: "mr-4 w-4 h-4 rounded-full",
};

interface PropsType {
  name: string;
  size: string;
}

const Dot: React.FC<PropsType> = ({ name, size }) => {
  return (
    <span
      style={{ backgroundColor: dotColor[name] }}
      className={`${dotSize[size]}`}
    ></span>
  );
};

export default Dot;
