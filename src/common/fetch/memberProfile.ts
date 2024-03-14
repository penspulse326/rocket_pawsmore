import apiNext from './apiNext';

import type { MemberFormType } from '@/common/types';

export const fetchCreateMember = async (data: MemberFormType, token: string, imgUrl?: string) => {
  const { headShot, ...rest } = data;

  try {
    const response = await fetch(apiNext.CREATE_MEMBER, {
      method: 'POST',
      body: JSON.stringify({ ...rest, headShot: imgUrl }),
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
