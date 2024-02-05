export interface DataType {
  card: string;
  created_at: string;
  target_date?: string;
  category?: string;
  content?: string | null;
  type?: string;
  reserve_type?: string | null;
  reserve_at?: string | null;
  title?: string;
  desc?: string;
  photo?: string;
  weight?: number;
  food?: FoodType[];
  water?: number;
  urine?: string;
  stool?: string;
  vomit?: string;
  symptom?: string[];
  deworming?: string;
  medicine?: string | null;
  injection?: string;
  rehab?: string;
  selected?: string[];
  remark?: string | null;
  hospital?: string;
  doctor?: string;
  check?: string;
  notice?: string;
  cost?: number;
  remind?: boolean;
  id: number;
  visit_type?: string;
  related_id?: number;
}

interface FoodType {
  food_type: string;
  food_weight: number;
}

export const originalData: DataType[] = [
  {
    card: "日常紀錄",
    created_at: "2023-12-31",
    target_date: "2023-12-31",
    weight: 31320,
    food: [
      { food_type: "乾糧", food_weight: 300 },
      { food_type: "濕糧", food_weight: 150 },
      { food_type: "鮮食", food_weight: 150 },
    ],
    water: 3310,
    urine: "血紅色",
    stool: "",
    vomit: "",
    symptom: ["抽蓄", "走路姿勢"],
    deworming: "蚤不到",
    medicine: "",
    injection: "",
    rehab: "",
    selected: ["urine", "symptom", "deworming", "rehab"],
    remark:
      "今天帶查理去游泳復健，走路姿勢還沒完全修正好，晚上吃飯完後突然抽蓄。",
    id: 1,
  },
  {
    card: "日常紀錄",
    created_at: "2024-01-03",
    target_date: "2024-01-03",
    weight: 31320,
    food: [
      { food_type: "乾糧", food_weight: 300 },
      { food_type: "濕糧", food_weight: 150 },
      { food_type: "鮮食", food_weight: 150 },
    ],
    water: 3310,
    urine: "血紅色",
    stool: "",
    vomit: "",
    symptom: ["抽蓄", "走路姿勢"],
    deworming: "蚤不到",
    medicine: "",
    injection: "",
    selected: ["urine", "symptom", "deworming", "rehab"],
    remark:
      "今天帶查理去游泳復健，走路姿勢還沒完全修正好，晚上吃飯完後突然抽蓄。",
    id: 2,
  },
  {
    card: "日常紀錄",
    created_at: "2024-01-08",
    target_date: "2024-01-08",
    weight: 31320,
    food: [
      { food_type: "乾糧", food_weight: 300 },
      { food_type: "濕糧", food_weight: 150 },
      { food_type: "鮮食", food_weight: 150 },
    ],
    water: 3310,
    urine: "血紅色",
    stool: "",
    vomit: "",
    symptom: ["抽蓄", "走路姿勢"],
    selected: ["urine", "symptom", "deworming", "rehab"],
    remark: null,
    id: 3,
  },
  {
    card: "日常紀錄",
    created_at: "2024-01-17",
    target_date: "2024-01-17",
    weight: 31320,
    food: [
      { food_type: "乾糧", food_weight: 300 },
      { food_type: "濕糧", food_weight: 150 },
      { food_type: "鮮食", food_weight: 150 },
    ],
    water: 3310,
    urine: "血紅色",
    stool: "",
    vomit: "",
    symptom: ["抽蓄", "走路姿勢"],
    deworming: "蚤不到",
    medicine: "",
    injection: "",
    rehab: "游泳",
    selected: ["urine", "symptom", "deworming", "rehab"],
    remark:
      "今天帶查理去游泳復健，走路姿勢還沒完全修正好，晚上吃飯完後突然抽蓄。",
    id: 4,
  },
  {
    card: "日常紀錄",
    created_at: "2024-01-30",
    target_date: "2024-01-30",
    weight: 31320,
    food: [
      { food_type: "乾糧", food_weight: 300 },
      { food_type: "濕糧", food_weight: 150 },
      { food_type: "鮮食", food_weight: 150 },
    ],
    water: 3310,
    urine: "血紅色",
    stool: "",
    vomit: "",
    symptom: ["抽蓄", "走路姿勢"],
    deworming: "蚤不到",
    medicine: "",
    injection: "",
    rehab: "游泳",
    selected: ["urine", "symptom", "deworming", "rehab"],
    remark:
      "今天帶查理去游泳復健，走路姿勢還沒完全修正好，晚上吃飯完後突然抽蓄。",
    id: 5,
  },
  {
    card: "重要時刻",
    created_at: "2024-01-17",
    category: "驚喜",
    content: "撿到乳牙",
    desc: "撿到乳牙",
    photo: "/test/moment-photo.jpg",
    id: 6,
  },
  {
    card: "重要時刻",
    created_at: "2024-02-02",
    category: "社交",
    content: "撿到乳牙",
    desc: "撿到乳牙",
    photo: "/test/moment-photo.jpg",
    id: 7,
  },
  {
    card: "重要時刻",
    created_at: "2024-01-23",
    category: "行為表現",
    content: "撿到乳牙",
    desc: "撿到乳牙",
    photo: "/test/moment-photo.jpg",
    id: 8,
  },
  {
    card: "重要時刻",
    created_at: "2024-01-28",
    category: "社交",
    content: "交到新朋友",
    desc: "交到新朋友",
    photo: "/test/moment-photo.jpg",
    id: 9,
  },
  {
    card: "重要時刻",
    created_at: "2024-02-06",
    category: "驚喜",
    content: "收到「禮物」",
    desc: "收到「禮物」",
    photo: "/test/moment-photo.jpg",
    id: 10,
  },
  {
    card: "重要時刻",
    created_at: "2024-02-13",
    category: "技能",
    content: "學會翻滾",
    desc: "學會翻滾",
    photo: "/test/moment-photo.jpg",
    id: 11,
  },
  {
    card: "重要時刻",
    created_at: "2024-01-20",
    category: "社交",
    content: "買新衣",
    desc: "買新衣",
    photo: "/test/moment-photo.jpg",
    id: 12,
  },
  {
    card: "重要時刻",
    created_at: "2024-02-08",
    category: "生活習慣",
    content: "破壞王",
    desc: "破壞王",
    photo: "/test/moment-photo.jpg",
    id: 13,
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-20",
    type: "醫療提醒",
    reserve_type: "健檢",
    reserve_at: "2024-01-25",
    id: 14,
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-20",
    type: "醫療提醒",
    reserve_type: "看診",
    reserve_at: "2024-02-01",
    id: 15,
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-20",
    type: "醫療提醒",
    reserve_type: "打疫苗",
    reserve_at: "2024-02-10",
    id: 16,
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-10",
    type: "醫療提醒",
    reserve_type: "驅蟲",
    reserve_at: "2024-01-17",
    id: 17,
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-10",
    type: "就診紀錄",
    title: "感冒",
    reserve_type: null,
    reserve_at: null,
    id: 18,
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-10",
    type: "醫療提醒",
    reserve_type: "回診",
    reserve_at: "2024-02-07",
    id: 19,
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-09",
    type: "就診紀錄",
    title: "六合一疫苗初施",
    reserve_type: null,
    reserve_at: null,
    id: 20,
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-16",
    type: "就診紀錄",
    title: "回診",
    reserve_type: null,
    reserve_at: null,
    id: 21,
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-30",
    type: "醫療提醒",
    reserve_type: "回診",
    reserve_at: "2024-02-02",
    id: 22,
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-20",
    target_date: "2024-01-20",
    visit_type: "看診",
    type: "就診紀錄",
    title: "狂犬病疫苗",
    hospital: "愛心動物醫院",
    doctor: "張醫師",
    check: "體溫正常，活動正常",
    medicine: null,
    notice: "觀察是否有不適，正常飲食",
    cost: 1800,
    photo: "/test/medical-photo.jpg",
    remind: true,
    reserve_type: null,
    reserve_at: "2024-01-30",
    id: 23,
    related_id: 5,
  },
];
