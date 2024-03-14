import { AddPostType } from '@/common/constants/types';

import getMediaId from '../helpers/getMediaId';

import apiNext from '../constants/nextApi';
import { mediaDelete } from './mediaManager';

export const fetchGetAllPosts = async () => {
  try {
    const response = await fetch(apiNext.GET_ALL_POSTS, {
      method: 'GET',
    });

    const result = await response.json();

    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};

export const fetchGetFollowingPosts = async (userId: number) => {
  try {
    const response = await fetch(apiNext.GET_FOLLOWING_POSTS(userId), {
      method: 'GET',
    });

    const result = await response.json();

    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};

export const fetchAddPost = async (token: string, data: AddPostType, id: number) => {
  try {
    const response = await fetch(`${apiNext.ADD_POST}/${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await response.json();

    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};

export const fetchGetPetPosts = async (petAccount: string) => {
  try {
    const response = await fetch(apiNext.GET_PET_POSTS(petAccount), {
      method: 'GET',
    });

    const result = await response.json();

    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};

export const fetchGetSinglePost = async (id: number) => {
  try {
    const response = await fetch(`${apiNext.GET_SINGLE_POST}/${id}`, {
      method: 'GET',
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
      method: 'PATCH',
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
  mediaType: 'image' | 'video'
) => {
  try {
    const response = await fetch(`${apiNext.DELETE_POST}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const mediaId = getMediaId(media);
      await mediaDelete(mediaId, mediaType);
    }

    return { ok: response.ok, status: response.status };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};

export const fetchGetSpeciesPosts = async (species: number) => {
  try {
    const response = await fetch(apiNext.GET_SPECIES_POSTS(species), {
      method: 'GET',
    });

    const result = await response.json();

    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};
