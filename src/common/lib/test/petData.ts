interface petDataType {
  userId: number;
  petId: number;
  petAccountId: string;
  petName: string;
  petPhoto: string;
  petSpecies: number;
  petGender: number;
  breed: string;
  birthday: string;
  adoptedDate: string | null;
  petIntro: string;
  link: string;
}

const petData: petDataType[] = [
  {
    userId: 3,
    petId: 15,
    petAccountId: "littleprincess126",
    petName: "角龍寶寶",
    petPhoto: "/test/photo-cat-test.png",
    petSpecies: 1,
    petGender: 1,
    breed: "米克斯",
    birthday: "2023-08-01T00:00:00",
    adoptedDate: null,
    petIntro:
      "雖然我體型小小，但內心有著一位真正的小公主。\n我喜歡被捧在手心，享受被愛的感覺。\n歡迎來找我玩哦，我們一起探險、一起玩樂吧！",
    link: "https://www.instagram.com/littleprincess126",
  },
  {
    userId: 4,
    petId: 16,
    petAccountId: "beibeiiiii",
    petName: "貝貝",
    petPhoto: "/test/photo-dog-test.jpg",
    petSpecies: 2,
    petGender: 0,
    breed: "黃金獵犬",
    birthday: "2021-06-01T00:00:00",
    adoptedDate: null,
    petIntro: "丘",
    link: "https://www.youtube.com/watch?v=kyqpSycLASY",
  },
  {
    userId: 4,
    petId: 16,
    petAccountId: "beibeiiiii",
    petName: "貝貝",
    petPhoto: "/test/photo-dog-test.jpg",
    petSpecies: 2,
    petGender: 1,
    breed: "黃金獵犬",
    birthday: "2021-06-01T00:00:00",
    adoptedDate: null,
    petIntro: "丘",
    link: "https://www.youtube.com/watch?v=kyqpSycLASY",
  },
  {
    userId: 4,
    petId: 16,
    petAccountId: "beibeiiiii",
    petName: "貝貝",
    petPhoto: "/test/photo-dog-test.jpg",
    petSpecies: 2,
    petGender: 1,
    breed: "黃金獵犬",
    birthday: "2021-06-01T00:00:00",
    adoptedDate: null,
    petIntro: "丘",
    link: "https://www.youtube.com/watch?v=kyqpSycLASY",
  },
  {
    userId: 4,
    petId: 16,
    petAccountId: "beibeiiiii",
    petName: "貝貝",
    petPhoto: "/test/photo-dog-test.jpg",
    petSpecies: 2,
    petGender: 1,
    breed: "黃金獵犬",
    birthday: "2021-06-01T00:00:00",
    adoptedDate: null,
    petIntro: "丘",
    link: "https://www.youtube.com/watch?v=kyqpSycLASY",
  },
  {
    userId: 4,
    petId: 16,
    petAccountId: "beibeiiiii",
    petName: "貝貝",
    petPhoto: "/test/photo-dog-test.jpg",
    petSpecies: 2,
    petGender: 1,
    breed: "黃金獵犬",
    birthday: "2021-06-01T00:00:00",
    adoptedDate: null,
    petIntro: "丘",
    link: "https://www.youtube.com/watch?v=kyqpSycLASY",
  },
];

export default petData;
