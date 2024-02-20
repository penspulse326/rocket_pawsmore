import { DailyDataType, MomentDataType } from "@/types";
import apiNext from "./apiNext";

export const fetchAddDailyCard = async (
  token: string,
  petId: number,
  data: DailyDataType
) => {
  try {
    const response = await fetch(apiNext.ADD_DAILY_CARD(petId), {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};
export const fetchAddMedicalCard = async (
  token: string,
  petId: number,
  data: any
) => {
  try {
    console.log(data);

    const response = await fetch(apiNext.ADD_MEDICAL_CARD(petId), {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};

export const fetchAddMomentCard = async (
  token: string,
  petId: number,
  data: MomentDataType
) => {
  try {
    const response = await fetch(apiNext.ADD_MOMENT_CARD(petId), {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};
