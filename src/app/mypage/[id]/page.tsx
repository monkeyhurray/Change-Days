"use client";

import { supabase } from "@/supabase/supabase";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState("");

  const fetchUserData = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("uid", id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setUser(data);
  };

  useEffect(() => {
    if (id) {
      fetchUserData();
    }
  }, [id]);

  console.log(user.url);

  return (
    <>
      <div>
        <figure className="flex flex-col">
          <img src={`${user.url}`} alt="유저이미지" />
          <p>{user?.name || "유저이름"}</p>
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
