import { abnormalityCategory } from "@/common/lib/formText";

const AbnormalityList: React.FC = () => {
  return (
    <ul className="flex flex-col gap-4 mt-2">
      {abnormalityCategory.map(({ NAME, TITLE, OPTIONS }) => (
        <li key={NAME} className="flex items-start text-nowrap">
          <span className="mr-8 font-semibold">{TITLE}</span>
          <div className="flex items-start gap-4">
            <div>
              <label>
                <input
                  type="radio"
                  name={NAME}
                  defaultChecked
                  className="mr-1"
                />
                無
              </label>
            </div>
            <div>
              <label>
                <input type="radio" name={NAME} className="mr-1" />有
              </label>
            </div>
            {NAME === "symptom" ? (
              <div className="flex flex-wrap gap-2">
                {OPTIONS.map((OPTION) => (
                  <label key={OPTION}>
                    <input type="checkbox" className="mr-1" />
                    {OPTION}
                  </label>
                ))}
              </div>
            ) : (
              <select
                name=""
                id=""
                className="px-2 py-1 border border-stroke rounded-[10px]"
              >
                <option disabled selected>
                  選擇外觀形狀
                </option>
                {OPTIONS.map((OPTION) => (
                  <option key={OPTION} value={OPTION}>
                    {OPTION}
                  </option>
                ))}
              </select>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AbnormalityList;
