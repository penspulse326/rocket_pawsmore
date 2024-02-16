import { IconHeart } from "@tabler/icons-react";

interface PropsType {
  isLiked: boolean;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const LikeBtn: React.FC<PropsType> = ({ isLiked, onClick }) => {
  const btnStyle = isLiked ? "#FE6916" : "#EAEAEA";

  return (
    <button
      type="button"
      onClick={() => onClick(!isLiked)}
      className="absolute bottom-8 right-8"
    >
      <IconHeart
        size={70}
        fill={btnStyle}
        className="stroke-white stroke-1 filter drop-shadow-md duration-300"
      />
    </button>
  );
};

export default LikeBtn;
