import React, { useContext } from "react";
import { DataContext } from "../SingleCardLayout";

const Anniversary: React.FC = () => {
  const data = useContext(DataContext);
  if (!data) {
    return null;
  }
  const { content } = data;

  return (
    <ol className="flex gap-x-12">
      <li className="font-semibold min-w-[64px]">週年紀念</li>
      <li>{content}</li>
    </ol>
  );
};

export default Anniversary;
