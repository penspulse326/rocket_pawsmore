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
    const response = await fetch(apiBase.GET_SPECIES_POSTS(species as string), {
      method: 'GET',
    });

    const result = await response.json();
    const { statusCode, message, data } = result;

    res.status(statusCode).json({ message, data });
  } catch (error) {
    res.status(500).json({ message: '未知的錯誤' });
  }
}
