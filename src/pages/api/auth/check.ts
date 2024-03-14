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

  try {
    const response = await fetch(apiBase.CHECK_AUTH, {
      method: 'GET',
      headers: {
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
    // 一律拋出未知的錯誤 只有在此 Server 端可以查看詳細錯誤
    console.error('Error:', error);
    res.status(500).json({ message: '未知的錯誤' });
  }
}
