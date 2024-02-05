import type { NextApiRequest, NextApiResponse } from "next";
import { UserInfoType } from "@/types";
import { emailValidate } from "@/common/helpers/formValidate";
import { apiSignUp } from "../base";

interface responseType {
  message: string;
  errorType?: string;
  user?: UserInfoType;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>
) {
  const { email, password } = JSON.parse(req.body);

  // 驗證 email 格式
  if (!emailValidate(email)) {
    res.status(401).json({
      message: "email 格式錯誤",
      errorType: "email",
    });
  }

  // 驗證密碼格式
  if (password.length < 6) {
    res.status(401).json({
      message: "密碼格式錯誤",
      errorType: "password",
    });
  }

  res.status(200).json({
    message: "註冊成功",
    user: {
      id: "123",
      username: "琪琪",
      account: "chichi1992126",
      photoUrl: "/test/user-chichi.png",
      introduction: "這是一個測試用的介紹",
    },
  });

  // try {
  //   const response = await fetch(apiSignUp, {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const result = await response.json();

  //   res.status(200).json({
  //     message: result,
  //     user: {
  //       id: "123",
  //       username: "琪琪",
  //       account: "chichi1992126",
  //       photoUrl: "/test/user-chichi.png",
  //       introduction: "這是一個測試用的介紹",
  //     },
  //   });
  // } catch (error) {
  //   res.status(401).json({ message: "註冊失敗" });
  // }
}
