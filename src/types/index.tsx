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

export interface PostDataType {
  petId: number;
  postId: number;
  petAccount: string;
  petPhoto: string | null;
  postContent: string;
  media: string;
  mediaType: 0 | 1;
  likes: LikesType[];
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
