const apiUrl = process.env.API_URL;

const apiBase = {
  SIGN_UP: `${apiUrl}/signup`,
  LOGIN: `${apiUrl}/login`,
  CREATE_MEMBER: `${apiUrl}/member/profile/add`,
  CREATE_PET: `${apiUrl}/member/pets`,
  UPDATE_PET: `${apiUrl}/member/pets/update`, // 動態路由 /:petId
  GET_PET_LIST: `${apiUrl}/member/pets/userpets`, // 動態路由 /:userId
  GET_POST_LIST: `${apiUrl}/social/posts`, // query ?limit=10&sort=created_at desc
};

export default apiBase;
