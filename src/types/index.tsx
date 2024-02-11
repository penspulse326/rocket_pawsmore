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
  headShot: File | null;
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
  petPhoto: File | null;
  petIntro?: string;
  link?: string;
}

export interface UserInfoType {
  userId: string;
  username: string;
  account: string;
  headShot: string;
  token: string;
}

export interface PostDataType {
  created_at: string;
  content: string;
  media_type: string;
  media_url: string;
  likes: number;
  extra: {};
}

export interface CommentDataType {
  photoUrl: string;
  username: string;
  content: string;
  time: string;
}
