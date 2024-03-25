// "use client";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import publicChallengeImage from "../../../public/challenge.jpeg";
// import { ChallengeListRow } from "@/app/page";
import { timeUtil } from "@/utils/timeutils";
import { Tables } from "@/types/supabase";
export type ChallengeRow = Tables<"challenges">;
// extends를 해주면 <TodoCard 뒤에 속성들 나타남
// interface ChallengeCardProps
//   extends React.HTMLAttributes<HTMLParagraphElement> {
//   challenge: ChallengeListRow;
//   innerRef?: React.Ref<HTMLParagraphElement>;
// }
const ChallengeCard = ({
  challenge,
  innerRef,
}: {
  challenge: ChallengeRow;
  innerRef: React.Ref<HTMLParagraphElement>;
}) => {
  const router = useRouter();
  const { formatStartDate, formatEndDate, formattedCreatedAt } = timeUtil(
    challenge.start_date ?? "",
    challenge.end_date ?? "",
    challenge.created_at ?? ""
  );
  return (
    <div
      className="flex p-14 border-2 cursor-pointer hover:scale-105 w-96 hover:bg-slate-200 hover:border-2 hover:border-slate-400"
      key={challenge.id}
      ref={innerRef}
      onClick={() => {
        router.push(`/challenge/${challenge.id}`);
      }}
    >
      {/* 이미지 데이터를 캐시하는데 부하가 생긱수도있어서 */}
      {/* <img src={publicChallengeImage.src} alt="dd" /> 이미지태그 그냥 public폴더 이미지 쓸때 */}
      {/* <Image src={publicChallengeImage} alt="" /> next/image에서 그냥  public폴더 이미지 쓸때 */}
      <div className="flex flex-col w-64">
        <div className="mb-2">
          <img
            src={challenge.thumbnail ?? ""}
            alt={`${challenge.name}이미지`}
            className="w-64 h-64 "
          />
        </div>
        <div>
          <section className="text-xl font-bold mb-4">
            {challenge.name ? (
              <section className="text-xl font-bold mb-4">
                {challenge.name.length > 15
                  ? `${challenge.name.slice(0, 15)}...`
                  : challenge.name}
              </section>
            ) : (
              <section className="text-xl font-bold mb-4">이름이 없음</section>
            )}
          </section>
          <section>설명:{challenge.etc}</section>
          <section>생성날짜:{formattedCreatedAt}</section>
          <section>ㅇㅇ:</section>
          <section>
            기간:{challenge.start_date}~{challenge.end_date}
            기간:{formatStartDate} ~ {formatEndDate}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
