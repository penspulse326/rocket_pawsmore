import type { NextApiRequest, NextApiResponse } from "next";
import { UserInfoType } from "@/types";

interface responseType {
  message: string;
  user?: UserInfoType;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>
) {
  const { email, password } = JSON.parse(req.body);

  const data = {
    UserName: email,
    Password: password,
  };

  try {
    const response = await fetch("http://4.224.41.94/api/petlogin/general", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    res.status(200).json({
      message: result,
      user: {
        id: "123",
        username: "琪琪",
        account: "chichi1992126",
        photoUrl: "/test/user-chichi.png",
        introduction: "這是一個測試用的介紹",
      },
    });
  } catch (error) {
    res.status(401).json({ message: "登入失敗" });
  }
}