import { AddPostType } from "@/types";
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

export const fetchAddPost = async (
  token: string,
  data: AddPostType,
  id: number
) => {
  try {
    const response = await fetch(`${apiNext.ADD_POST}/${id}`, {
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

export const fetchLikePost = async (token: string, id: number) => {
  try {
    const response = await fetch(`${apiNext.LIKE_POST}/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    return { ok: response.ok, status: response.status };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};
