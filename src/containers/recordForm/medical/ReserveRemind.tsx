import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { reserveOptions } from '@/common/constants/formText';
import { fetchAddMedicalCard } from '@/common/fetch/recordCard';
import { fetchFormattedRecord } from '@/common/helpers/fetchFormattedRecord';
import useToken from '@/common/hooks/useToken';
import { setRecordInfo } from '@/common/redux/recordSlice';
import { RootState } from '@/common/redux/store';
import ErrorMessage from '@/components/ErrorMessage';
import RadioCheck from '@/components/form/record/RadioCheck';
import Loading from '@/components/hint/Loading';
import { DateContext, PetIdContext } from '@/pages/record_dashboard';
import { VisitType } from '@/common/constants/types/enums';

import Select from '../Select';

import DateInput from './DateInput';

interface FormType {
  card: number;
  cardType: number;
  visitType: number;
  reserveType: null | VisitType;
  reserveDate: string;
  targetDate: string;
}

interface PropsType {
  onClose: () => void;
}

const ReserveRemind: React.FC<PropsType> = ({ onClose: handleClose }) => {
  const dispatch = useDispatch();

  const { token } = useToken();
  const { petId } = useContext(PetIdContext);
  const [petAccount, setPetAccount] = useState('');
  const [birthday, setBirthday] = useState('');
  const [adoptedDate, setAdoptedDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const petList = useSelector((state: RootState) => state.petList);

  const defaultValues: FormType = {
    card: 1,
    cardType: 0,
    visitType: 0,
    reserveType: null,
    reserveDate: '',
    targetDate: '',
  };

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues,
  });

  const handleAddReserveRemind = async (data: FormType) => {
    if (!token) {
      alert('請先登入');
      return;
    }
    if (!petId) {
      alert('請先建立寵物檔案');
      return;
    }
    const formData = { ...data };

    formData.targetDate = data.reserveDate;

    const { reserveType, reserveDate } = formData;
    if (reserveType === null || !reserveDate) {
      setError('root', { type: 'manual', message: '請選擇類型與日期' });
      return;
    }

    setIsLoading(true);
    const response = await fetchAddMedicalCard(token, petId, data);

    if (!response.ok) {
      setError('card', {
        type: 'manual',
        message: '新增失敗，請稍後再試',
      });
      setIsLoading(false);
      return;
    }

    await fetchPetRecord();
    setIsLoading(false);
    handleClose();
  };

  const fetchPetRecord = async () => {
    try {
      if (petAccount && petId) {
        const recordData = await fetchFormattedRecord(petAccount, petId, birthday, adoptedDate);
        dispatch(setRecordInfo(recordData));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (petId) {
      const foundPet = petList.find((pet) => pet.petId === petId);
      if (foundPet) {
        setPetAccount(foundPet.petAccount);
        setBirthday(foundPet.birthday);
        setAdoptedDate(foundPet.adoptedDate);
      }
    }
  }, [petId]);

  return (
    <>
      <form onSubmit={handleSubmit(handleAddReserveRemind)} className='flex flex-col gap-4'>
        <RadioCheck name='醫療提醒' text='新增提醒日期' checked onChange={() => {}} />
        <div className='flex items-center justify-between'>
          <span className='font-semibold'>提醒類型</span>
          <div className='flex max-w-[248px] flex-grow items-center'>
            <Controller
              name='reserveType'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  title='選擇類型'
                  options={reserveOptions}
                  message={errors.reserveType?.message}
                />
              )}
            />
          </div>
        </div>
        <Controller
          name='reserveDate'
          control={control}
          render={({ field }) => (
            <DateInput
              {...field}
              title='預約日期'
              placeholder='選擇日期與時間'
              type='time'
              message={errors.reserveDate?.message}
            />
          )}
        />
        <div className='mt-2 flex justify-center'>
          <ErrorMessage>{errors.root?.message}</ErrorMessage>
        </div>
        <button type='submit' className='rounded-full bg-primary py-2 pt-2 text-white'>
          儲存
        </button>
      </form>
      {isLoading && <Loading />}
    </>
  );
};

export default ReserveRemind;
