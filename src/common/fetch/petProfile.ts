import apiNext from "./apiNext";

import type { PetFormType } from "@/types";

export const fetchCreatePet = async (data: PetFormType, token: string) => {
  const { petPhoto, ...rest } = data;

  try {
    const response = await fetch(apiNext.CREATE_PET, {
      method: "POST",
      body: JSON.stringify({ ...rest }),
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await response.json();

    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};

export const fetchUpdatePet = async (
  data: PetFormType,
  token: string,
  imgUrl = "",
  petId: number
) => {
  const { petPhoto, ...rest } = data;

  try {
    const response = await fetch(`${apiNext.UPDATE_PET}/${petId}`, {
      method: "PATCH",
      body: JSON.stringify({ ...rest, petPhoto: imgUrl }),
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await response.json();

    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};

export const fetchGetPetList = async (userId: number) => {
  try {
    const response = await fetch(`${apiNext.GET_PETS}/${userId}`, {
      method: "GET",
    });

    const result = await response.json();
    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};

export const fetchGetPet = async (petAccount: string) => {
  try {
    const response = await fetch(`${apiNext.GET_PET}/${petAccount}`, {
      method: "GET",
    });

    const result = await response.json();
    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};

export const fetchGetPost = async (petAccount: string) => {
  try {
    const response = await fetch(`${apiNext.GET_PET_POST}/${petAccount}`, {
      method: "GET",
    });

    const result = await response.json();
    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};

export const fetchGetRecord = async (petAccount: string) => {
  try {
    const response = await fetch(`${apiNext.GET_PET_RECORD}/${petAccount}`, {
      method: "GET",
    });

    const result = await response.json();
    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};

export const fetchGetMilestone = async (petAccount: string) => {
  try {
    const response = await fetch(
      `${apiNext.GET_MILESTONE_LIST}/${petAccount}`,
      {
        method: "GET",
      }
    );

    const result = await response.json();
    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};
