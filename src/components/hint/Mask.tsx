import { IconX } from "@tabler/icons-react";
import { ReactNode, useEffect } from "react";

import handleFreezeScroll from "@/common/helpers/handleFreezeScroll";

interface MaskPropsType {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  maskType?: "post" | string;
}

const Mask: React.FC<MaskPropsType> = ({ setIsOpen, children, maskType }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  });

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const target = e.target as HTMLElement;
    if (target.classList.contains("mask")) setIsOpen(false);
    handleFreezeScroll(false);
  };

  return (
    <div
      onClick={handleCloseClick}
      className="mask fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/50"
      tabIndex={0}
    >
      {maskType === "post" && (
        <button type="button" className="fixed top-12 right-12">
          <IconX
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 text-white fill-white"
          />
        </button>
      )}
      {children}
    </div>
  );
};

export default Mask;
