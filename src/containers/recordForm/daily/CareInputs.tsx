import { careCategory } from "@/common/lib/formText";
import { CareStateType } from "@/containers/recordForm/daily/DailyForm";

interface CareListPropsType {
  careState: CareStateType;
  setCareState: React.Dispatch<React.SetStateAction<CareStateType>>;
}

const CareInputList: React.FC<CareListPropsType> = ({
  careState,
  setCareState,
}) => {
  return (
    <ul className="flex flex-col gap-4 mt-2">
      {careCategory.map(({ NAME, TITLE, PLACEHOLDER }) => (
        <li key={NAME} className="flex items-center h-8 text-nowrap">
          <span className="mr-8 font-semibold">{TITLE}</span>
          <div className="flex items-center gap-4">
            <div>
              <label>
                <input
                  type="radio"
                  name={NAME}
                  defaultChecked
                  onChange={() => setCareState({ ...careState, [NAME]: false })}
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
                  onChange={() => setCareState({ ...careState, [NAME]: true })}
                  className="mr-1"
                />
                有
              </label>
            </div>
            {careState[NAME] && (
              <input
                type="text"
                name={`${NAME}_detail`}
                placeholder={PLACEHOLDER}
                onChange={(e) =>
                  setCareState({
                    ...careState,
                    [`${NAME}_detail`]: e.target.value,
                  })
                }
                className="form-input w-full"
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CareInputList;
