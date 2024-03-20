import { infiniteTodo } from "@/types";
import { Database } from "@/types/supabase";
import React, { FC } from "react";

// extends를 해주면 <TodoCard 뒤에 속성들 나타남
interface ChallengeCardProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  //   challenge: Database;
  challenge: any;
  // ref양식
  //   아래 ?:를 해야 page 57번째줄이 정상출력
  innerRef?: React.Ref<HTMLParagraphElement>;
}
const ChallengeCard: FC<ChallengeCardProps> = ({
  challenge,
  innerRef,
  ...props
}) => {
  return (
    <div
      className="bg-red-500  p-4 text-2xl border-2 flex flex-col"
      //   key={challenge.public.Tables.ChallengeList.Row.id}
      key={challenge.id}
      ref={innerRef}
      {...props}
    >
      <section>id:{challenge.id}</section>
      <section>name:{challenge.name}</section>
      <section>etc:{challenge.etc}</section>
      <section>period:{challenge.period}</section>
      {/* id:{challenge.public.Tables.ChallengeList.Row.id}
      name:{challenge.public.Tables.ChallengeList.Row.name} */}
    </div>
  );
};

export default ChallengeCard;
