import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex bg-slate-300 h-14 items-center justify-between">
      <p>
        <Link href="/">Change Days</Link>
      </p>
      <p>
        <Link href={"/sign/signin"}>로그인 /</Link>
        <Link href={"/sign/signup"}>회원가입</Link>
      </p>
    </div>
  );
};

export default Header;
