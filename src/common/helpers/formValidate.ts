import { Dispatch, SetStateAction, useState } from "react";
import { FormValidateType } from "@/types";

export const emailValidate = (email: string) => {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return reg.test(email);
};

export const passwordValidate = (password: string) => {
  const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return reg.test(password);
};

type useValidatorReturnType = any;

export const useValidator = (
  initailState: FormValidateType
): useValidatorReturnType => {
  const [validation, setValidation] = useState(initailState);

  const handleValidate = (data: Record<string, string>) => {
    const newFields = { ...validation.fields }; // 创建一个新的 fields 对象
    let isValid = true;

    Object.entries(newFields).forEach(([key, field]) => {
      if (field.required && !data[key]) {
        newFields[key] = {
          ...field,
          message: "必填",
        };
        isValid = false;
      } else if (field.validate && !field.validate(data[key])) {
        newFields[key] = {
          ...field,
          message: "验证失败",
        };
        isValid = false;
      }
    });

    setValidation({
      isValid,
      fields: newFields,
    });
  };

  return [validation, handleValidate];
};
