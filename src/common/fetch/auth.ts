import apiNext from "./apiNext";

import type { LoginFormType } from "@/types";

export const fetchLogin = async (data: LoginFormType) => {
  try {
    const response = await fetch(apiNext.LOGIN, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    console.error("未知的錯誤");
    return { ok: false, status: 500 };
  }
};

export const fetchSignup = async (data: LoginFormType) => {
  try {
    const response = await fetch(apiNext.SIGN_UP, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return { ok: response.ok, status: response.status };
    }

    return await fetchLogin(data);
  } catch (error) {
    console.error("未知的錯誤");
    return { ok: false, status: 500 };
  }
};
