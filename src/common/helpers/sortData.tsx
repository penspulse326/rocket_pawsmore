import { originalData, DataType } from "../lib/test/eventData";

const sortData = () => {
  // 將醫療提醒類卡片資料置頂
  let eventData: DataType[] = [];
  originalData.forEach((data) => {
    if (data.type === "醫療提醒") {
      eventData.unshift(data);
    } else {
      eventData.push(data);
    }
  });
  return eventData;
};

export default sortData;
