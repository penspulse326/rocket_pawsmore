import apiBase from '../../../common/constants/baseApi';

import type { NextApiRequest, NextApiResponse } from 'next';

interface ResponseType {
  statusCode?: number;
  message: string;
  data?: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  try {
    const response = await fetch(apiBase.GET_ALL_POSTS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    const { message, data } = result;

    res.status(200).json({ message, data });
  } catch (error) {
    res.status(500).json({ message: '未知的錯誤' });
  }
}
