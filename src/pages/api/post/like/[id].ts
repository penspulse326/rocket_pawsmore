import apiBase from '../../../../common/constants/baseApi';

import type { NextApiRequest, NextApiResponse } from 'next';

interface ResponseType {
  statusCode?: number;
  message: string;
  data?: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: '請重新登入' });
  }

  const id = req.query.id as string;

  try {
    const response = await fetch(`${apiBase.LIKE_POST(id)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    const result = await response.json();
    const { message } = result;

    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ message: '未知的錯誤' });
  }
}
