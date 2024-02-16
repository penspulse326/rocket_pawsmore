import { useState, useEffect } from "react";

const useToken = () => {
  const [token, setToken] = useState<string>();

  // 得到 token
  useEffect(() => {
    const getTokenFromCookies = () => {
      const tokenString = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));
      return tokenString ? tokenString.split("=")[1] : null;
    };

    const token = getTokenFromCookies();
    if (token) setToken(token);
  }, []);

  // 更新 token
  const updateToken = (newToken: string) => {
    setToken(newToken);
    document.cookie = `token=${newToken}; path=/; Secure; SameSite=Strict`;
  };

  // 清除 token
  const clearToken = () => {
    setToken(undefined);
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1900 00:00:00 GMT; Secure; SameSite=Strict";
  };

  return {
    token,
    setToken: updateToken,
    clearToken,
  };
};

export default useToken;
