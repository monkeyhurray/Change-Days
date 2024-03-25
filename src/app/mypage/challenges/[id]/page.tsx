'use client';

import { supabase } from '@/supabase/supabase';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

const ChallengePage = () => {
  const router = useRouter();
  const { id: challengeId } = useParams();
  const [fulfillments, setFulfillments] = useState<any>([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const fetchFulfillments = async () => {
      if (!challengeId) return;

      const { data: userChallengeData, error: userChallengeError } =
        await supabase
          .from('user_challenges')
          .select('id')
          .eq('challenge_id', challengeId)
          .single();

      if (userChallengeError) {
        console.error(userChallengeError);
        return;
      }

      const { data: fulfillmentsData, error: fulfillmentsError } =
        await supabase
          .from('user_fulfill')
          .select('*')
          .eq('user_challenge_id', userChallengeData.id);

      if (fulfillmentsError) {
        console.error(fulfillmentsError);
        return;
      }

      setFulfillments(fulfillmentsData);

      console.log(fulfillmentsData);
    };

    fetchFulfillments();
  }, [challengeId]);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (!file) return;

    const { error, data } = await supabase.storage
      .from('images')
      .upload(`challenge/${file.name}`, file);

    if (error) {
      alert(`업로드 실패: ${error.message}`);
    } else {
      alert('업로드 성공!');

      const { data: userChallengeData, error: userChallengeError } =
        await supabase
          .from('user_challenges')
          .select('id')
          .eq('challenge_id', challengeId)
          .single();

      if (userChallengeError) {
        console.error(userChallengeError);
        return;
      }

      const { error: fulfillError } = await supabase
        .from('user_fulfill')
        .insert([
          {
            user_challenge_id: userChallengeData.id,
            date: new Date().toISOString(),
            isdone: true,
          },
        ]);
      console.log('ddds', userChallengeData);

      if (fulfillError) {
        console.error(fulfillError);
        return;
      }
    }
  };

  const handleButtonClick = () => {
    router.back();
  };

  return (
    <div>
      <button onClick={handleButtonClick}>뒤로가기</button>
      <div>
        <h2> 참여도 </h2>
        <ul>
          {fulfillments.length > 0 ? (
            fulfillments.map((fulfillment, index) => (
              <li key={index}>
                Date: {fulfillment.date}, Completed:{' '}
                {fulfillment.isdone ? 'Yes' : 'No'}
              </li>
            ))
          ) : (
            <p>아직 완료된 챌린지가 없습니다.</p>
          )}
        </ul>
      </div>
      <div>
        <input type='file' onChange={handleFileUpload}></input>
      </div>
    </div>
  );
};

export default ChallengePage;
