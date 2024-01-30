interface PostDataType {
  created_at: string;
  content: string;
  media_type: string;
  media_url: string;
  likes: number;
  extra: {};
}

interface CommentDataType {
  photoUrl: string;
  username: string;
  content: string;
  time: string;
}

export type { CommentDataType, PostDataType };
