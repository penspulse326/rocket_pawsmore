import { fetchAddComment } from "@/common/fetch/comment";
import { RootState } from "@/common/redux/store";
import { IconMessageCircle } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../hint/Loading";

interface InputCommentPropsType {
  postId: number;
  isEffect?: boolean;
}

const InputComment: React.FC<InputCommentPropsType> = ({
  postId,
  isEffect = false,
}) => {
  const { token } = useSelector((state: RootState) => state.userInfo);

  const [isLoading, setIsLoading] = useState(false);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [text, setText] = useState("");

  const borderStyle = "px-4 py-2 border border-stroke";
  const targetStyle = `${
    isEffect ? isInputFocus && borderStyle : borderStyle
  } flex gap-2 justify-between items-center rounded-[30px] duration-200`;

  const disableStyle = {
    backgroundColor: text ? "#203170" : "#808080",
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsInputFocus(false);
    }, 300);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const commentContent = text;
    setText("");
    setIsLoading(true);

    try {
      const response = await fetchAddComment(token, { commentContent }, postId);
      if (!response.ok) {
        alert("留言失敗，請稍後再試");
      }
    } catch (error) {
      alert("留言失敗，請稍後再試");
      console.error("Error adding the comment:", error);
    }

    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      <form onSubmit={handleSubmit} className={targetStyle}>
        <div className="flex-grow flex gap-2">
          <IconMessageCircle size={24} className="shrink-0" />
          <input
            type="text"
            placeholder="留言⋯⋯"
            className="w-full bg-transparent outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsInputFocus(true)}
            onBlur={handleBlur}
          />
        </div>
        <button
          type="submit"
          disabled={!text}
          style={disableStyle}
          className={`${
            isEffect && !isInputFocus && "hidden"
          } px-4 py-[6px] rounded-[30px] text-white`}
        >
          發佈
        </button>
      </form>
    </>
  );
};

export default InputComment;
