import apiBase from '../../../../common/constants/baseApi';

import type { NextApiRequest, NextApiResponse } from 'next';

interface ResponseType {
  statusCode?: number;
  message: string;
  data?: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { species } = req.query;

  try {
    const response = await fetch(apiBase.GET_SPECIES_ACCOUNTS(species as string), {
      method: 'GET',
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
