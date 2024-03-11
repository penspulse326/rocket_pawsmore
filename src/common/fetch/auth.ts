import { LoginFormType } from '@/containers/Auth/LoginForm';

import apiNext from './apiNext';

export const fetchLogin = async (data: LoginFormType) => {
  try {
    const response = await fetch(apiNext.LOGIN, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return { ok: response.ok, status: response.status, data: result.data };
  } catch (error) {
    return { ok: false, status: 500 };
  }
};

export const fetchSignup = async (data: LoginFormType) => {
  try {
    const response = await fetch(apiNext.SIGN_UP, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return { ok: response.ok, status: response.status };
    }

    return await fetchLogin(data);
  } catch (error) {
    return { ok: false, status: 500 };
  }
};

export const fetchCheckAuth = async (token: string) => {
  try {
    const response = await fetch(apiNext.CHECK_AUTH, {
      method: 'GET',
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
