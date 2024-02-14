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
  userId: number | null;
  username: string;
  account: string;
  headShot: string;
  token: string;
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
  adopteddDate: string;
  petIntro: string;
  link: string;
}

export interface PostDataType {
  petId: number;
  postId: number;
  petAccount: string;
  petPhoto: string | null;
  postContent: string;
  media: string;
  mediaType: 0 | 1;
  createDate: string;
}

export interface CommentDataType {
  photoUrl: string;
  username: string;
  content: string;
  time: string;
}
