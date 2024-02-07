import type { NextApiRequest, NextApiResponse } from "next";
import { apiSignUp } from "../base";

interface ResponseType {
  statusCode?: number;
  status?: "Success" | "Error";
  message: string;
  data?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const requestBody = req.body;

  console.log(requestBody);

  try {
    const response = await fetch(apiSignUp, {
      method: "POST",
      body: requestBody,
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    const { statusCode, message } = result;

    switch (statusCode) {
      case 200:
        res.status(200).json({ message });
        break;
      default:
        res.status(statusCode).json({ message });
        break;
    }
  } catch (error) {
    res.status(500).json({ message: "未知的錯誤" });
  }
}
