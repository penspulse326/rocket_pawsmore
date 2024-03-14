const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const apiNext = {
  // 登入註冊
  SIGN_UP: `${baseUrl}/api/auth/signup`,
  LOGIN: `${baseUrl}/api/auth/login`,
  CHECK_AUTH: `${baseUrl}/api/auth/check`,
  // 上傳檔案
  UPLOAD: `${baseUrl}/api/cld/upload`,
  // 會員資料
  CREATE_MEMBER: `${baseUrl}/api/user/add`,
  CREATE_PET: `${baseUrl}/api/pet/add`,
  UPDATE_PET: `${baseUrl}/api/pet/update`, // 動態路由 /:petId
  // 寵物資料
  GET_PET: `${baseUrl}/api/pet/profile`, // 動態路由 /:petAccount
  GET_PETS: `${baseUrl}/api/pet/list`, // 動態路由 /:userId
  GET_PET_POST: `${baseUrl}/api/post`, // 動態路由 /:petAccount
  GET_PET_RECORD: `${baseUrl}/api/pet/record`, // 動態路由 /:petAccount
  GET_MILESTONE_LIST: `${baseUrl}/api/pet/milestone`, // 動態路由 /:petAccount
  FOLLOW_PET: `${baseUrl}/api/follow`, // 動態路由 /:petAccount
  // 貼文
  GET_ALL_POSTS: `${baseUrl}/api/post/all`,
  GET_PET_POSTS: (petAccount: string) => `${baseUrl}/api/post/${petAccount}`,
  GET_FOLLOWING_POSTS: (userId: number) => `${baseUrl}/api/post/following/${userId}`,
  GET_SINGLE_POST: `${baseUrl}/api/post/single`, // 動態路由 /:postId
  GET_SPECIES_POSTS: (species: number) => `${baseUrl}/api/post/species/${species}`,
  ADD_POST: `${baseUrl}/api/post/add`, // 動態路由 /:petId
  LIKE_POST: `${baseUrl}/api/post/like`, // 動態路由 /:postId
  DELETE_POST: `${baseUrl}/api/post/delete`, // 動態路由 /:postId
  // 留言
  ADD_COMMENT: `${baseUrl}/api/comment/add`, // 動態路由 /:postId
  GET_COMMENT: `${baseUrl}/api/comment/get`, // 動態路由 /:postId
  DELETE_COMMENT: (postId: number, commentId: number) =>
    `${baseUrl}/api/comment/delete?postId=${postId}&commentId=${commentId}`,
  // 新增日常卡片
  ADD_DAILY_CARD: (petId: number) => `${baseUrl}/api/record/daily/add/${petId}`,
  // 新增醫療卡片
  ADD_MEDICAL_CARD: (petId: number) => `${baseUrl}/api/record/medical/add/${petId}`,
  ADD_MOMENT_CARD: (petId: number) => `${baseUrl}/api/record/moment/add/${petId}`,
  // 查看特定物種的帳號
  GET_SPECIES_ACCOUNTS: (species: number) => `${baseUrl}/api/pet/species/${species}`,
};

export default apiNext;
