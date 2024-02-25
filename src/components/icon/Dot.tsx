import { RecordCardType } from "@/types/enums";

const dotColor: Record<RecordCardType, string> = {
  [RecordCardType["日常紀錄"]]: "#969AFF",
  [RecordCardType["醫療紀錄"]]: "#FF6D80",
  [RecordCardType["重要時刻"]]: "#FFA959",
};

interface PropsType {
  name: RecordCardType;
  size: string;
}

const Dot: React.FC<PropsType> = ({ name, size }) => {
  if (size === "sm") {
    return (
      <span
        style={{ backgroundColor: dotColor[name] }}
        className="inline-block mr-1 w-[6px] h-[6px] rounded-full"
      ></span>
    );
  }
  return (
    <span
      style={{ backgroundColor: dotColor[name] }}
      className="inline-block mr-4 w-[11px] h-[11px] rounded-full"
    ></span>
  );
};

export default Dot;
