import sortData from "@/common/helpers/sortData";
import {
  CardUnionDataType,
  DailyCardDataType,
  MedicalCardDataType,
  MomentCardDataType,
} from "@/types";

export interface FetchDataType {
  petId: number;
  dailyCards: DailyCardDataType[];
  medicalCards: MedicalCardDataType[];
  momentCards: MomentCardDataType[];
}

const fakeData = () => {
  const fetchData = {
    petId: 24,
    dailyCards: [
      {
        cardId: 45,
        card: 0,
        weight: "4.kg",
        food: '[{"type":"濕食","amount":300}]',
        water: 100,
        urine: 1,
        poo: 1,
        vomit: 5,
        symptom: '["腹部脹氣","其他"]',
        deworming: "全能貓",
        medicine: "內服藥",
        injection: "皮下",
        rehab: "按摩",
        remark: "你怎麼這麼會吃",
        selected:
          '["urine","poo","vomit","symptom","deworming","medicine","injection","rehab"]',
        targetDate: "2024-02-20T00:00:00",
        createDate: "2024-02-20T13:43:02.02",
      },
      {
        cardId: 48,
        card: 0,
        weight: "0.kg",
        food: "[]",
        water: 300,
        urine: 0,
        poo: 1,
        vomit: 0,
        symptom: "[]",
        deworming: "",
        medicine: "",
        injection: "",
        rehab: "",
        remark: "",
        selected: '["poo"]',
        targetDate: "2024-02-21T00:00:00",
        createDate: "2024-02-21T03:15:19.317",
      },
      {
        cardId: 53,
        card: 0,
        weight: "0.kg",
        food: "[]",
        water: 0,
        urine: 0,
        poo: 0,
        vomit: 0,
        symptom: '["傷口"]',
        deworming: "",
        medicine: "",
        injection: "",
        rehab: "",
        remark: "",
        selected: '["symptom"]',
        targetDate: "2024-02-22T00:00:00",
        createDate: "2024-02-21T14:55:19.763",
      },
    ],
    medicalCards: [
      {
        cardId: 50,
        card: 1,
        cardType: 1,
        reserveType: 0,
        visitType: 1,
        title: "拉肚子",
        hospital: "寵愛動物醫院",
        doctor: "吳醫師",
        medicine: "口服藥",
        check: "基本檢查",
        notice: "少量多餐",
        cost: 1800,
        photo:
          "https://res.cloudinary.com/djlffjjc9/image/upload/v1708435035/moment/aps8im2vvhjywaocn6su.png",
        remind: true,
        // selected: null,
        targetDate: "2024-02-20T00:00:00",
        reserveDate: "2024-02-20T16:00:00",
        remindDate: null,
        createDate: "2024-02-20T13:28:48.517",
      },
      {
        card: 1,
        cardId: 48,
        cardType: 0,
        reserveType: 2,
        visitType: 0,
        title: null,
        hospital: null,
        doctor: null,
        medicine: null,
        check: null,
        notice: null,
        cost: null,
        photo: null,
        remind: null,
        // selected: null,
        targetDate: "2024-02-21T00:00:00",
        reserveDate: "2024-02-23T14:00:00",
        remindDate: null,
        createDate: "2024-02-21T07:19:24.07",
      },
    ],
    momentCards: [
      {
        cardId: 51,
        card: 2,
        petId: 24,
        momentType: 2,
        momentId: 25,
        momentDetails: "從宇宙獲得奇怪的知識",
        desc: "",
        momentPhoto:
          "https://res.cloudinary.com/djlffjjc9/image/upload/v1708435035/moment/aps8im2vvhjywaocn6su.png",
        targetDate: "2024-02-20T00:00:00",
        createDate: "2024-02-20T13:17:17.137",
      },
      {
        cardId: 63,
        card: 2,
        petId: 24,
        momentType: 0,
        momentId: 11,
        momentDetails: "",
        desc: "吃飽睡睡飽吃",
        momentPhoto:
          "https://res.cloudinary.com/djlffjjc9/image/upload/v1707979158/post/cnebuye59yybihec4nq6.jpg",
        targetDate: "2024-02-16T00:00:00",
        createDate: "2024-02-20T13:46:19.04",
      },
    ],
  };

  const { dailyCards, medicalCards, momentCards }: FetchDataType = fetchData;

  const data: CardUnionDataType[] = [
    ...dailyCards,
    ...medicalCards,
    ...momentCards,
  ];

  const sortedData = sortData(data);

  return sortedData;
};

export default fakeData;
