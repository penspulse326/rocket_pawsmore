import { careCategory } from '@/common/constants/formText';
import RadioCheck from '@/components/form/record/RadioCheck';
import { DailyFormStateType } from '@/containers/recordForm/daily';

interface PropsType {
  formState: DailyFormStateType;
  onRadioChange: (name: string, value: boolean) => void;
  onTextChange: (name: string, value: string) => void;
}

const CareInputList: React.FC<PropsType> = ({
  formState,
  onRadioChange: handleRadioChange,
  onTextChange: handleTextChange,
}) => {
  const dataSet = Object.entries(careCategory);

  return (
    <ul className='mt-2 flex flex-col gap-4'>
      {dataSet.map(([NAME, { TITLE, PLACEHOLDER }]) => {
        const isSelected = formState.selected.includes(NAME);

        return (
          <li key={NAME} className='flex h-8 items-center text-nowrap'>
            <span className='mr-8 font-semibold'>{TITLE}</span>
            <div className='flex items-center gap-4'>
              {/* 勾選 無 */}
              <RadioCheck
                text='無'
                name={NAME}
                checked={!isSelected}
                onChange={() => handleRadioChange(NAME, false)}
              />
              {/* 勾選 有 */}
              <RadioCheck
                text='有'
                name={NAME}
                checked={isSelected}
                onChange={() => handleRadioChange(NAME, true)}
              />
              {isSelected && (
                <input
                  type='text'
                  name={NAME}
                  onChange={(e) => handleTextChange(NAME, e.target.value)}
                  placeholder={PLACEHOLDER}
                  className='form-input w-full'
                />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CareInputList;
