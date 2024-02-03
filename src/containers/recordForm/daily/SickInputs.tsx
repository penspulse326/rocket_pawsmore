import { sickCategory } from "@/common/lib/formText";
import { DailyFormStateType } from "./DailyForm";
import Select from "@/components/select/Select";

interface SickInputsPropsType {
  formState: DailyFormStateType;
  onRadioChange: (name: string, value: boolean) => void;
  onSelectChange: (name: string, value: string) => void;
  onMultiChange: (name: string, value: boolean) => void;
}

const SickInputs: React.FC<SickInputsPropsType> = ({
  formState,
  onRadioChange: handleRadioChange,
  onSelectChange: handleSelectChange,
  onMultiChange: handleMultiChange,
}) => {
  const dataSet = Object.entries(sickCategory);

  return (
    <ul className="flex flex-col gap-4 mt-2">
      {dataSet.map(([NAME, { TITLE, INPUT_TYPE, OPTIONS }]) => {
        const listItemClass =
          NAME === "symptom" ? "items-start" : "items-center h-8";
        const containerClass =
          NAME === "symptom" ? "items-start" : "items-center";

        const isSelected = formState.selected.includes(NAME);

        return (
          <li key={NAME} className={`${listItemClass} flex text-nowrap`}>
            <span className="mr-8 font-semibold">{TITLE}</span>
            <div className={`${containerClass} flex gap-4`}>
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
              {/* 衍生選項 */}
              {isSelected && INPUT_TYPE === "select" && (
                <Select
                  title="選擇外觀形狀"
                  options={OPTIONS}
                  onChange={(value: string) => handleSelectChange(NAME, value)}
                />
              )}
              {isSelected && INPUT_TYPE === "multi" && (
                <div className="flex flex-wrap gap-2">
                  {OPTIONS.map(({ label, value }) => (
                    <label key={label}>
                      <input
                        type="checkbox"
                        name={value}
                        onChange={(e) =>
                          handleMultiChange(value, e.currentTarget.checked)
                        }
                        className="mr-1"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default SickInputs;
