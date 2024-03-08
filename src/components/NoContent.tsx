import React from "react";
import Image from "next/image";

const NoContent: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 pt-[64px]">
      <Image
        src="/icons/icon-paw-gradient.svg"
        width={162}
        height={162}
        alt="no content"
      />
      <div className="text-2xl">尚無內容</div>
    </div>
  );
};

export default NoContent;
