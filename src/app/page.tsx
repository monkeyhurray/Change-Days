import MainSlider from "@/components/common/MainSlider";
import { FaPlus } from "react-icons/fa6";
import { supabase } from "@/supabase/supabase";
import { Tables } from "@/types/supabase";
import Search from "@/components/home/Search";
export type ChallengeListRow = Tables<"challenges">;
export default async function Home() {
  const { data, error } = await supabase
    .from<any, ChallengeListRow>("challenges")
    .select("*");
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
          <p className="text-xl flex items-center">
            <span className="mr-2">
              <FaPlus />
            </span>
            <span>챌린지 개설하기</span>
          </p>
        </div>
        <MainSlider items={data} />
      </section>
    </div>
  );
}
