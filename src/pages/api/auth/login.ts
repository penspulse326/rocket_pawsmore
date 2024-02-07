import type { NextApiRequest, NextApiResponse } from "next";
import { UserInfoType } from "@/types";
import { apiLogin } from "../base";

interface responseType {
  message: string;
  user?: UserInfoType;
  statusCode?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>
) {
  const { email, password } = JSON.parse(req.body);

  const data = {
    Email: email,
    Password: password,
  };

  try {
    const response = await fetch(apiLogin, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    switch (result.statusCode) {
      case 200:
        res.status(200).json({
          message: result.message,
          user: {
            id: result.data.userId,
            username: result.data.username || "琪琪",
            account: result.data.account || "chichi1992126",
            photoUrl: result.data.headShot || "/test/user-chichi.png",
          },
        });
        break;
      default:
        res
          .status(result.statusCode)
          .json({ message: result.message, statusCode: result.statusCode });
        break;
    }
  } catch (error) {
    res.status(500).json({ message: "伺服器錯誤" });
  }
}
