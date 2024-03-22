"use client";
import MainSlider from "@/components/common/MainSlider";
import { FaPlus } from "react-icons/fa6";
import { supabase } from "@/supabase/supabase";
import { Tables } from "@/types/supabase";
import Search from "@/components/home/Search";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
export type ChallengeListRow = Tables<"challenges">;
export default function Home() {
  const [data, setData] = useState<ChallengeListRow | any>([]);
  const [userData, setUserData] = useState<{ user: User | null }>();
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from<any, ChallengeListRow>("challenges")
        .select("*");
      console.log("data", data);
      //  setData(data);
      if (error) {
        console.log("error", error);
      }
      setData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getUser();
      setUserData(data);
    };
    fetchData();
  }, []);

  //console.log("data", data);

  return (
    <div className="mt-2">
      <section className="filter grayscale bg-[url('/mainImg.jpg')] relative bg-opacity-50 bg-[center_top_-7rem] bg-cover h-96 flex items-center justify-center bg-gray-200">
        <div className="bg-black opacity-60 absolute top-0 w-full h-full"></div>
        <div className="z-10">
          <p className="text-3xl mb-5 text-center text-white">
            습관을 만들어 드립니다
          </p>
          <Search />
        </div>
      </section>
      <section className="mt-20">
        <div className="flex justify-between">
          <h1 className="mb-10 text-2xl font-bold">진행중인 챌린지</h1>
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
    </div>
  );
}
