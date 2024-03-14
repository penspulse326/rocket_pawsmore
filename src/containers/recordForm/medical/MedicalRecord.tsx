import { useContext, useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { visitOptions } from '@/common/constants/formText';
import { errorText } from '@/common/constants/messageText';
import { mediaUpload } from '@/common/fetch/mediaManager';
import { fetchAddMedicalCard } from '@/common/fetch/recordCard';
import { fetchFormattedRecord } from '@/common/helpers/fetchFormattedRecord';
import useToken from '@/common/hooks/useToken';
import { setRecordInfo } from '@/common/redux/recordSlice';
import { RootState } from '@/common/redux/store';
import ErrorMessage from '@/components/ErrorMessage';
import Loading from '@/components/hint/Loading';
import { DateContext, PetIdContext } from '@/pages/record_dashboard';
import { VisitType } from '@/common/types/enums';

import ImageInput from '../ImageInput';
import Select from '../Select';

import AreaInput from './AreaInput';
import DateInput from './DateInput';
import NumberInput from './NumberInput';
import TextInput from './TextInput';

interface FormType {
  card: 1;
  cardType: 1;
  reserveType: 0;
  visitType: VisitType | null;
  title: string;
  hospital: string;
  doctor: string;
  medicine: string;
  check: string;
  notice: string;
  cost: number | null;
  photo: File | string | null;
  targetDate: string;
  remindDate: string;
}

const defaultValues: FormType = {
  card: 1,
  cardType: 1,
  reserveType: 0,
  visitType: null,
  title: '',
  hospital: '',
  doctor: '',
  medicine: '',
  check: '',
  notice: '',
  cost: null,
  photo: null,
  targetDate: '',
  remindDate: '',
};

interface PropsType {
  onClose: () => void;
}

const MedicalRecord: React.FC<PropsType> = ({ onClose: handleClose }) => {
  const dispatch = useDispatch();

  const { token } = useToken();
  const petList = useSelector((state: RootState) => state.petList);

  const { petId } = useContext(PetIdContext);
  const { selectedDate } = useContext(DateContext);

  const [petAccount, setPetAccount] = useState('');
  const [birthday, setBirthday] = useState('');
  const [adoptedDate, setAdoptedDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      ...defaultValues,
      targetDate: selectedDate,
    },
  });

  const handleAddMedicalRecord = async (data: FormType) => {
    if (!token) {
      alert('請先登入');
      return;
    }
    if (!petId) {
      alert('請先建立寵物檔案');
      return;
    }

    clearErrors();

    const formData = { ...data };
    const { title, visitType, photo, remindDate } = formData;

    if (!title || !visitType) {
      setError('root', { type: 'manual', message: '請輸入必填項目' });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // 有照片才進行上傳
    if (photo instanceof File) {
      const uploadResult = await mediaUpload(photo, 'medical');
      if (uploadResult) {
        formData.photo = uploadResult.secure_url;
      }
    }

    const response = await fetchAddMedicalCard(token, petId, formData);
    if (!response.ok) {
      alert('新增失敗，請稍後再試');
      setIsLoading(false);
      return;
    }

    // 如果有醫療提醒要再新增一筆
    if (remindDate) {
      const reserveData = {
        card: 1,
        cardType: 0,
        visitType: 0,
        reserveType: visitType,
        reserveDate: remindDate,
        targetDate: remindDate,
      };
      await fetchAddMedicalCard(token, petId, reserveData);
    }

    // 重新取得全部卡片資料
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
      <form onSubmit={handleSubmit(handleAddMedicalRecord)} className='flex flex-col gap-4'>
        <Controller
          name='title'
          control={control}
          render={({ field }) => (
            <TextInput {...field} title='標題' placeholder='請輸入標題' star />
          )}
        />
        <div className='flex items-center justify-between'>
          <span className='font-semibold'>
            看診類型
            <span className='text-error'>*</span>
          </span>
          <div className='flex max-w-[248px] flex-grow items-center'>
            <Controller
              name='visitType'
              control={control}
              render={({ field }) => <Select {...field} title='選擇類型' options={visitOptions} />}
            />
          </div>
        </div>
        <Controller
          name='hospital'
          control={control}
          render={({ field }) => <TextInput {...field} title='醫院' placeholder='請輸入醫院名稱' />}
        />
        <Controller
          name='doctor'
          control={control}
          render={({ field }) => (
            <TextInput {...field} title='獸醫師' placeholder='請輸入獸醫師名稱' />
          )}
        />
        <Controller
          name='medicine'
          control={control}
          render={({ field }) => (
            <TextInput {...field} title='服用藥物' placeholder='請輸入藥品名稱' />
          )}
        />
        <Controller
          name='check'
          control={control}
          render={({ field }) => (
            <AreaInput {...field} title='臨床檢查' placeholder='請輸入臨床檢查結果' />
          )}
        />
        <Controller
          name='notice'
          control={control}
          render={({ field }) => (
            <AreaInput {...field} title='居家注意事項' placeholder='請輸入居家注意事項' />
          )}
        />
        <Controller
          name='cost'
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              title='開銷'
              placeholder='請輸入數字'
              onChange={(value: number) => field.onChange(value)}
            />
          )}
        />
        <Controller
          name='photo'
          control={control}
          render={({ field }) => (
            <ImageInput
              {...field}
              onChange={(file: File | null) => field.onChange(file)}
              setError={() => setError('photo', { message: errorText.IMAGE_OVERSIZE })}
              message={errors.photo?.message}
            />
          )}
        />
        <Controller
          name='remindDate'
          control={control}
          render={({ field }) => (
            <DateInput {...field} title='回診提醒' placeholder='新增提醒日期' type='time' />
          )}
        />
        {errors.root?.message && (
          <div className='flex justify-center'>
            <ErrorMessage>{errors.root?.message}</ErrorMessage>
          </div>
        )}
        <button type='submit' className='mt-2 rounded-full bg-primary py-2 text-white'>
          儲存
        </button>
      </form>
      {isLoading && <Loading />}
    </>
  );
};

export default MedicalRecord;
