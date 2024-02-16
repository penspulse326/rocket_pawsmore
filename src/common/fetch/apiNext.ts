const apiNext = {
  //登入註冊
  SIGN_UP: "/api/auth/signup",
  LOGIN: "/api/auth/login",
  // 上傳檔案
  UPLOAD: "/api/cld/upload",
  // 會員資料
  CREATE_MEMBER: "/api/user/add",
  CREATE_PET: "/api/pet/add",
  UPDATE_PET: "/api/pet/update", // 動態路由 /:petId
  GET_PETS: "/api/pet/list", // 動態路由 /:userId
  // 貼文
  GET_ALL_POSTS: "/api/post/all",
  GET_PET_POSTS: (petId: number) => `/api/post/list?petId=${petId}`,
  ADD_POST: "/api/post/add", // 動態路由 /:petId
  LIKE_POST: "/api/post/like", // 動態路由 /:postId
  DELETE_POST: `/api/post/delete`, // 動態路由 /:postId
  // 留言
  ADD_COMMENT: "/api/comment/add", // 動態路由 /:postId
  GET_COMMENT: "/api/comment/get", // 動態路由 /:postId
  DELETE_COMMENT: (postId: number, commentId: number) =>
    `/api/comment/delete?postId=${postId}&commentId=${commentId}`,
};

export default apiNext;
