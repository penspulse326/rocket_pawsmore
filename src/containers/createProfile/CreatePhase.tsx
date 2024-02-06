import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CreatePhase: React.FC = () => {
  const router = useRouter();
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    switch (router.pathname) {
      case "/member/new/create_profile":
        setPhase(1);
        break;
      case "/member/new/create_pet":
        setPhase(2);
        break;
      case "/member/new/select_topic":
        setPhase(3);
        break;
      default:
        break;
    }
  }, [router.pathname]);

  const opacityStyle = (number: number) => {
    return phase < number ? { opacity: 0.2 } : {};
  };

  return (
    <section className="flex justify-center items-center gap-6 mt-8">
      <div className="flex flex-col items-center gap-2">
        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary text-white">
          1
        </span>
        <p className="text-xs">建立個人資料</p>
      </div>
      <Image
        src="/images/phase-paws.svg"
        alt="paws"
        width={0}
        height={0}
        style={opacityStyle(2)}
        className="w-auto h-auto"
      />
      <div style={opacityStyle(2)} className="flex flex-col items-center gap-2">
        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary text-white">
          2
        </span>
        <p className="text-xs">新增寵物檔案</p>
      </div>
      <Image
        src="/images/phase-paws.svg"
        alt="paws"
        width={0}
        height={0}
        style={opacityStyle(3)}
        className="w-auto h-auto -scale-y-100"
      />
      <div style={opacityStyle(3)} className="flex flex-col items-center gap-2">
        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-primary text-white">
          3
        </span>
        <p className="text-xs">個人化推薦主題</p>
      </div>
    </section>
  );
};

export default CreatePhase;
