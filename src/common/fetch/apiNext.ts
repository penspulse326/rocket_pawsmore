const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const apiNext = {
  //登入註冊
  SIGN_UP: `${baseUrl}/api/auth/signup`,
  LOGIN: `${baseUrl}/api/auth/login`,
  CHECK_AUTH: `${baseUrl}/api/auth/check`,
  // 上傳檔案
  UPLOAD: `${baseUrl}/api/cld/upload`,
  // 會員資料
  CREATE_MEMBER: `${baseUrl}/api/user/add`,
  CREATE_PET: `${baseUrl}/api/pet/add`,
  UPDATE_PET: `${baseUrl}/api/pet/update`, // 動態路由 /:petId
  GET_PETS: `${baseUrl}/api/pet/list`, // 動態路由 /:userId
  // 貼文
  GET_ALL_POSTS: `${baseUrl}/api/post/all`,
  GET_PET_POSTS: (petId: number) => `${baseUrl}/api/post/list?petId=${petId}`,
  GET_SINGLE_POST: `${baseUrl}/api/post/single`, // 動態路由 /:postId
  ADD_POST: `${baseUrl}/api/post/add`, // 動態路由 /:petId
  LIKE_POST: `${baseUrl}/api/post/like`, // 動態路由 /:postId
  DELETE_POST: `${baseUrl}/api/post/delete`, // 動態路由 /:postId
  // 留言
  ADD_COMMENT: `${baseUrl}/api/comment/add`, // 動態路由 /:postId
  GET_COMMENT: `${baseUrl}/api/comment/get`, // 動態路由 /:postId
  DELETE_COMMENT: (postId: number, commentId: number) =>
    `${baseUrl}/api/comment/delete?postId=${postId}&commentId=${commentId}`,
};

export default apiNext;
