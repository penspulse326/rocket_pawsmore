const Loading: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black/50">
      <div className="cssload-dots">
        <div className="cssload-dot"></div>
        <div className="cssload-dot"></div>
        <div className="cssload-dot"></div>
        <div className="cssload-dot"></div>
        <div className="cssload-dot"></div>
      </div>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="12"
            ></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0	0 1 0 0 0	0 0 1 0 0	0 0 0 18 -7"
              result="goo"
            ></feColorMatrix>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Loading;
