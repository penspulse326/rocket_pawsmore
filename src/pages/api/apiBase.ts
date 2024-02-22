const apiUrl = process.env.API_URL;

const apiBase = {
  // 登入註冊
  SIGN_UP: `${apiUrl}/signup`,
  LOGIN: `${apiUrl}/login`,
  CHECK_AUTH: `${apiUrl}/member/profile`,
  // 會員資料
  CHECK_MEMBER: `${apiUrl}/social/user`, // 動態路由 /:userAccount
  CREATE_MEMBER: `${apiUrl}/member/profile/add`,
  // 寵物資料
  CREATE_PET: `${apiUrl}/member/pets`,
  GET_PET: `${apiUrl}/member/pets`, // 動態路由 /:petAccount
  UPDATE_PET: `${apiUrl}/member/pets/update`, // 動態路由 /:petId
  FOLLOW_PET: `${apiUrl}/social/follow`, // 動態路由 /:petAccount
  GET_PET_LIST: `${apiUrl}/member/pets/userpets`, // 動態路由 /:userId
  GET_PET_POST: `${apiUrl}/social/posts/pet`, // 動態路由 /:petAccount
  GET_PET_RECORD: `${apiUrl}/cards`, // 動態路由 /:petAccount
  // 貼文
  GET_ALL_POSTS: `${apiUrl}/social/posts/all`,
  GET_FOLLOWING_POSTS: (useId: string) =>
    `${apiUrl}/social/posts/following/${useId}`, // 動態路由 /:userId
  GET_SINGLE_POST: `${apiUrl}/social/posts`, // 動態路由 /:postId
  ADD_POST: `${apiUrl}/social/posts`, // 動態路由 /:petId
  DELETE_POST: `${apiUrl}/social/posts/delete`, // 動態路由 /:postId
  LIKE_POST: (id: string) => `${apiUrl}/social/posts/${id}/likes`, // 動態路由 /:postId
  // 留言
  ADD_COMMENT: (id: string) => `${apiUrl}/social/posts/${id}/comments/add`, // 動態路由 /:postId
  GET_COMMENT: (id: string) => `${apiUrl}/social/posts/${id}/comments`, // 動態路由 /:postId
  DELETE_COMMENT: (postId: string, commentId: string) =>
    `${apiUrl}/social/posts/${postId}/comments/delete/${commentId}`,
  // 新增日常卡片
  ADD_DAILY_CARD: (petId: string) =>
    `${apiUrl}/dashboard/cards/daily/add/${petId}`,
  // 新增醫療卡片
  ADD_MEDICAL_CARD: (petId: string) =>
    `${apiUrl}/dashboard/cards/medical/add/${petId}`,
  // 新增重要時刻卡片
  ADD_MOMENT_CARD: (petId: string) =>
    `${apiUrl}/dashboard/cards/moment/add/${petId}`,
};

export default apiBase;
