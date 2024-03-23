"use client";
import { supabase } from "@/supabase/supabase";
import React, { useEffect, useState } from "react";
import { ChallengeListRow } from "@/app/page";
import ParticipateBtn from "@/components/challenge/ParticipateBtn";
import { timeUtil } from "@/utils/timeutils";
import UploadModal from "@/components/common/UploadModal";

type Props = {
  params: { id: string };
};

const ChallengePage = ({ params }: Props) => {
  const id = params.id;
  const [challenge, setChallenge] = useState<ChallengeListRow | null>(null);
  const [createdByUser, setCreatedByUser] = useState<string | null>(null);
  const [durationMessage, setDurationMessage] = useState<string> ('')

  useEffect(() => {
    const fetchData = async () => {
      const { data: challengeData, error: challengeError } = await supabase
        .from("challenges")
        .select(`*,
           id, name, public, start_date, end_date, thumbnail, etc, created_by, created_at`)
        .eq("id", id)
        .single()

      if (challengeError) {
        console.error(
          "챌린지 정보를 가져오는 중 오류가 발생했습니다.",
          challengeError
        );

        return;
      }
      console.log('dsdasd',challengeData)
      setChallenge(challengeData);

       if (challengeData) {
        const { durationMessage } = timeUtil(challengeData.start_date, challengeData.end_date, challengeData.created_at);
         setDurationMessage(durationMessage);
         console.log('며칠하니',durationMessage)
      }

      if (challengeData && challengeData.created_by) {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("uid", challengeData.created_by)
          .single();

        if (userError) {
          console.error(
            "사용자 정보를 가져오는 중 오류가 발생했습니다.",
            userError
          );
          return;
        }

        setCreatedByUser(userData?.name || null);
      }
    };

    fetchData();
  }, [id]);

  if (!challenge) {
    return <div>챌린지 정보를 불러오는 중입니다...</div>;
  }

  return (
    <>
      <div>
        <div className="border-b-2 border-b-gray-300 py-3">
          <p className="mb-2">
            <span className="mr-5 text-2xl">{challenge.name}</span>
            <span className="mr-3 text-white bg-gray-600 p-2 rounded-xl">
              {durationMessage}
            </span>
            <span className="mr-3 text-white bg-gray-600 p-2 rounded-xl">
              {challenge.start_date}-{challenge.end_date}
            </span>
          </p>
          <span>작성자 : {createdByUser}</span> {/* 작성자 표시 */}
        </div>
        <div>
          <p className="py-5 text-xl font-bold">챌린지 소개</p>
          <img src={challenge.thumbnail} width={550} height={550} alt="섬네일"/>
          <div className="h-36">{challenge.etc}</div>
        </div>
        <div>
          <p className="py-5 text-xl font-bold">인증 하기</p>
          <div className="h-36">사진을 예쁘게 찍어서 올리세요</div>
          <UploadModal handleYes={()=>{}}/>
        </div>
        <div>
          <p className="py-5 ">
            참가자 수:<span>1234명</span>
          </p>
        </div>
        <ParticipateBtn challengeId={id} />
      </div>
    </>
  );
};

export default ChallengePage;
