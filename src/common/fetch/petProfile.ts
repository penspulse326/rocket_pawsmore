import { PetFormType } from "@/types";
import apiNext from "./apiNext";

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
    return { ok: false, status: 500, data: null };
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
    return { ok: false, status: 500, data: null };
  }
};
