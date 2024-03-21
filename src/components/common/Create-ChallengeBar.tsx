import React from "react";
import Link from "next/link";
const CreateChallengeBar = () => {
  return (
    <ul className="flex m-5 w-60 rounded my-3 border-2 border-black">
      <li className="mr-5">
        <Link href="/">[다음]</Link>
      </li>
    </ul>
  );
};

export default CreateChallengeBar;
