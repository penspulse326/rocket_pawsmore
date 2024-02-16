import { AddPostType } from "@/types";
import apiNext from "./apiNext";
import getMediaId from "../helpers/getMediaId";
import { mediaDelete } from "./mediaManager";

export const fetchGetAllPosts = async () => {
  try {
    const response = await fetch(apiNext.GET_ALL_POSTS, {
      method: "GET",
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

export const fetchGetPetPost = async (id: number) => {
  try {
    const response = await fetch(`${apiNext.GET_PET_POSTS}/${id}`, {
      method: "GET",
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

export const fetchDeletePost = async (
  token: string,
  id: number,
  media: string,
  mediaType: string
) => {
  try {
    const response = await fetch(`${apiNext.DELETE_POST}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const mediaId = getMediaId(media);
      const response = await mediaDelete(mediaId, mediaType);
      console.log(response);
    }

    return { ok: response.ok, status: response.status };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};
