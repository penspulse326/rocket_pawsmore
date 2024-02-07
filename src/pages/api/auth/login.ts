import type { NextApiRequest, NextApiResponse } from "next";
import { apiLogin } from "../base";

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

  try {
    const response = await fetch(apiLogin, {
      method: "POST",
      body: requestBody,
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    const { statusCode, message, data } = result;
    console.log(result);

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
    console.error("Error:", error);
    res.status(500).json({ message: "未知的錯誤" });
  }
}
