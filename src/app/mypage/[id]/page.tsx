"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const UserPage = () => {
  const router = useRouter();
  const { id } = useParams();

  console.log(id);

  return (
    <>
      <div>
        <figure className="flex flex-col">
          <img src="" alt="유저이미지" />
          <p>유저이름</p>
          <button>유저 정보변경버튼</button>
        </figure>
      </div>
      <nav className="flex justify-center gap-8">
        <Link href={`${id}/challenges/ongoing`}>진행</Link>
        <Link href={`${id}/challenges/done`}>완료</Link>
        <Link href={`${id}/challenges/create`}>개설</Link>
      </nav>
      <section className="flex justify-center gap-8">
        <p>현재 유저의 챌린지</p>
      </section>
    </>
  );
};

export default UserPage;
