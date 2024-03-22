import { Tables } from "@/types/supabase";
import Search from "@/components/home/Search";
import HomeChallenges from "@/components/common/HomeChallenges";
export type ChallengeListRow = Tables<"challenges">;
export default function Home() {
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
      <HomeChallenges />
    </div>
  );
}
