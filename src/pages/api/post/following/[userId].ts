import { PostDataType } from '@/common/constants/types';
import { sortPostsByDate } from '@/common/helpers/configurePosts';

import apiBase from '../../../../common/constants/baseApi';

import type { NextApiRequest, NextApiResponse } from 'next';

interface ResponseType {
  statusCode?: number;
  message: string;
  data?: PostDataType[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const userId = req.query.userId as string;

  try {
    const response = await fetch(apiBase.GET_FOLLOWING_POSTS(userId), {
      method: 'GET',
    });

    const result = await response.json();
    const { message, data } = result;

    res.status(200).json({ message, data });
  } catch (error) {
    res.status(500).json({ message: '未知的錯誤' });
  }
}
