import { IconX } from "@tabler/icons-react";
import { ReactNode } from "react";

export default function Mask({ setIsOpen, children, maskType }: MaskPropsType) {
  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    console.log(target.classList.contains("mask"));
    if (target.classList.contains("mask")) setIsOpen(false);
  };

  return (
    <div
      onClick={handleCloseClick}
      className="mask fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/50"
    >
      {maskType === "post" && (
        <button type="button" className="fixed top-12 right-12">
          <IconX
            onClick={() => setIsOpen(false)}
            className="close-btn w-10 h-10 text-white fill-white"
          />
        </button>
      )}
      {children}
    </div>
  );
}

type MaskPropsType = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  maskType: "post" | string;
};
