import { fetchGetRecord } from "../fetch/petProfile";

import { FetchDataType } from "@/pages/pet/[petAccount]";
import { CardUnionDataType } from "@/types";

import sortData from "./sortData";

export const fetchFormattedRecord = async (
  petAccount: string,
  petId: number
) => {
  try {
    const response = await fetchGetRecord(petAccount);
    if (!response.ok) {
      throw new Error("failed");
    }

    const { dailyCards, medicalCards, momentCards }: FetchDataType =
      response.data;
    const data: CardUnionDataType[] = [
      ...dailyCards,
      ...medicalCards,
      ...momentCards,
    ];

    const sortedData = sortData(data);

    const recordData = {
      petId: petId,
      data: sortedData,
    };

    return recordData;
  } catch (error) {}
};
