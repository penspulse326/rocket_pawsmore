import { IconX } from "@tabler/icons-react";

export default function Mask({ setIsOpen }: MaskPropsType) {
  return (
    <div className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/50">
      <button type="button" className="fixed top-12 right-12">
        <IconX
          className="w-10 h-10 text-white fill-white "
          onClick={() => setIsOpen(false)}
        />
      </button>
    </div>
  );
}

type MaskPropsType = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
