export interface FormFieldType {
  value: string;
  message?: string;
  required?: boolean;
  validate?: (...args: any[]) => boolean;
}

export interface FormValidateType {
  isValid: boolean;
  fields: {
    [key: string]: FormFieldType;
  };
}

export interface UserInfoType {
  id: string;
  username: string;
  account: string;
  photoUrl: string;
  introduction: string;
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
