import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
// import publicChallengeImage from "../../public/challenge.jpeg";

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
      className="bg-red-500  p-4 text-2xl border-2 flex flex-col cursor-pointer hover:scale-105"
      key={challenge.id}
      ref={innerRef}
      onClick={() => {
        router.push(`/challenge/${challenge.id}`);
      }}
    >
      {/* <Image src={publicChallengeImage} className="w-full" alt="챌린지" /> */}
      {/* <Image src={challenge.thumbnail} className="w-16" alt="챌린지" /> */}
      {/* <Image
        src={challenge.thumbnail}
        width={300}
        height={200}
        className="w-16"
        alt="챌린지"
      /> */}
      {/* <section>id:{challenge.id}</section> */}
      <section>name:{challenge.name}</section>
      <section>etc:{challenge.etc}</section>
      <section>period:{challenge.period}</section>
    </div>
  );
};

export default ChallengeCard;
