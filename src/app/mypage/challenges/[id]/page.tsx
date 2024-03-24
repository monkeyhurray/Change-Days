'use client'

import { supabase } from "@/supabase/supabase";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";


const ChallengePage = () => {
  const router = useRouter();
  const { id: challengeId } = useParams()
  const [fulfillments, setFulfillments] = useState<any>([]);
  const [isDone, setIsDone] = useState(false);

  
  useEffect(() => {
    const fetchFulfillments = async () => {
      if (!challengeId) return;

      const { data: userChallengeData, error: userChallengeError } = await supabase
        .from('user_challenges')
        .select('id')
        .eq('challenge_id', challengeId)
        .single();

      if (userChallengeError) {
        console.error(userChallengeError);
        return;
      }

      const { data: fulfillmentsData, error: fulfillmentsError } = await supabase
        .from('user_fulfill')
        .select('*')
        .eq('user_challenge_id', userChallengeData.id);

      if (fulfillmentsError) {
        console.error(fulfillmentsError);
        return;
      }

      setFulfillments(fulfillmentsData);

      console.log(fulfillmentsData)
    };

    fetchFulfillments();
  }, [challengeId]);


  const handleButtonClick = () => {
    router.back()
  }

  return <div>
    <button onClick={handleButtonClick}>뒤로가기</button>
    <div>
      <h2> 참여도 </h2>
      <ul>
        {fulfillments.length > 0 ? (
          fulfillments.map((fulfillment, index) => (
            <li key={index}>
              Date: {fulfillment.date}, Completed: {fulfillment.isdone ? 'Yes' : 'No'}
            </li>
          ))
        ) : (
          <p>아직 완료된 챌린지가 없습니다.</p>
        )}
      </ul>
    </div>

  </div>


}


export default ChallengePage