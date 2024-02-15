const apiUrl = process.env.API_URL;

const apiBase = {
  SIGN_UP: `${apiUrl}/signup`,
  LOGIN: `${apiUrl}/login`,
  CHECK_MEMBER: `${apiUrl}/social/user`, // 動態路由 /:userId
  CREATE_MEMBER: `${apiUrl}/member/profile/add`,
  CREATE_PET: `${apiUrl}/member/pets`,
  GET_PET: `${apiUrl}/member/pets`, // 動態路由 /:petId
  UPDATE_PET: `${apiUrl}/member/pets/update`, // 動態路由 /:petId
  GET_PET_LIST: `${apiUrl}/member/pets/userpets`, // 動態路由 /:userId
  GET_ALL_POST: `${apiUrl}/social/posts/all`,
  ADD_POST: `${apiUrl}/social/posts`, // 動態路由 /:petId
};

export default apiBase;
