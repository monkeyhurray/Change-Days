"use client";

import UserData, { UserDataProps } from "@/components/mypage/UserData";
import { supabase } from "@/supabase/supabase";
<<<<<<< HEAD
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
          <Link href={`mypage/challenges`}>진행</Link>
          <Link href={`mypage/challenges`}>완료</Link>
          <Link href={`mypage/challenges`}>개설</Link>
        </nav>
        <section className="flex justify-center gap-8">
          <p>현재 유저의 챌린지</p>
        </section>
      </div>
    </>
  );
=======
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const UserPage = () => {
  const [user, setUser] = useState<UserDataProps | null>(null);

  const fetchUserData = async () => {
    const { data, error } = await supabase.auth.getUser();
    // console.log("user", data.user);
    if (data.user) {
      console.log("userId", data.user.id);
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("uid", data.user.id)
        .single();
      console.log("user", userData);
      setUser(userData);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (user) {
    return (
      <div className="mb-10">
        <Link href="/mypage/profile" className="flex items-center mb-5">
          <div className=" rounded-full overflow-hidden w-20 h-20 mr-5">
            <img src={user.url} alt="userImg" className="w-full h-full" />
          </div>
          <p className="text-2xl mr-3">{user.name}</p>
          <FaChevronRight size={20} />
        </Link>
        {/* <div></div> */}
        <div>
          <h1 className="text-xl mb-5 font-bold mt-10">챌린지 현황</h1>
          <nav className="border border-gray-500 rounded-md flex justify-between p-2">
            <Link
              className="flex-1 border-r border-r-gray-500 mx-auto text-center"
              href={`mypage/challenges`}
            >
              <p>진행</p>
              <p>1</p>
            </Link>
            <Link
              className="flex-1 border-r border-r-gray-500 mx-auto text-center"
              href={`mypage/challenges`}
            >
              <p>완료</p>
              <p>1</p>
            </Link>
            <Link
              className="flex-1 mx-auto text-center"
              href={`mypage/challenges`}
            >
              <p>개설</p>
              <p>1</p>
            </Link>
          </nav>
          {/* <section className="flex justify-center gap-8">
            <p>현재 유저의 챌린지</p>
          </section> */}
        </div>
      </div>
    );
  }
>>>>>>> 5aceba5 (fix: 코드 수정 완료)
};

export default UserPage;
