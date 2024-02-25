import { RecordCardType } from "@/types/enums";

const dotColor: Record<number, string> = {
  0: "#969AFF",
  1: "#FF6D80",
  2: "#FFA959",
};

const dotSize: Record<string, string> = {
  sm: "block mr-1 w-[6px] h-[6px] rounded-full",
  lg: "block mr-4 w-[11px] h-[11px] rounded-full",
};

interface PropsType {
  name: number;
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
