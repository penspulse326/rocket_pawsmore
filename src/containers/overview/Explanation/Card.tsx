import { UrineType } from "@/types/enums";

const data = {
  sick: {
    name: "尿液",
    type: UrineType[UrineType.紅色或粉紅色],
    reason: "感染、結石、膀胱炎、前列腺炎等導致。",
  },
};

const Card: React.FC = () => {
  return (
    <li className="flex flex-col gap-4 px-6 py-4 border border-stroke rounded-[30px]">
      <div>
        <span className="inline-block px-3 py-1 bg-primary text-white rounded-[30px]">
          異常狀況
        </span>
        <div className="flex gap-2 mt-1">
          <span>{data.sick.name}</span>
          <span>{data.sick.type}</span>
        </div>
      </div>
      <div>
        <span className="inline-block px-3 py-1 text-primary border border-primary rounded-[30px]">
          可能原因
        </span>
        <div className="flex gap-2 mt-1">
          <span>{data.sick.reason}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;
