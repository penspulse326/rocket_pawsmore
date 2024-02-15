const apiUrl = process.env.API_URL;

const apiBase = {
  SIGN_UP: `${apiUrl}/signup`,
  LOGIN: `${apiUrl}/login`,
  CREATE_MEMBER: `${apiUrl}/member/profile/add`,
  CREATE_PET: `${apiUrl}/member/pets`,
  UPDATE_PET: `${apiUrl}/member/pets/update`, // 動態路由 /:petId
  GET_PET_LIST: `${apiUrl}/member/pets/userpets`, // 動態路由 /:userId
  GET_ALL_POST: `${apiUrl}/social/posts/all`,
  ADD_POST: `${apiUrl}/social/posts`, // 動態路由 /:petId
  ADD_COMMENT: (id: string) => `${apiUrl}/social/posts/${id}/comments/add`, // 動態路由 /:postId
};

export default apiBase;
