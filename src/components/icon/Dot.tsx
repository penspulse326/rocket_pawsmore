import { RecordCardType } from '@/common/types/enums';

const dotColor: Record<number, string> = {
  0: '#969AFF',
  1: '#FF6D80',
  2: '#FFA959',
};

interface PropsType {
  name: number;
  size: string;
}

const Dot: React.FC<PropsType> = ({ name, size }) => {
  if (size === 'sm') {
    return (
      <span
        style={{ backgroundColor: dotColor[name] }}
        className='mr-1 inline-block h-[6px] w-[6px] shrink-0 rounded-full'
      />
    );
  }
  return (
    <span
      style={{ backgroundColor: dotColor[name] }}
      className='mr-4 inline-block h-[11px] w-[11px] shrink-0 rounded-full'
    />
  );
};

export default Dot;
