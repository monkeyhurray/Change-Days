"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import publicChallengeImage from "../../../public/challenge.jpeg";

// extends를 해주면 <TodoCard 뒤에 속성들 나타남
interface ChallengeCardProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  challenge: any;
  innerRef?: React.Ref<HTMLParagraphElement>;
}
const ChallengeCard: FC<ChallengeCardProps> = ({ challenge, innerRef }) => {
  const router = useRouter();

  return (
    <div
      className=" p-14 text-center py-4 text-2xl border-2 flex flex-col cursor-pointer hover:scale-105 w-96 "
      key={challenge.id}
      ref={innerRef}
      onClick={() => {
        router.push(`/challenge/${challenge.id}`);
      }}
    >
      {/* <img src={publicChallengeImage.src} alt="dd" /> 이미지태그 그냥 public폴더 이미지 쓸때 */}
      {/* <Image src={publicChallengeImage} alt="" /> next/image에서 그냥  public폴더 이미지 쓸때 */}

      <div>
        {challenge.thumbnail ? (
          <img
            src={challenge.thumbnail}
            alt={challenge.name}
            className="w-64 h-64 object-cover"
          />
        ) : (
          <img
            src={publicChallengeImage.src}
            alt="대체 이미지"
            className="w-64 h-64 object-cover"
          />
        )}
        <section>
          name:
          {challenge.name.length > 10
            ? `${challenge.name.slice(0, 10)}...`
            : challenge.name}
        </section>
        <section>etc:{challenge.etc?.slice(0, 2)}</section>
        <section>period:{challenge.period}</section>
      </div>
    </div>
  );
};

export default ChallengeCard;
