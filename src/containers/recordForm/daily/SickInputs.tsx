import { sickCategory } from "@/common/lib/formText";
import { SickStateType } from "./DailyForm";

interface SickListPropsType {
  sickState: SickStateType;
  setSickState: React.Dispatch<React.SetStateAction<SickStateType>>;
}

const SickInputs: React.FC<SickListPropsType> = ({
  sickState,
  setSickState,
}) => {
  const handleRadioChange = (name: string, value: boolean) => {
    setSickState((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (value: string) => {
    setSickState((prev) => ({
      ...prev,
      symptom_text: [...prev.symptom_text, value],
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setSickState((prev) => ({
      ...prev,
      [`${name}_text`]: value,
    }));
  };

  return (
    <ul className="flex flex-col gap-4 mt-2">
      {sickCategory.map(({ NAME, TITLE, OPTIONS }) => {
        const listItemClass =
          NAME === "symptom" ? "items-start" : "items-center h-8";
        const containerClass =
          NAME === "symptom" ? "items-start" : "items-center";

        return (
          <li key={NAME} className={`${listItemClass} flex text-nowrap`}>
            <span className="mr-8 font-semibold">{TITLE}</span>
            <div className={`${containerClass} flex gap-4`}>
              <div>
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
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name={NAME}
                    className="mr-1"
                    onChange={() => handleRadioChange(NAME, true)}
                  />
                  有
                </label>
              </div>
              {sickState[NAME] && (
                <div>
                  {NAME === "symptom" ? (
                    <div className="flex flex-wrap gap-2">
                      {OPTIONS.map((OPTION) => (
                        <label key={OPTION}>
                          <input
                            type="checkbox"
                            value={OPTION}
                            onChange={() => handleCheckboxChange(OPTION)}
                            className="mr-1"
                          />
                          {OPTION}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <label>
                        <select
                          onChange={(e) =>
                            handleSelectChange(NAME, e.target.value)
                          }
                          className="form-input"
                        >
                          <option disabled>選擇外觀形狀</option>
                          {OPTIONS.map((OPTION) => (
                            <option key={OPTION} value={OPTION}>
                              {OPTION}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  )}
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
