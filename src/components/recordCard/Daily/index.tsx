import ToggleList from "@/components/ToggleList";
import CardWrapper from "../Wrapper";

const Daily = () => {
  return (
    <CardWrapper>
      <form className="flex flex-col gap-4">
        <ToggleList title="一般">
          <ul className="flex flex-col gap-4 mt-2">
            <li>
              <span className="mr-8 font-semibold">體重</span>
              <input
                name="weight"
                type="number"
                className="mr-1 px-2 py-1 w-16 border border-stroke outline-note rounded-[10px]"
              />
              <select
                name="weight_unit"
                className="px-2 py-1 w-[72px] border border-stroke outline-note rounded-[10px]"
              >
                <option disabled>單位</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
              </select>
            </li>
            <li>
              <span className="mr-4 font-semibold">飲水量</span>
              <input
                type="number"
                className="mr-1 px-2 py-1 w-16 border border-stroke outline-note rounded-[10px]"
              />
              <span>ml</span>
            </li>
            <li>
              <span className="mr-8 font-semibold">飲水量</span>
              <input
                type="number"
                className="mr-1 px-2 py-1 w-16 border border-stroke outline-note rounded-[10px]"
              />
              <span>ml</span>
            </li>
          </ul>
        </ToggleList>
        <ToggleList title="一般">
          <ul className="flex flex-col gap-4 mt-2">
            <li>
              <span className="mr-8 font-semibold">體重</span>
              <input
                name="weight"
                type="number"
                className="mr-1 px-2 py-1 w-16 border border-stroke outline-note rounded-[10px]"
              />
              <select
                name="weight_unit"
                className="px-2 py-1 w-[72px] border border-stroke outline-note rounded-[10px]"
              >
                <option disabled>單位</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
              </select>
            </li>
            <li>
              <span className="mr-4 font-semibold">飲水量</span>
              <input
                type="number"
                className="mr-1 px-2 py-1 w-16 border border-stroke outline-note rounded-[10px]"
              />
              <span>ml</span>
            </li>
            <li>
              <span className="mr-8 font-semibold">飲水量</span>
              <input
                type="number"
                className="mr-1 px-2 py-1 w-16 border border-stroke outline-note rounded-[10px]"
              />
              <span>ml</span>
            </li>
          </ul>
        </ToggleList>
        <div className="flex flex-col gap-4">
          <span className="text-note">備註</span>
          <textarea
            name=""
            className="h-24 border border-stroke rounded-[10px]"
          ></textarea>
        </div>
        <button
          type="submit"
          className="py-2 rounded-full bg-primary text-white"
        >
          登入
        </button>
      </form>
    </CardWrapper>
  );
};
export default Daily;
