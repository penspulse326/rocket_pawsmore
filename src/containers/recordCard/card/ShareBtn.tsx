import React from "react";
import { IconShare2 } from "@tabler/icons-react";

const ShareBtn: React.FC = () => {
  return (
    <div className="mx-auto">
      <button className="flex gap-x-1 justify-center" type="button">
        <IconShare2 size={24} color={"#203170"} />
        <span className="text-primary">分享到社群</span>
      </button>
    </div>
  );
};

export default ShareBtn;
