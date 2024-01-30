import type { NextApiRequest, NextApiResponse } from "next";
import { UserInfoType } from "@/types";

interface responseType {
  message: string;
  user?: UserInfoType;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>
) {
  const { email, password } = JSON.parse(req.body);
  console.log(email, password);

  if (email !== "test" && password !== "test") {
    res.status(401).json({ message: "登入失敗" });
    return;
  }
  res.status(200).json({
    message: "登入成功",
    user: {
      id: "123",
      username: "琪琪",
      account: "chichi1992126",
      photoUrl: "/test/user-chichi.png",
      introduction: "這是一個測試用的介紹",
    },
  });
}
