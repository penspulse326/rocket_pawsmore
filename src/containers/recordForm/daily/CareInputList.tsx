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
      {careCategory.map(({ name, title, placeholder }) => (
        <li key={name} className="flex items-center h-8 text-nowrap">
          <span className="mr-8 font-semibold">{title}</span>
          <div className="flex items-center gap-4">
            <div>
              <label>
                <input
                  type="radio"
                  name={name}
                  defaultChecked
                  onChange={() => setCareState({ ...careState, [name]: false })}
                  className="mr-1"
                />
                無
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name={name}
                  onChange={() => setCareState({ ...careState, [name]: true })}
                  className="mr-1"
                />
                有
              </label>
            </div>
            {careState[name] && (
              <input
                type="text"
                name={`${name}`}
                placeholder={placeholder}
                onChange={(e) =>
                  setCareState({
                    ...careState,
                    [`${name}_detail`]: e.target.value,
                  })
                }
                className="px-2 py-1 w-full border border-stroke outline-note rounded-[10px]"
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CareInputList;
