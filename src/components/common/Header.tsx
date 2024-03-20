import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex border-b-2 border-b-gray-500 h-14 items-center justify-between">
      <p>
        <Link href="/" className="font-bold text-lg">
          Change Days
        </Link>
      </p>
      <p>
        <Link className=" text-lg" href={"/sign/signin"}>
          로그인{" "}
        </Link>
        <span>| </span>
        <Link className=" text-lg" href={"/sign/signup"}>
          회원가입
        </Link>
      </p>
    </div>
  );
};

export default Header;
