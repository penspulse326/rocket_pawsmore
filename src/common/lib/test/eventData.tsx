export interface DataType {
  card: string;
  created_at: string;
  category?: string;
  content?: string | null;
  type?: string;
  remind_at?: string;
  reserve_type?: string | null;
  reserve_at?: string | null;
  title?: string;
}

export const originalData: DataType[] = [
  {
    card: "日常紀錄",
    created_at: "2023-12-31",
  },
  {
    card: "日常紀錄",
    created_at: "2024-01-03",
  },
  {
    card: "日常紀錄",
    created_at: "2024-01-08",
  },
  {
    card: "日常紀錄",
    created_at: "2024-01-17",
  },
  {
    card: "日常紀錄",
    created_at: "2024-01-30",
  },
  {
    card: "重要時刻",
    created_at: "2024-01-17",
    category: "驚喜",
    content: "撿到乳牙",
  },
  {
    card: "重要時刻",
    created_at: "2024-02-02",
    category: "社交",
    content: "生日",
  },
  {
    card: "重要時刻",
    created_at: "2024-01-23",
    category: "行為表現",
    content: "睡到翻肚",
  },
  {
    card: "重要時刻",
    created_at: "2024-01-28",
    category: "社交",
    content: "交到新朋友",
  },
  {
    card: "重要時刻",
    created_at: "2024-02-06",
    category: "驚喜",
    content: "收到「禮物」",
  },
  {
    card: "重要時刻",
    created_at: "2024-02-13",
    category: "技能",
    content: "學會翻滾",
  },
  {
    card: "重要時刻",
    created_at: "2024-01-20",
    category: "社交",
    content: "買新衣",
  },
  {
    card: "重要時刻",
    created_at: "2024-02-08",
    category: "生活習慣",
    content: "破壞王",
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-20",
    type: "醫療提醒",
    remind_at: "2024-01-25",
    reserve_type: "健檢",
    reserve_at: "2024-01-25",
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-20",
    type: "醫療提醒",
    remind_at: "2024-02-01",
    reserve_type: "看診",
    reserve_at: "2024-02-01",
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-20",
    type: "醫療提醒",
    remind_at: "2024-02-10",
    reserve_type: "打疫苗",
    reserve_at: "2024-02-10",
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-10",
    type: "醫療提醒",
    remind_at: "2024-01-17",
    reserve_type: "驅蟲",
    reserve_at: "2024-01-17",
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-10",
    type: "醫療提醒",
    remind_at: "2024-01-17",
    reserve_type: "洗牙",
    reserve_at: "2024-01-17",
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-10",
    type: "醫療提醒",
    remind_at: "2024-02-07",
    reserve_type: "回診",
    reserve_at: "2024-02-07",
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-09",
    type: "就診紀錄",
    title: "六合一疫苗初施",
    remind_at: "2024-01-13",
    reserve_type: null,
    reserve_at: null,
  },
  {
    card: "醫療紀錄",
    created_at: "2024-01-16",
    type: "就診紀錄",
    title: "回診",
    remind_at: "2024-01-13",
    reserve_type: null,
    reserve_at: null,
  },
];
