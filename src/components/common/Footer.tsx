import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-200 h-56 mt-28 flex items-center flex-col">
      <div className="mt-10 mb-5 text-lg">created by</div>
      <ul className="flex justify-between w-96 mx-auto">
        <li className="flex flex-col items-center">
          <span className="mb-3">금상호</span>
          <Link href="https://github.com/monkeyhurray" target="_blank">
            <FaGithub size={30} />
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <span className="mb-3">황현미</span>
          <Link href="https://github.com/brownrice0916" target="_blank">
            <FaGithub size={30} />
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <span className="mb-3">진다현</span>
          <Link href="https://github.com/dahyeo-n" target="_blank">
            <FaGithub size={30} />
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <span className="mb-3">김대연</span>
          <Link href="https://github.com/rlaedous" target="_blank">
            <FaGithub size={30} />
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <span className="mb-3">박강토</span>
          <Link href="https://github.com/gidalim" target="_blank">
            <FaGithub size={30} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
