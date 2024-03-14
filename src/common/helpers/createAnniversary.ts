import moment from 'moment';

import { RecordEventType, AnniversaryType } from '@/common/types/enums';

const createAnniversaryEvent = (birthday: string, adoptedDate: string | null, petId: number) => {
  const anniversaryEvent = [];
  const futureYears = 20;

  for (let i = 0; i < futureYears; i++) {
    const birthdayDate = moment(birthday).add(i, 'years').format('YYYY-MM-DD');
    const id = Number(`${petId}${moment(birthdayDate).format('YYYYMMDD')}`);

    const birthdayEvent = {
      cardId: id,
      card: RecordEventType.紀念日,
      desc: `第 ${i} 週年`,
      createDate: moment().format('YYYY-MM-DD'),
      targetDate: birthdayDate,
      anniversaryType: AnniversaryType.生日,
    };
    anniversaryEvent.push(birthdayEvent);
  }

  if (adoptedDate) {
    for (let i = 0; i < futureYears; i++) {
      const date = moment(adoptedDate).add(i, 'years').format('YYYY-MM-DD');
      const id = Number(`${petId}${moment(date).format('YYYYMMDD')}`);

      const adoptedDateEvent = {
        cardId: id,
        card: RecordEventType.紀念日,
        desc: `第 ${i} 週年`,
        createDate: moment().format('YYYY-MM-DD'),
        targetDate: date,
        anniversaryType: AnniversaryType.領養日,
      };
      anniversaryEvent.push(adoptedDateEvent);
    }
  }

  return anniversaryEvent;
};

export default createAnniversaryEvent;
