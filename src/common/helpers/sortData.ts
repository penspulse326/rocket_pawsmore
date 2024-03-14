import moment from 'moment';

import { CardUnionDataType, MedicalCardDataType } from '@/common/constants/types';
import { MedicalCardType } from '@/common/constants/types/enums';

const sortData = (data: CardUnionDataType[]) => {
  // 將醫療提醒類卡片資料置頂
  const sortedData: CardUnionDataType[] = [];

  data
    .sort((a, b) => {
      const targetDateA = a.targetDate;
      const targetDateB = b.targetDate;

      return moment(targetDateB).diff(moment(targetDateA));
    })
    .forEach((data) => {
      const { cardType } = data as MedicalCardDataType;
      if (cardType === MedicalCardType.醫療提醒) {
        sortedData.unshift(data);
      } else {
        sortedData.push(data);
      }
    });

  return sortedData;
};

export default sortData;
