import { supabase } from "@/supabase/supabase";
import React from "react";
import { ChallengeListRow } from "@/app/page";
import ParticipateBtn from "@/components/challenge/ParticipateBtn";

type props = {
  params: { id: string };
};
const ChallengePage = async ({ params }: props) => {
  const id = params.id;

  const { data, error } = await supabase
    .from<any, ChallengeListRow>('challenges')
    .select('*')
    .eq('id', id);

  if (error) {
    console.log(error.message);
  }

  if (data && data.length > 0) {
    const challenge: ChallengeListRow = data[0] as ChallengeListRow;
    return (
      <>
        <div>
          <div className="border-b-2 border-b-gray-300 py-3">
            <p className="mb-2">
              <span className="mr-5 text-2xl">{challenge.name}</span>
              <span className="mr-3 text-white bg-gray-600 p-2 rounded-xl">
                {challenge.frequency}
              </span>
              <span className="mr-3 text-white bg-gray-600 p-2 rounded-xl">
                {challenge.start_date}-{challenge.end_date}
              </span>
            </p>
            <span>작성자 : {challenge.created_by}</span>
          </div>
          <div>
            <p className="py-5 text-xl font-bold">챌린지 소개</p>
            <div className="h-36">{challenge.etc}</div>
          </div>
          <div>
            <p className="py-5 text-xl font-bold">인증 방법</p>
            <div className="h-36">사진을 예쁘게 찍어서 올리세요</div>

          </div>
          <div>
            <p className='py-5 '>
              참가자 수:<span>1234명</span>
            </p>
          </div>
          <ParticipateBtn challengeId={id} />
        </div>
      </>
    );
  }
};

export default ChallengePage;
