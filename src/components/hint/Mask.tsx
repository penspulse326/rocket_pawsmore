import { ReactNode, useEffect, useRef } from 'react';

interface PropsType {
  onClose: () => void;
  children: ReactNode;
}

function Mask({ onClose, children }: PropsType) {
  // 記憶當前 scrollbar 位置
  const scrollbarPosition = useRef(window.scrollY);

  // 觸發滾動事件時重新設定 scrollbar 位置
  const handleScroll = () => {
    window.scrollTo(0, scrollbarPosition.current);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    // 點擊到有 mask 的元素時關閉
    const target = event.target as HTMLElement;
    if (target.classList.contains('mask')) {
      onClose();
    }
  };

  useEffect(() => {
    const handleFreeze = () => {
      window.scrollTo(0, scrollbarPosition.current);
    };
    window.addEventListener('scroll', handleFreeze);

    return () => {
      window.removeEventListener('scroll', handleFreeze);
      window.scrollTo(0, scrollbarPosition.current);
    };
  }, []);

  return (
    <button
      type='button'
      onScroll={handleScroll}
      onClick={handleClose}
      className='mask fixed left-0 top-0 z-50 flex h-full w-full cursor-default items-center justify-center bg-black/50'
    >
      {children}
    </button>
  );
}

export default Mask;
