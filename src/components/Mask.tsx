import { IconX } from "@tabler/icons-react";
import { ReactNode } from "react";

export default function Mask({ setIsOpen, children }: MaskPropsType) {
  const handleCloseClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (
      target.classList.contains("mask") ||
      target.classList.contains("close-btn")
    ) {
      setIsOpen(false);
    }
  };

  return (
    <div
      onClick={handleCloseClick}
      className="mask fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/50"
    >
      <button type="button" className="fixed top-12 right-12">
        <IconX className="close-btn w-10 h-10 text-white fill-white " />
      </button>
      {children}
    </div>
  );
}

type MaskPropsType = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};
