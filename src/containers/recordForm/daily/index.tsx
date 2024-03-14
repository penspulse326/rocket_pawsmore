import { useContext, useState, useEffect } from 'react';

import ToggleGroup from '@/components/ToggleGroup';
import FoodInputs from './FoodInputs';
import CareInputs from './CareInputs';
import SickInputs from './SickInputs';
import Select from '@/components/form/record/Select';
import Loading from '@/components/hint/Loading';

import { unitCategory } from '@/common/constants/formText';
import { DateContext, PetIdContext } from '@/pages/record_dashboard';
import { formatDailyData } from '@/common/helpers/formatDailyData';
import { PooType, UrineType, VomitType } from '@/common/constants/types/enums';
import { fetchAddDailyCard } from '@/common/fetch/recordCard';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/common/redux/store';

import { setRecordInfo } from '@/common/redux/recordSlice';
import { fetchFormattedRecord } from '@/common/helpers/fetchFormattedRecord';
import useToken from '@/common/hooks/useToken';

interface FoodType {
  type: string;
  amount: number;
}

export interface DailyFormStateType {
  weight: number;
  weight_unit: 'kg' | 'g';
  water: number;
  food: FoodType[];
  urine: UrineType;
  poo: PooType;
  vomit: VomitType;
  symptom: string[];
  deworming: string;
  medicine: string;
  injection: string;
  rehab: string;
  selected: string[];
  remark: string;
  targetDate: string;
}

const initialState: DailyFormStateType = {
  weight: 0,
  weight_unit: 'kg',
  water: 0,
  food: [
    {
      type: '乾食',
      amount: 0,
    },
  ],
  urine: 0,
  poo: 0,
  vomit: 0,
  symptom: [],
  deworming: '',
  medicine: '',
  injection: '',
  rehab: '',
  selected: [],
  remark: '',
  targetDate: '',
};

interface PropsType {
  onClose: () => void;
}

const DailyForm: React.FC<PropsType> = ({ onClose: handleClose }) => {
  const dispatch = useDispatch();

  const { token } = useToken();
  const petList = useSelector((state: RootState) => state.petList);

  const [petAccount, setPetAccount] = useState('');
  const [birthday, setBirthday] = useState('');
  const [adoptedDate, setAdoptedDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { selectedDate } = useContext(DateContext);
  const { petId } = useContext(PetIdContext);
  const [formState, setFormState] = useState({
    ...initialState,
    targetDate: selectedDate,
  });

  const handleFoodChange = (value: FoodType[]) => {
    setFormState((prev) => ({ ...prev, food: value }));
  };

  const handleRadioChange = (name: string, value: boolean) => {
    const selected = [...formState.selected];
    let newState = { ...formState };

    if (!value) {
      // 只有症狀會被重置成 []，其他都是 ""
      const newValue = name === 'symptom' ? [] : '';
      selected.splice(selected.indexOf(name), 1);
      newState = { ...newState, [name]: newValue };
    } else {
      selected.push(name);
    }
    setFormState({ ...newState, selected });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiChange = (name: string, value: boolean) => {
    const symptom = [...formState.symptom];

    if (!value) {
      symptom.splice(symptom.indexOf(name), 1);
    } else {
      symptom.push(name);
    }
    setFormState((prev) => ({ ...prev, symptom }));
  };

  const handleTextChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value ? parseInt(value) : 0 }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!token) {
      alert('請先登入');
      return;
    }
    if (!petId) {
      alert('請先建立寵物檔案');
      return;
    }

    const data = formatDailyData(formState);

    setIsLoading(true);

    try {
      const response = await fetchAddDailyCard(token, petId!, data);
      if (!response.ok) {
        alert('新增失敗，請稍後再試');
      }

      handleClose();
    } catch (error) {
      alert('新增失敗，請稍後再試');
      console.log(error);
    }

    await fetchPetRecord();

    setIsLoading(false);
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
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      {isLoading && <Loading />}
      <ToggleGroup title='一般'>
        <ul className='mt-2 flex flex-col gap-4'>
          <li className='flex items-center'>
            <span className='mr-8 font-semibold'>體重</span>
            <input
              name='weight'
              type='number'
              min={0}
              value={formState.weight}
              onChange={(e) => handleNumberChange('weight', e.target.value)}
              className='form-input mr-1 w-16'
            />
            <Select
              title='單位'
              options={unitCategory}
              onChange={(e) => handleSelectChange('weight_unit', e)}
            />
          </li>
          <li>
            <span className='mr-4 font-semibold'>飲水量</span>
            <input
              type='number'
              min={0}
              value={formState.water}
              onChange={(e) => handleNumberChange('water', e.target.value)}
              className='form-input mr-1 w-16'
            />
            <span>ml</span>
          </li>
          <li className='flex'>
            <span className='my-1 mr-8 font-semibold'>進食</span>
            <FoodInputs
              list={formState.food}
              onChange={(value: FoodType[]) => handleFoodChange(value)}
            />
          </li>
        </ul>
      </ToggleGroup>
      <ToggleGroup title='異常'>
        <SickInputs
          formState={formState}
          onRadioChange={handleRadioChange}
          onSelectChange={handleSelectChange}
          onMultiChange={handleMultiChange}
        />
      </ToggleGroup>
      <ToggleGroup title='日常照護'>
        <CareInputs
          formState={formState}
          onRadioChange={handleRadioChange}
          onTextChange={handleTextChange}
        />
      </ToggleGroup>
      <div className='flex flex-col gap-4'>
        <span className='text-note'>備註</span>
        <textarea
          name='remark'
          value={formState.remark}
          onChange={(e) => handleTextChange('remark', e.target.value)}
          placeholder='其他特殊情況或遺漏的資訊，請填寫於此。'
          className='h-24 rounded-[10px] border border-stroke px-4 py-3'
        ></textarea>
      </div>
      <button type='submit' className='rounded-full bg-primary py-2 text-white'>
        儲存
      </button>
    </form>
  );
};

export default DailyForm;
