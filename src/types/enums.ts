export enum MediaType {
  image = 0,
  video = 1,
}

// General

export enum RecordCardType {
  日常紀錄 = 0,
  醫療紀錄 = 1,
  重要時刻 = 2,
}

export enum RecordEventType {
  日常紀錄 = 0,
  醫療紀錄 = 1,
  重要時刻 = 2,
  紀念日 = 3,
}

// Daily Card

export enum UrineType {
  "" = 0,
  黃色透明 = 1,
  橘色或深黃色 = 2,
  紅色或粉紅色 = 3,
  深棕色 = 4,
  其他 = 5,
}

export enum PooType {
  "" = 0,
  軟便 = 1,
  下痢 = 2,
  深色且質地硬 = 3,
  紅色 = 4,
  黑色 = 5,
  白色點狀 = 6,
  其他 = 7,
}

export enum VomitType {
  "" = 0,
  嘔吐外觀形狀 = 1,
  吐毛球 = 2,
  透明無色 = 3,
  白色泡沫狀 = 4,
  食物 = 5,
  黃色 = 6,
  粉紅色 = 7,
  深棕色 = 8,
  綠色 = 9,
  紅色 = 10,
  混合異物 = 11,
  其他 = 12,
}

// Moment Card

export enum MomentCategoryType {
  行為表現 = 0,
  生活習慣 = 1,
  技能 = 2,
  社交 = 3,
  驚喜 = 4,
}

export enum MomentIdType {
  踩到尾巴 = 0,
  收到寵物送的禮物 = 1,
  撿到乳牙 = 2,
  撿到鬍鬚 = 3,
  收紅包 = 4,
  吐在床上 = 5,
  咬爛物品 = 6,
  踏踏 = 7,
  一起睡覺 = 8,
  一起吃飯 = 9,
  打翻碗 = 10,
  睡到翻肚 = 11,
  睡到打呼 = 12,
  偷吃食物 = 13,
  學會用貓砂 = 14,
  定點排泄 = 15,
  看電視 = 16,
  咬飼主 = 17,
  寵物美容 = 18,
  交到新朋友 = 19,
  出遊 = 20,
  搬家 = 21,
  拿到新玩具 = 22,
  穿新衣 = 23,
  參加比賽 = 24,
  自填 = 25,
}

export enum AnniversaryType {
  生日 = 0,
  領養日 = 1,
}

// Medical Card

export enum MedicalCardType {
  醫療提醒 = 0,
  就診紀錄 = 1,
}

export enum ReserveType {
  無 = 0,
  看診 = 1,
  疫苗 = 2,
  健檢 = 3,
  結紮 = 4,
}

export enum VisitType {
  無 = 0,
  看診 = 1,
  疫苗 = 2,
  健檢 = 3,
  結紮 = 4,
}

export enum SpeciesType {
  狗 = 0,
  貓 = 1,
  倉鼠 = 2,
  其他 = 3,
}

export enum GenderType {
  男生 = 0,
  女生 = 1,
}
