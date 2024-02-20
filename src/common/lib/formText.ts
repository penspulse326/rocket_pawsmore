import { RecordCardType, MomentCategoryType } from "@/types/enums";

export const species = [
  { label: "狗", value: 0 },
  { label: "貓", value: 1 },
  { label: "倉鼠", value: 2 },
  { label: "其他", value: 3 },
];

export const gender = [
  { label: "男", value: 0 },
  { label: "女", value: 1 },
];

type RecordCardTitleType = {
  TITLE: string;
  SUB_TITLE: string;
};

export const recordCard: Record<RecordCardType, RecordCardTitleType> = {
  [RecordCardType.日常紀錄]: {
    TITLE: "新增日常紀錄",
    SUB_TITLE: "可讓醫生參考的生理紀錄及在家可處理的照護。",
  },
  [RecordCardType.醫療紀錄]: {
    TITLE: "新增醫療紀錄",
    SUB_TITLE: "追蹤寵物看診歷程，管理預約提醒與醫療記錄。",
  },
  [RecordCardType.重要時刻]: {
    TITLE: "新增重要時刻",
    SUB_TITLE: "選擇事件分類，保存每個重要時刻的紀錄。",
  },
};

export const unitCategory = [
  { label: "kg", value: "kg" },
  { label: "g", value: "g" },
];

export const foodCategory = [
  { label: "乾食", value: "乾食" },
  { label: "濕食", value: "濕食" },
  { label: "點心", value: "點心" },
];

export const careCategory = {
  deworming: { TITLE: "驅蟲", PLACEHOLDER: "請輸入藥品名稱" },
  medicine: { TITLE: "用藥", PLACEHOLDER: "請輸入藥品名稱" },
  injection: { TITLE: "注射", PLACEHOLDER: "請輸入藥品名稱" },
  rehab: { TITLE: "復健", PLACEHOLDER: "請輸入治療名稱" },
};

type SickCategoryType = {
  [key: string]: {
    TITLE: string;
    INPUT_TYPE: string;
    OPTIONS: { label: string; value: string }[];
  };
};

export const sickCategory: SickCategoryType = {
  urine: {
    TITLE: "尿液",
    INPUT_TYPE: "select",
    OPTIONS: [
      { label: "黃色透明", value: "黃色透明" },
      { label: "橘色或深黃色", value: "橘色或深黃色" },
      { label: "紅色或粉紅色", value: "紅色或粉紅色" },
      { label: "深棕色", value: "深棕色" },
      { label: "其他", value: "其他" },
    ],
  },
  poo: {
    TITLE: "糞便",
    INPUT_TYPE: "select",
    OPTIONS: [
      { label: "軟便", value: "軟便" },
      { label: "下痢", value: "下痢" },
      { label: "深色且質地硬", value: "深色且質地硬" },
      { label: "紅色", value: "紅色" },
      { label: "黑色", value: "黑色" },
      { label: "白色點狀", value: "白色點狀" },
      { label: "其他", value: "其他" },
    ],
  },
  vomit: {
    TITLE: "嘔吐",
    INPUT_TYPE: "select",
    OPTIONS: [
      { label: "吐毛球", value: "吐毛球" },
      { label: "透明無色", value: "透明無色" },
      { label: "白色泡沫狀", value: "白色泡沫狀" },
      { label: "食物", value: "食物" },
      { label: "黃色", value: "黃色" },
      { label: "粉紅色", value: "粉紅色" },
      { label: "深棕色", value: "深棕色" },
      { label: "綠色", value: "綠色" },
      { label: "紅色", value: "紅色" },
      { label: "混合異物", value: "混合異物" },
      { label: "其他", value: "其他" },
    ],
  },
  symptom: {
    TITLE: "症狀",
    INPUT_TYPE: "multi",
    OPTIONS: [
      { label: "發燒", value: "發燒" },
      { label: "無法排泄", value: "無法排泄" },
      { label: "傷口", value: "傷口" },
      { label: "腹部脹氣", value: "腹部脹氣" },
      { label: "咳嗽", value: "咳嗽" },
      { label: "呼吸困難", value: "呼吸困難" },
      { label: "分泌物", value: "分泌物" },
      { label: "皮膚", value: "皮膚" },
      { label: "抽搐", value: "抽搐" },
      { label: "走路姿勢", value: "走路姿勢" },
      { label: "其他", value: "其他" },
    ],
  },
};

export const momentCategory = [
  { label: "行為表現", value: "行為表現" },
  { label: "生活習慣", value: "生活習慣" },
  { label: "技能", value: "技能" },
  { label: "社交", value: "社交" },
  { label: "驚喜", value: "驚喜" },
];

export const behaviorOptions = [
  { label: "吐在床上", value: "吐在床上" },
  { label: "咬爛物品", value: "咬爛物品" },
  { label: "踏踏", value: "踏踏" },
  { label: "一起睡覺", value: "一起睡覺" },
  { label: "一起吃飯", value: "一起吃飯" },
  { label: "睡到翻肚", value: "睡到翻肚" },
  { label: "睡到打呼", value: "睡到打呼" },
  { label: "偷吃食物", value: "偷吃食物" },
];

export const habitOptions = [
  { label: "學會用貓砂", value: "學會用貓砂" },
  { label: "定點排泄", value: "定點排泄" },
  { label: "看電視", value: "看電視" },
  { label: "咬飼主", value: "咬飼主" },
];

export const socialOptions = [
  { label: "寵物美容", value: "寵物美容" },
  { label: "交到新朋友", value: "交到新朋友" },
  { label: "出遊", value: "出遊" },
  { label: "搬家", value: "搬家" },
  { label: "拿到新玩具", value: "拿到新玩具" },
  { label: "穿新衣", value: "穿新衣" },
  { label: "參加比賽", value: "參加比賽" },
];

export const surpriseOptions = [
  { label: "踩到尾巴", value: "踩到尾巴" },
  { label: "收到寵物送的「禮物」", value: "收到寵物送的「禮物」" },
  { label: "撿到乳牙", value: "撿到乳牙" },
  { label: "撿到鬍鬚", value: "撿到鬍鬚" },
  { label: "收紅包", value: "收紅包" },
];

interface ChangePasswordType {
  ENTER_PASSWORD: string;
  DOUBLE_CHECK: string;
}

export const ChangePassword: ChangePasswordType = {
  ENTER_PASSWORD: "輸入6-16字符以上英數字密碼",
  DOUBLE_CHECK: "再次輸入密碼",
};
