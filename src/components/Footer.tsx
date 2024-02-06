import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="my-8 text-note">
      <ul className="flex flex-col gap-y-4">
        <ol className="flex justify-center gap-x-4">
          <li>常見問答</li>
          <li>網站介紹</li>
          <li>關於我們</li>
        </ol>
        <li className="text-center">
          {`Pawsmore(2024) from `}
          <a
            href="https://www.rocket-coding.com"
            className="underline"
            target="_blank"
          >
            火箭隊
          </a>
          {` 14th`}
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
