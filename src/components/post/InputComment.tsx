import { IconMessageCircle } from "@tabler/icons-react";
import { useState } from "react";

interface InputCommentPropsType {
  isEffect?: boolean;
}

const InputComment: React.FC<InputCommentPropsType> = ({
  isEffect = false,
}) => {
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [commentText, setCommentText] = useState("");

  const borderStyle = "px-4 py-2 border border-stroke";
  const targetStyle = `${
    isEffect ? isInputFocus && borderStyle : borderStyle
  } flex gap-2 justify-between items-center rounded-[30px] duration-200`;

  return (
    <section className={targetStyle}>
      <div className="flex-grow flex gap-2">
        <IconMessageCircle size={24} className="shrink-0" />
        <input
          type="text"
          placeholder="留言⋯⋯"
          className="w-full bg-transparent outline-none"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
        />
      </div>
      {(!isEffect || isInputFocus) && (
        <button
          type="button"
          className={`${
            commentText ? "bg-primary" : "bg-note"
          } px-4 py-[6px] rounded-[30px] text-white`}
        >
          發佈
        </button>
      )}
    </section>
  );
};

export default InputComment;
