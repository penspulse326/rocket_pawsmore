import { IconAlertCircle } from "@tabler/icons-react";

interface PropsType {
  children: React.ReactNode;
}

function ErrorMessage({ children }): PropsType{
  return (
    <span className="flex items-center gap-1 text-error">
      {children && <IconAlertCircle />}
      {children}
    </span>
  );
};

export default ErrorMessage;
