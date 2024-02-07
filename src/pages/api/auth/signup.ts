import type { NextApiRequest, NextApiResponse } from "next";
import { UserInfoType } from "@/types";
import { apiSignUp } from "../base";

interface responseType {
  message: string;
  user?: UserInfoType;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>
) {
  const { email, password } = JSON.parse(req.body);
  const data = { email, password };

  try {
    const response = await fetch(apiSignUp, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.status === "Error") {
      const { statusCode, message } = result;
      res.status(statusCode).json({ message });
      return;
    }

    res.status(200).json({
      message: result.message,
      user: {
        id: "123",
        username: "琪琪",
        account: "chichi1992126",
        photoUrl: "/test/user-chichi.png",
      },
    });
  } catch (error) {
    res.status(500).json({ message: "未知的錯誤" });
  }
}
