import { useState, useEffect } from "react";

const useUser = () => {
  const [token, setToken] = useState<string>();
  const [userId, setUserId] = useState<string>();

  // 從 cookies 中得到 token 和 user ID
  useEffect(() => {
    const getCookieValue = (name: string) => {
      const value = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`));
      return value ? value.split("=")[1] : null;
    };

    const token = getCookieValue("token");
    const userId = getCookieValue("userId");

    if (token) setToken(token);
    if (userId) setUserId(userId);
  }, []);

  // 更新 token 和 user ID
  const updateUser = (newToken: string, newUserId: string) => {
    setToken(newToken);
    setUserId(newUserId);
    document.cookie = `token=${newToken}; path=/; Secure; SameSite=Strict`;
    document.cookie = `userId=${newUserId}; path=/; Secure; SameSite=Strict`;
  };

  // 清除 token 和 user ID
  const clearUser = () => {
    setToken(undefined);
    setUserId(undefined);
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1900 00:00:00 GMT; Secure; SameSite=Strict";
    document.cookie =
      "userId=; path=/; expires=Thu, 01 Jan 1900 00:00:00 GMT; Secure; SameSite=Strict";
  };

  return {
    token,
    userId,
    updateUser,
    clearUser,
  };
};

export default useUser;
