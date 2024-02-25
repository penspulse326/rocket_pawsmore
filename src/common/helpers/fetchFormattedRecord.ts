import { fetchGetRecord } from "../fetch/petProfile";

import { FetchDataType } from "@/pages/pet/[petAccount]";
import { CardUnionDataType } from "@/types";

import sortData from "./sortData";
import createAnniversaryEvent from "./createAnniversary";

export const fetchFormattedRecord = async (
  petAccount: string,
  petId: number,
  birthday: string,
  adoptedDate: string
) => {
  try {
    const response = await fetchGetRecord(petAccount);
    if (!response.ok) {
      throw new Error("failed");
    }

    const { dailyCards, medicalCards, momentCards }: FetchDataType =
      response.data;
    const recordData: CardUnionDataType[] = [
      ...dailyCards,
      ...medicalCards,
      ...momentCards,
    ];

    const sortedData = sortData(recordData);

    const anniversaryEvent = createAnniversaryEvent(
      birthday,
      adoptedDate,
      petId
    );

    const data = sortedData.concat(anniversaryEvent);
    const combinedData = { petId: petId, data };

    return combinedData;
  } catch (error) {}
};
