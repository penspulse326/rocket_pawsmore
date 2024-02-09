const apiUrl = process.env.API_URL;

const apiBase = {
  SIGN_UP: `${apiUrl}/signup`,
  LOGIN: `${apiUrl}/login`,
  CREATE_MEMBER: `${apiUrl}/member/profile/add`,
};

export default apiBase;
