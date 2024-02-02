export const recordCard = {
  daily: {
    TITLE: "新增日常紀錄",
    SUB_TITLE: "可讓醫生參考的生理紀錄及在家可處理的照護。",
    COLOR: "#969AFF",
  },
  medical: {
    TITLE: "新增醫療紀錄",
    SUB_TITLE: "追蹤寵物看診歷程，管理預約提醒與醫療記錄。",
    COLOR: "#FF6D80",
  },
  moment: {
    TITLE: "新增重要時刻",
    SUB_TITLE: "選擇事件分類，保存每個重要時刻的紀錄。",
    COLOR: "#FFA959",
  },
};

export const foodCategory = ["乾食", "濕食", "鮮食", "點心"];

export const careCategory = [
  { NAME: "deworming", TITLE: "驅蟲", PLACEHOLDER: "請輸入藥品名稱" },
  { NAME: "medicine", TITLE: "用藥", PLACEHOLDER: "請輸入藥品名稱" },
  { NAME: "injection", TITLE: "注射", PLACEHOLDER: "請輸入藥品名稱" },
  { NAME: "rehab", TITLE: "復健", PLACEHOLDER: "請輸入治療名稱" },
];

export const sickCategory = [
  {
    NAME: "urine",
    TITLE: "尿液",
    OPTIONS: ["黃色透明", "橘色或深黃色", "紅色或粉紅色", "深棕色", "其他"],
  },
  {
    NAME: "stool",
    TITLE: "糞便",
    OPTIONS: [
      "軟便",
      "下痢",
      "深色且質地硬",
      "紅色",
      "黑色",
      "白色點狀",
      "其他",
    ],
  },
  {
    NAME: "vomit",
    TITLE: "嘔吐",
    OPTIONS: [
      "吐毛球",
      "透明無色",
      "白色泡沫狀",
      "食物",
      "黃色",
      "粉紅色",
      "深棕色",
      "綠色",
      "紅色",
      "混合異物",
      "其他",
    ],
  },
  {
    NAME: "symptom",
    TITLE: "症狀",
    OPTIONS: [
      "發燒",
      "無法排泄",
      "傷口",
      "腹部脹氣",
      "咳嗽",
      "呼吸困難",
      "分泌物",
      "皮膚",
      "抽搐",
      "走路姿勢",
      "其他",
    ],
  },
];
