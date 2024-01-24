import { IconSearch } from "@tabler/icons-react";

export default function SocialSideBarRight() {
  return (
    <div className="col-span-3 bg-white">
      <section className="flex items-center gap-2 mt-8 px-8 py-4 rounded-full bg-stroke">
        <input
          type="text"
          placeholder="搜尋名稱、分類⋯⋯"
          className="w-full outline-none bg-transparent"
        />
        <IconSearch size={24} />
      </section>
    </div>
  );
}
