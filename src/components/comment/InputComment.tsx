import { fetchAddComment } from "@/common/fetch/comment";
import { RootState } from "@/common/redux/store";
import { IconMessageCircle } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../hint/Loading";
import { fetchCheckAuth } from "@/common/fetch/auth";
import useToken from "@/common/hooks/useToken";

interface InputCommentPropsType {
  postId: number;
  isEffect?: boolean;
  getComments: () => void;
}

const InputComment: React.FC<InputCommentPropsType> = ({
  postId,
  isEffect = false,
  getComments,
}) => {
  const { token } = useToken();

  const [isLoading, setIsLoading] = useState(false);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [text, setText] = useState("");

  const handleBlur = (event: React.FocusEvent) => {
    event.stopPropagation();
    setTimeout(() => {
      setIsInputFocus(false);
    }, 100);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!token) {
      alert("請先登入");
      return;
    }
    event.preventDefault();

    const commentContent = text;
    setText("");
    setIsLoading(true);

    try {
      const response = await fetchAddComment(token, { commentContent }, postId);
      console.log(response);
      if (!response.ok) {
        alert("留言失敗，請稍後再試");
      }

      if (getComments) getComments();
    } catch (error) {
      alert("留言失敗，請稍後再試");
      console.error("Error:", error);
    }

    setIsLoading(false);
  };

  // 樣式
  const borderStyle = "px-4 py-2 border border-stroke";
  const targetStyle = `${
    isEffect ? isInputFocus && borderStyle : borderStyle
  } flex gap-2 justify-between items-center rounded-[30px] duration-200`;
  const disableStyle = {
    backgroundColor: text ? "#203170" : "#808080",
  };

  return (
    <form onSubmit={handleSubmit} className={targetStyle}>
      <div className="flex-grow flex gap-2">
        <IconMessageCircle size={24} className="shrink-0" />
        <input
          type="text"
          name="commentContent"
          placeholder={token ? "留言⋯⋯" : "登入後才能進行留言"}
          value={text}
          disabled={!token || isLoading}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsInputFocus(true)}
          onBlur={handleBlur}
          className="w-full h-6 bg-transparent outline-none resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={!text || isLoading}
        style={disableStyle}
        className={`${
          isEffect && !isInputFocus && "hidden"
        } px-4 py-[6px] rounded-[30px] text-white`}
      >
        發佈
      </button>
    </form>
  );
};

export default InputComment;
