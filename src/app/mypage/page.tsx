"use client";

import  { UserDataProps } from "@/components/mypage/UserData";
import { supabase } from "@/supabase/supabase";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const UserPage = () => {
  const [user, setUser] = useState<UserDataProps | null>(null);

  const fetchUserData = async () => {
    const { data, error } = await supabase.auth.getUser();
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

  const fetchChallenges = async() => {
    const { data } = await supabase
      .from("user_challenges")
      .select(`
      id,
      challenge_id,
      user_profile_id,
      challenges : challenge_id(*)`)
      .eq("user_profile_id", user)
    
    console.log('challenges', data)
  }



  useEffect(() => {
    fetchUserData();
    fetchChallenges()
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
};

export default UserPage;
