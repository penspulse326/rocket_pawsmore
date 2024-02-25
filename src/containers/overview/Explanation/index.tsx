import Card from "./Card";

const Explanation = () => {
  return (
    <section className="max-w-[497px] w-full">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl leading-9">異常說明</h2>
        <span className="text-note">僅供參考，如有異常狀況請及早就醫。</span>
      </div>
      <ul className="scrollbar-none flex flex-col gap-4 mt-4 p-6 max-h-[334px] border border-stroke rounded-[30px] overflow-y-scroll">
        <Card />
        <Card />
        <Card />
      </ul>
    </section>
  );
};

export default Explanation;
