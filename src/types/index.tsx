import {
  AnniversaryType,
  MedicalCardType,
  MomentCategoryType,
  MomentIdType,
  PooType,
  RecordCardType,
  RecordEventType,
  ReserveType,
  UrineType,
  VisitType,
  VomitType,
} from "./enums";

export interface LoginFormType {
  email: string;
  password: string;
}

export interface SignUpFormType {
  email: string;
  password: string;
  checkPassword: string;
}

export interface MemberFormType {
  account: string;
  username: string;
  headShot: File | string | null;
  introduction?: string;
  link?: string;
}

export interface PetFormType {
  petAccount: string;
  petName: string;
  petSpecies: number | null;
  petGender: number | null;
  breed: string;
  birthday: string;
  adoptedDate?: string;
  petPhoto: File | string | null;
  petIntro?: string;
  link?: string;
}

export interface RequestedUserInfoType {
  account: string;
  following: UserListDataType[];
  headshot: string;
  introduction: string;
  link: string;
  name: string;
  userId: number;
}

export interface UserInfoType {
  userId: number | null;
  username: string;
  account: string;
  headShot: string;
  introduction: string;
  link: string;
  token: string;
}

export interface UserListDataType {
  id: number;
  account: string;
  name: string;
  photo: string;
}

interface OwnerDataType {
  userName: string;
  userAccount: string;
  userId: number;
  userPhoto: string;
}

export interface PetDataType {
  petId: number;
  petAccount: string;
  petName: string;
  petPhoto: string;
  petSpecies: number;
  petGender: number;
  breed: string;
  birthday: string;
  adoptedDate: string;
  petIntro: string;
  link: string;
  petsfollowers: UserListDataType[];
  owner: OwnerDataType;
}

export interface AddPostType {
  postContent: string;
  media: string;
  mediaType: 0 | 1;
}

export interface LikesType {
  postId: number;
  userId: number;
  userAccount: string;
}

interface LessCommentDataType {
  postContent: string;
  postId: number;
  userAccount: string;
  userId: number;
}

export interface PostDataType {
  petId: number;
  postId: number;
  petAccount: string;
  petPhoto: string | null;
  postContent: string;
  media: string;
  mediaType: 0 | 1;
  likes: LikesType[];
  comments: LessCommentDataType[];
  createDate: string;
  userId: number;
}

export interface CommentDataType {
  id: number;
  petId: number;
  postId: number;
  userId: number;
  userPhoto: string;
  userAccount: string;
  commentContent: string;
  createDate: string;
}

export interface DailyDataType {
  petId?: 15;
  cardId?: 26;
  card?: number;
  createDate?: string;
  weight: string;
  food: string;
  water: number;
  urine: string | (typeof UrineType)[""];
  poo: string | (typeof PooType)[""];
  vomit: string | (typeof VomitType)[""];
  symptom: string;
  deworming: string;
  medicine: string;
  injection: string;
  rehab: string;
  remark: string;
  selected: string;
  targetDate: string;
}

export interface MomentFormType {
  card: 2;
  momentType: MomentCategoryType | null;
  momentId: MomentIdType | null;
  momentDetails: string;
  desc: string;
  photo: File | string | null;
  targetDate: string;
}

export interface MomentDataType {
  momentType: MomentCategoryType;
  momentId: MomentIdType;
  momentDetails: string;
  desc: string;
  photo: string;
  targetDate: string;
}

// 請求所有卡片的回傳資料

export type CardUnionDataType =
  | DailyCardDataType
  | MedicalCardDataType
  | MomentCardDataType
  | AnniversaryCardDataType;

export interface DailyCardDataType {
  cardId: number;
  card: RecordCardType;
  weight: string;
  food: string;
  water: number;
  urine: UrineType;
  poo: PooType;
  vomit: VomitType;
  symptom: string;
  deworming: string;
  medicine: string;
  injection: string;
  rehab: string;
  remark: string;
  selected: string;
  targetDate: string;
  createDate: string;
}

export interface MedicalCardDataType {
  cardId: number;
  card: RecordCardType;
  cardType: MedicalCardType;
  reserveType: ReserveType;
  visitType: VisitType;
  title: string | null;
  hospital: string | null;
  doctor: string | null;
  medicine: string | null;
  check: string | null;
  notice: string | null;
  cost: number | null;
  photo: string | null;
  remind: boolean | null;
  // selected?: ;
  targetDate: string;
  reserveDate: string;
  remindDate: string | null;
  createDate: string;
}

export interface MomentCardDataType {
  cardId: number;
  petId: number;
  card: RecordCardType;
  momentType: MomentCategoryType;
  momentId: MomentIdType;
  momentDetails: string;
  desc: string;
  photo: string;
  targetDate: string;
  createDate: string;
}

export interface AnniversaryCardDataType {
  card: RecordEventType;
  cardId: number;
  desc: string;
  targetDate: string;
  createDate: string;
  anniversaryType: AnniversaryType;
}

export interface OptionType {
  label: string;
  value: any;
}
