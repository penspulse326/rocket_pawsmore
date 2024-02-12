const apiNext = {
  SIGN_UP: "/api/auth/signup",
  LOGIN: "/api/auth/login",
  UPLOAD: "/api/cld/upload",
  CREATE_MEMBER: "/api/user/add",
  CREATE_PET: "/api/pet/add",
  UPDATE_PET: "/api/pet/update", // 動態路由 /:petId
  GET_PET_LIST: "/api/pet/list", // 動態路由 /:userId
};

export default apiNext;
