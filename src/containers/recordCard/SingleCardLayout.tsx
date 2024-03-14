import React, { createContext, useContext, useMemo, useState } from 'react';
import { IconChevronUp, IconEdit } from '@tabler/icons-react';

import Title from './card/Title';
import ShareBtn from './card/ShareBtn';

import Moment from './content/Moment';
import Medical from './content/Medical';
import Daily from './content/Daily';
import Reminder from './content/Reminder';
import Anniversary from './content/Anniversary';

import { CardUnionDataType, MedicalCardDataType } from '@/common/constants/types';
import { RecordEventType, MedicalCardType } from '@/common/constants/types/enums';
import UploadView from '@/components/Post/UploadView';
import Mask from '@/components/hint/Mask';
import { PetIdContext } from '@/pages/record_dashboard';

export const DataContext = createContext<CardUnionDataType | undefined>(undefined);

interface DataContextProviderProps {
  children: React.ReactNode;
  data: CardUnionDataType;
}

const DataContextProvider: React.FC<DataContextProviderProps> = ({ children, data }) => {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

interface SingleCardPropsType {
  data: CardUnionDataType;
  id: number;
  isOpened: boolean;
  onToggle: (id: number) => void;
}

const SingleCardLayout: React.FC<SingleCardPropsType> = ({ data, id, isOpened, onToggle }) => {
  const { petId } = useContext(PetIdContext);
  const getData = useMemo(() => data, [data]);
  const { card } = data;
  const isAnniversary: boolean = card === RecordEventType.紀念日;

  const [isUploadViewOpen, setIsUploadViewOpen] = useState(false);

  const Content: React.FC = () => {
    const visitType = (data as MedicalCardDataType).visitType;

    if (MedicalCardType[visitType] === '醫療提醒') {
      return <Reminder data={data} />;
    } else {
      switch (RecordEventType[card]) {
        case '醫療紀錄':
          return <Medical data={data} />;
        case '重要時刻':
          return <Moment data={data} />;
        case '日常紀錄':
          return <Daily data={data} />;
        case '紀念日':
          return <Anniversary />;
        default:
          return null;
      }
    }
  };

  const handleUploadViewOpen = () => {
    setIsUploadViewOpen(true);
  };

  return (
    <DataContext.Provider value={getData}>
      {isUploadViewOpen && (
        <Mask setIsOpen={setIsUploadViewOpen}>
          <UploadView setIsOpen={setIsUploadViewOpen} card={data} petId={petId!} />
        </Mask>
      )}
      <div className='flex flex-col gap-y-6 rounded-[30px] border border-stroke px-6 py-4'>
        {/* title */}
        <div className='flex items-center justify-between'>
          <Title />
          {/* icons */}
          <div className='flex gap-x-2'>
            {isOpened && !isAnniversary && (
              <IconEdit size={24} color={'#203170'} className='hover:cursor-pointer' />
            )}
            <IconChevronUp
              size={24}
              color={'#808080'}
              className={`${!isOpened && 'rotate-180'} duration-300 hover:cursor-pointer`}
              onClick={() => onToggle(id)}
            />
          </div>
        </div>
        {/* content */}
        {isOpened && (
          <>
            <Content />
            <div className='flex justify-center' onClick={() => handleUploadViewOpen()}>
              {isAnniversary || <ShareBtn />}
            </div>
          </>
        )}
      </div>
    </DataContext.Provider>
  );
};

export default SingleCardLayout;
