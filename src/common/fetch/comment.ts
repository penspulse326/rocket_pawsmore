import apiNext from "./apiNext";

export const fetchGetComment = async (id: number) => {
  try {
    const response = await fetch(`${apiNext.GET_COMMENT}/${id}`, {
      method: "GET",
    });

    const result = await response.json();

    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};

export const fetchAddComment = async (
  token: string,
  data: { commentContent: string },
  id: number
) => {
  try {
    const response = await fetch(`${apiNext.ADD_COMMENT}/${id}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await response.json();

    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};

export const fetchDeleteComment = async (
  token: string,
  postId: number,
  commentId: number
) => {
  try {
    const response = await fetch(
      `${apiNext.DELETE_COMMENT(postId, commentId)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};
