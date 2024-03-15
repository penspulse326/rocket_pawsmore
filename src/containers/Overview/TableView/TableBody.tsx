import { RecordCardType } from '@/common/constants/types/enums';

import Daily from '../TableBody/Daily';
import Medical from '../TableBody/Medical';
import Moment from '../TableBody/Moment';

interface PropsType {
  cardType: RecordCardType;
}

function TableBody({ cardType }: PropsType) {
  const bodyContent = (prop: RecordCardType) => {
    switch (prop) {
      case RecordCardType.日常紀錄:
        return <Daily />;
      case RecordCardType.醫療紀錄:
        return <Medical />;
      case RecordCardType.重要時刻:
        return <Moment />;
      default:
        return null;
    }
  };

  return <div className='text-left'>{bodyContent(cardType)}</div>;
}

export default TableBody;
