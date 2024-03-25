"use client";
import { ChallengeListRow } from "@/app/page";
import { supabase } from "@/supabase/supabase";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import MainSlider from "./MainSlider";

const HomeChallenges = () => {
  const [data, setData] = useState<ChallengeListRow | any>([]);
  const [userData, setUserData] = useState<{ user: User | null }>();
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from<any, ChallengeListRow>("challenges")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log("error", error);
      } else if (data) {
        const today = new Date();

        const ongoingChallenges = data.filter((challenge) => {
          const endDate = new Date(challenge.end_date);
          return endDate >= today;
        });

        setData(ongoingChallenges);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mt-20">
      <div className="flex justify-between">
        <h1 className="mb-10 text-2xl font-bold">진행 중인 챌린지</h1>
        {userData && userData.user && (
          <p className="text-xl flex items-center">
            <span className="mr-2">
              <FaPlus />
            </span>

            <Link href="/create-challenge">
              <span>챌린지 개설하기</span>
            </Link>
          </p>
        )}
      </div>
      {data && <MainSlider items={data} />}
    </section>
  );
};
export default HomeChallenges;
