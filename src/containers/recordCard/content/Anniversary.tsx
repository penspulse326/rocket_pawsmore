import React, { useContext } from "react";
import { DataContext } from "../SingleCardLayout";
import { AnniversaryCardDataType } from "@/types";

const Anniversary: React.FC = () => {
  const data = useContext(DataContext);
  if (!data) {
    return null;
  }
  const { desc } = data as AnniversaryCardDataType;

  return (
    <ol className="flex gap-x-12">
      <li className="font-semibold min-w-[64px]">週年紀念</li>
      <li>{desc}</li>
    </ol>
  );
};

export default Anniversary;
