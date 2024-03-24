'use client'

import { supabase } from "@/supabase/supabase";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";


const ChallengePage = () => {
  const router = useRouter();
  const { challengeId } = useParams()
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const fetchChallengeData = async () => {
      if (!challengeId) return;

      const { data, error } = await supabase
        .from('user_fulfull')
        .select('*')
        .eq('challenge_id', challengeId)
        .single()
      
      if (error) {
        console.error('fulfill 불러오는데 실패함', error)
      }

      setIsDone(data?.isdone || false)
    }


    fetchChallengeData()
  },[challengeId])



  const handleButtonClick = () => {
    router.back()
  }

  return <div>
    <button onClick={handleButtonClick}>뒤로가기</button>
  </div>


}


export default ChallengePage