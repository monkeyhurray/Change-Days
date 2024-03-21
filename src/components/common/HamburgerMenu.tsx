"use client";
import Link from "next/link";
import React, { PropsWithChildren, useState } from "react";

type props = {
  signOut: () => void;
};
const HamburgerMenu = ({ signOut }: PropsWithChildren<props>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M2 5a1 1 0 0 1 1-1h14a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute p-3 z-10 top-0 right-0 mt-10 w-36 bg-white border border-gray-200 shadow-lg rounded">
          <Link href="/mypage" onClick={() => handleToggle()}>
            마이페이지
          </Link>
          <div onClick={signOut} className="cursor-pointer pt-2">
            로그아웃
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
