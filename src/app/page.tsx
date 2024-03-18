import MainSlider from "@/components/common/MainSlider";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const challenges = [
    {
      name: "1만보씩 걷기",
      id: 1,
      userId: "gusal",
      period: "2주동안",
      frequency: "주3일",
    },
    {
      name: "매일 7시 기상",
      id: 2,
      userId: "gusal",
      period: "2주동안",
      frequency: "주3일",
    },
    {
      name: "매일 7시 기상",
      id: 2,
      userId: "gusal",
      period: "2주동안",
      frequency: "주3일",
    },
    {
      name: "매일 7시 기상",
      id: 2,
      userId: "gusal",
      period: "2주동안",
      frequency: "주3일",
    },
    {
      name: "매일 7시 기상",
      id: 2,
      userId: "gusal",
      period: "2주동안",
      frequency: "주3일",
    },
    {
      name: "매일 7시 기상",
      id: 2,
      userId: "gusal",
      period: "2주동안",
      frequency: "주3일",
    },
  ];
  return (
    <>
      <section className="h-96 flex items-center justify-center bg-orange-400">
        <div className="">
          <p className="text-3xl mb-5">습관 바꾸고 갓생 살자!!</p>
          <input
            type="text"
            className="px-5 py-3"
            placeholder="챌린지를 검색해 주세요"
          ></input>
          <input type="button" className="cursor-pointer" value="클릭"></input>
        </div>
      </section>
      <section className="mt-20">
        <div className="flex justify-between">
          <h1 className="mb-10 text-2xl">진행중인 챌린지</h1>
          <p className="text-xl">+ 챌린지 개설하기</p>
        </div>

        <MainSlider items={challenges} />
      </section>
    </>
  );
}
