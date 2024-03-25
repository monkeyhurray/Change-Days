"use client";

import React, { useEffect, useState } from "react";
import { UserDataProps } from "@/components/mypage/UserData";
import { supabase } from "@/supabase/supabase";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import bonobo from "../../../public/bonobo.jpeg";
import Image from "next/image";
import { fetchChallenges } from "@/utils/fetchChallenges";

type Challenge = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  thumbnail: string;
  createdAt: string;
};

type UserChallenge = {
  id: string;
  challenge_id: string;
  user_profile_id: string;
  challenges: Challenge;
  startDate: string;
  endDate: string;
};

const UserPage = () => {
  const [user, setUser] = useState<UserDataProps | null>(null);
  // const [user, setUser] = useState(null);
  const [challenges, setChallenges] = useState<UserChallenge[]>([]);

  const usefetchUserData = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (data.user) {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("uid, nickname", data.user.id)
        .single();

      setUser(userData);
    }
  };

  // const fetchChallenges = async () => {
  //   const { data } = await supabase
  //     .from('user_challenges')
  //     .select(
  //       `
  //     id,
  //     challenge_id,
  //     user_profile_id,
  //     challenges : challenge_id(*)`
  //     )
  //     .eq('user_profile_id', user);

  //   console.log('challenges', data);
  // };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const userId = data.session?.user.id;
      if (userId) {
        fetchChallenges(userId, setChallenges);
      }
    });
    usefetchUserData();
  }, [user?.url]);

  if (user) {
    return (
      <div className="mb-10">
        <Link href="/mypage/profile" className="flex items-center mb-5">
          <div className=" rounded-full overflow-hidden w-20 h-20 mr-5">
            {/* <img src={user.url} alt='userImg' className='w-full h-full' /> */}
            <Image
              src={user.url !== null ? user.url : bonobo}
              alt="유저이미지"
              width={150}
              height={150}
            />
          </div>
          <p className="text-2xl mr-3">{user.nickname}</p>
          <FaChevronRight size={20} />
        </Link>

        <div>
          <h1 className="text-xl mb-5 font-bold mt-10">챌린지 현황</h1>
          <nav className="border border-gray-500 rounded-md flex justify-between p-2">
            <Link
              className="flex-1 mx-auto text-center"
              href={`mypage/challenges`}
            >
              <p>진행</p>
              <p>{`${challenges.length}`}</p>
            </Link>
          </nav>
        </div>
      </div>
    );
  }
};

export default UserPage;
