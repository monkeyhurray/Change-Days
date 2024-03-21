"use client";

import UserData, { UserDataProps } from "@/components/mypage/UserData";
import { supabase } from "@/supabase/supabase";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState<UserDataProps | null>(null);

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

  const handleClickButton = () => {
    router.push(`/mypage/${id}/profile`);
  };

  return (
    <>
      {user && <UserData id={user.id} name={user.name} url={user.url} />}
      <button onClick={handleClickButton}>유저 정보변경버튼</button>
      <div>
        <nav className="flex justify-center gap-8">
          <Link href={`${id}/challenges/ongoing`}>진행</Link>
          <Link href={`${id}/challenges/done`}>완료</Link>
          <Link href={`${id}/challenges/create`}>개설</Link>
        </nav>
        <section className="flex justify-center gap-8">
          <p>현재 유저의 챌린지</p>
        </section>
      </div>
    </>
  );
};

export default UserPage;
