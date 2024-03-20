import MainSlider from "@/components/common/MainSlider";
import Image from "next/image";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { supabase } from "@/supabase/supabase";
import { useEffect } from "react";
import { Tables } from "@/types/supabase";
export type ChallengeListRow = Tables<"ChallengeList">;
export default async function Home() {
  const { data, error } = await supabase
    .from<any, ChallengeListRow>("challenges")
    .select("*");

  //console.log("data", data);
  return (
    <>
      <section className="h-96 flex items-center justify-center bg-gray-200">
        <div className="">
          <p className="text-3xl mb-5 text-center">습관 바꾸고 갓생 살자!!</p>
          <div className="flex">
            <input
              type="text"
              className="px-5 py-3 w-80"
              placeholder="챌린지를 검색해 주세요"
            ></input>
            <button className="bg-white text-gray-500 px-3">
              <IoIosSearch size={30} color="inherit" />
            </button>
          </div>
        </div>
      </section>
      <section className="mt-20">
        <div className="flex justify-between">
          <h1 className="mb-10 text-2xl">진행중인 챌린지</h1>
          <p className="text-xl flex items-center">
            <span className="mr-2">
              <FaPlus />
            </span>
            <span>챌린지 개설하기</span>
          </p>
        </div>

        <MainSlider items={data} />
      </section>
    </>
  );
}
