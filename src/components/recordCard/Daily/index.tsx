import ToggleList from "@/components/ToggleList";
import CardWrapper from "../Wrapper";
import FoodList from "./FoodList";

const Daily = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    console.log(form.food[0].value);
    console.log(form.amount[1].value);
  };
  return (
    <CardWrapper category="daily">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <ToggleList title="一般">
          <ul className="flex flex-col gap-4 mt-2">
            <li>
              <span className="mr-8 font-semibold">體重</span>
              <input
                name="weight"
                type="number"
                min={0}
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
                min={0}
                className="mr-1 px-2 py-1 w-16 border border-stroke outline-note rounded-[10px]"
              />
              <span>ml</span>
            </li>
            <li className="flex">
              <span className="mr-8 my-1 font-semibold">進食</span>
              <FoodList />
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
