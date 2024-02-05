import { IconX } from "@tabler/icons-react";

import { recordCard } from "@/common/lib/formText";

interface PropsType {
  children: React.ReactNode;
  category: "daily" | "medical" | "moment";
}

const RecordFormLayout: React.FC<PropsType> = ({ children, category }) => {
  const { TITLE, SUB_TITLE, COLOR } = recordCard[category];

  return (
    <section className="scrollbar-none flex flex-col gap-6 p-6 w-[416px] max-h-[896px] border border-stroke rounded-[30px] bg-white overflow-y-scroll">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="flex items-center text-2xl font-bold">
            <span
              style={{ backgroundColor: COLOR }}
              className={`inline-block mr-4 w-[11px] h-[11px] rounded-full`}
            ></span>
            {TITLE}
          </h2>
          {/* 關閉按鈕 */}
          <button type="button">
            <IconX size={32} stroke={2} />
          </button>
        </div>
        <h3 className="mt-1 text-note">{SUB_TITLE}</h3>
      </div>
      {children}
    </section>
  );
};

export default RecordFormLayout;