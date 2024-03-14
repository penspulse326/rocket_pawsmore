import moment from 'moment';

import { CardUnionDataType, MedicalCardDataType } from '@/types';
import { MedicalCardType } from '@/types/enums';

export interface SortedDataType {
  ageInMonth: number;
  events: {
    date: string;
    events: CardUnionDataType[];
  }[];
}

function sortByAge(originalData: CardUnionDataType[], birthday: string): SortedDataType[] {
  const sortedData: SortedDataType[] = [];

  originalData
    .sort((a, b) => {
      const typeA = (a as MedicalCardDataType).cardType;
      const typeB = (b as MedicalCardDataType).cardType;

      const reserveDateA = (a as MedicalCardDataType).reserveDate;
      const reserveDateB = (b as MedicalCardDataType).reserveDate;

      const dateA =
        MedicalCardType[typeA] === '醫療提醒' ? moment(reserveDateA) : moment(a.targetDate);
      const dateB =
        MedicalCardType[typeB] === '醫療提醒' ? moment(reserveDateB) : moment(b.targetDate);

      if (dateA.isAfter(dateB)) return -1;
      if (dateA.isBefore(dateB)) return 1;

      return 0;
    })
    .forEach((event) => {
      const { targetDate } = event;
      const { cardType, reserveDate } = event as MedicalCardDataType;

      const date = (MedicalCardType[cardType] === '醫療提醒' && reserveDate) || targetDate;
      const ageInMonth = moment(date).diff(moment(birthday).format('YYYY-MM-DD'), 'month');

      let ageGroup = sortedData.find((group) => group.ageInMonth === ageInMonth);
      if (!ageGroup) {
        ageGroup = { ageInMonth, events: [] };
        sortedData.push(ageGroup);
      }

      let dateGroup = ageGroup.events.find(
        (group) => group.date === moment(date).format('YYYY-MM-DD')
      );
      if (!dateGroup) {
        dateGroup = { date: moment(date).format('YYYY-MM-DD'), events: [] };
        ageGroup.events.push(dateGroup);
      }
      dateGroup.events.push(event);
    });
  return sortedData;
}

export default sortByAge;
