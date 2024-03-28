import { ReactNode, useEffect, useRef } from 'react';

interface PropsType {
  onClose: () => void;
  children: ReactNode;
}

function Mask({ onClose, children }: PropsType) {
  const scrollbarPosition = useRef(window.scrollY); // 記憶當前 scrollbar 位置
  const maskRef = useRef<HTMLDivElement>(null);

  // 點擊到有 mask 的元素時關閉
  const closeMask = (element: HTMLElement) => {
    if (element.classList.contains('mask')) {
      onClose();
    }
  };

  // 觸發滾動事件時重新設定 scrollbar 位置
  const handleScroll = () => {
    window.scrollTo(0, scrollbarPosition.current);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const target = event.target as HTMLElement;
    closeMask(target);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      const target = event.target as HTMLElement;
      closeMask(target);
    }
  };

  // 啟動監聽 scroll 事件
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

  // 當元素渲染完成後自動 focus 此元素
  useEffect(() => {
    if (maskRef.current) {
      maskRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={maskRef}
      role='button'
      tabIndex={0}
      onScroll={handleScroll}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className='mask fixed left-0 top-0 z-50 flex h-full w-full cursor-default items-center justify-center bg-black/50'
    >
      {children}
    </div>
  );
}

export default Mask;
