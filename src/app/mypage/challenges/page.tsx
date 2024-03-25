'use client';
import { supabase } from '@/supabase/supabase';
import { fetchChallenges } from '@/utils/fetchChallenges';
import { timeUtil } from '@/utils/timeutils';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';

type Challenge = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  thumbnail: string;
  createdAt: string;
};

type UserChallenge = {
  id: string;
  challenge_id: string;
  user_profile_id: string;
  challenges: Challenge;
  startDate: string;
  endDate: string;
};

const Challenges = () => {
  const router = useRouter();
  const [challenges, setChallenges] = useState<UserChallenge[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const userId = data.session?.user.id;
      if (userId) {
        fetchChallenges(userId, setChallenges);
      }
    });
  }, []);

  const handleGetChallengeButton = (id: string) => {
    router.push(`/mypage/challenges/${id}`);
  };
  console.log(challenges);

  return (
    <div className='min-w-120'>
      <h2 className='flex justify-center'>Challenges</h2>
      <ul className='flex flex-col justify-center items-center gap-8'>
        {challenges.length > 0 ? (
          challenges.map((item) => {
            const { formatStartDate, formatEndDate, durationMessage } =
              timeUtil(
                item.challenges.start_date,
                item.challenges.end_date,
                item.challenges.createdAt
              );
            return (
              <div
                onClick={() => handleGetChallengeButton(item.challenge_id)}
                className='flex justify-between gap-8'
                key={item.challenge_id}
              >
                <img
                  src={`${item.challenges.thumbnail}`}
                  alt='섬네일 이미지'
                  width={125}
                  height={125}
                />
                <div>
                  <p>
                    {item.challenges.name} {durationMessage}
                  </p>
                  <p>
                    {formatStartDate} ~ {formatEndDate}{' '}
                  </p>
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
