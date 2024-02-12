const apiNext = {
  SIGN_UP: "/api/auth/signup",
  LOGIN: "/api/auth/login",
  UPLOAD: "/api/cld/upload",
  CREATE_MEMBER: "/api/member/profile/add",
  CREATE_PET: "/api/member/pets",
  UPDATE_PET: "/api/member/pets/update", // 動態路由 /:petId
};

export default apiNext;
