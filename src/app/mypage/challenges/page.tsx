"use client";
import { supabase } from "@/supabase/supabase";
import { timeUtil } from "@/utils/timeutils";
import React, { useEffect, useState } from "react";

type Challenge = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  thumbnail: string;
  createdAt : string
};

type UserChallenge = {
  id: string;
  challenge_id: string;
  user_profile_id: string;
  challenges: Challenge;

};

const Challenges = () => {

  const [challenges, setChallenges] = useState<UserChallenge[]>([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      const { data } = await supabase.auth.getSession();
      const userId = data.session?.user.id;

      if (userId) {
        const { data, error } = await supabase
          .from("user_challenges")
          .select(
            `
          id, 
          challenge_id,
          user_profile_id,
          challenges :challenge_id (*)
        `
          )
          .eq("user_profile_id", userId);

        if (error) {
          console.error("에러발생함", error);
          return;
        }
        setChallenges(data);
      }
    };
    fetchChallenges();
  }, []);

  console.log("올바르게 불러와지는 지 체크임", challenges);

  

  return (
    <div className="min-w-120">
      <h2 className="flex justify-center">Challenges</h2>
      <ul className="flex flex-col justify-center items-center gap-8">
        {challenges.length > 0 ? (
          challenges.map((item) => {
            const {formatStartDate, formatEndDate, durationMessage, formattedCreatedAt } = timeUtil(item.challenges.start_date, item.challenges.end_date, item.challenges.createdAt)

            return (
              <div className="flex justify-between gap-8" key={item.challenges.id}>
                <img
                  src={`${item.challenges.thumbnail}`}
                  alt="섬네일 이미지"
                  width={125}
                  height={125}
                />
                <div>
                  <p>{item.challenges.name} {durationMessage}</p>
                  <p>{formatStartDate} ~ {formatEndDate} </p>
                  <p> 생성일자 {formattedCreatedAt}</p>
                </div>
              </div>
            );
          })
        ) : (
            <p>도전중인 챌린지가 존재하지 않아요 </p>
            
        )}
      </ul>
    </div>
  );
};

export default Challenges;