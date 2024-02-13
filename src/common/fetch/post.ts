import apiNext from "./apiNext";

export const fetchGetAllPosts = async (token: string) => {
  try {
    const response = await fetch(apiNext.GET_ALL_POSTS, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await response.json();

    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};
