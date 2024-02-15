import type { NextApiRequest, NextApiResponse } from "next";
import apiBase from "../../apiBase";

interface ResponseType {
  statusCode?: number;
  message: string;
  data?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "請重新登入" });
  }

  const id = req.query.id;

  try {
    const response = await fetch(`${apiBase.GET_PET_LIST}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const result = await response.json();
    const { message, data } = result;

    res.status(200).json({ message, data });
  } catch (error) {
    res.status(500).json({ message: "未知的錯誤" });
  }
}
