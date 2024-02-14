const apiNext = {
  SIGN_UP: "/api/auth/signup",
  LOGIN: "/api/auth/login",
  UPLOAD: "/api/cld/upload",
  CREATE_MEMBER: "/api/user/add",
  CREATE_PET: "/api/pet/add",
  UPDATE_PET: "/api/pet/update", // 動態路由 /:petId
  GET_PETS: "/api/pet/list", // 動態路由 /:userId
  GET_ALL_POSTS: "/api/post/all",
  ADD_POST: "/api/post/add", // 動態路由 /:petId
};

export default apiNext;
