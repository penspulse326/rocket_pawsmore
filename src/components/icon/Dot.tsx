import { RecordCardType } from "@/types/enums";

const dotColor: Record<RecordCardType, string> = {
  [RecordCardType["日常紀錄"]]: "#969AFF",
  [RecordCardType["醫療紀錄"]]: "#FF6D80",
  [RecordCardType["重要時刻"]]: "#FFA959",
};

const dotSize: Record<string, string> = {
  sm: "mr-1 w-[6px] h-[6px] rounded-full",
  lg: "mr-4 w-[11px] h-[11px] rounded-full",
};

interface PropsType {
  name: RecordCardType;
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
