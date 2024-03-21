import { useRouter } from "next/navigation";
import React, { FC } from "react";

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
      className="bg-red-500  p-4 text-2xl border-2 flex flex-col"
      key={challenge.id}
      ref={innerRef}
      onClick={() => {
        router.push(`/challenge/${challenge.id}`);
      }}
    >
      <section>id:{challenge.id}</section>
      <section>name:{challenge.name}</section>
      <section>etc:{challenge.etc}</section>
      <section>period:{challenge.period}</section>
    </div>
  );
};

export default ChallengeCard;
