import { careCategory } from "@/common/lib/formText";
import { DailyFormStateType } from "@/containers/recordForm/daily/DailyForm";

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
    <ul className="flex flex-col gap-4 mt-2">
      {dataSet.map(([NAME, { TITLE, PLACEHOLDER }]) => {
        const isSelected = formState.selected.includes(NAME);

        return (
          <li key={NAME} className="flex items-center h-8 text-nowrap">
            <span className="mr-8 font-semibold">{TITLE}</span>
            <div className="flex items-center gap-4">
              {/* 勾選 無 */}
              <label>
                <input
                  type="radio"
                  name={NAME}
                  defaultChecked
                  onChange={() => handleRadioChange(NAME, false)}
                  className="mr-1"
                />
                無
              </label>
              {/* 勾選 有 */}
              <label>
                <input
                  type="radio"
                  name={NAME}
                  onChange={() => handleRadioChange(NAME, true)}
                  className="mr-1"
                />
                有
              </label>
              {isSelected && (
                <input
                  type="text"
                  name={NAME}
                  onChange={(e) => handleTextChange(NAME, e.target.value)}
                  placeholder={PLACEHOLDER}
                  className="form-input w-full"
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
