export interface LoginFormType {
  email: string;
  password: string;
}

export interface SignUpFormType {
  email: string;
  password: string;
  checkPassword: string;
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
