import { IconAlertCircle } from "@tabler/icons-react";

interface ErrorMessagePropsType {
  children: React.ReactNode;
}

const ErrorMessage: React.FC<ErrorMessagePropsType> = ({ children }) => {
  return (
    <span className="flex items-center gap-1 text-error">
      {children !== "" && <IconAlertCircle />}
      {children}
    </span>
  );
};

export default ErrorMessage;
