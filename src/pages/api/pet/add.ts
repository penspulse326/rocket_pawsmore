import apiBase from '../../../common/constants/baseApi';

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

  const requestBody = req.body;

  try {
    const response = await fetch(apiBase.CREATE_PET, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    const result = await response.json();
    const { statusCode, message, data } = result;

    switch (statusCode) {
      case 200:
        res.status(200).json({ message, data });
        break;
      default:
        res.status(statusCode).json({ message });
        break;
    }
  } catch (error) {
    res.status(500).json({ message: '未知的錯誤' });
  }
}
