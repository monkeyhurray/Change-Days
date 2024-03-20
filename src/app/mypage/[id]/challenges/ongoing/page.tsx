"use client";
import { supabase } from "@/supabase/supabase";
import React, { useEffect, useState } from "react";

const OngoingPage = (id: string) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data: userchallenges, error } = await supabase
          .from("userchallenges")
          .select("*");
        if (error) throw error;
        const userData = { userchallenges };
        console.log(userData);
      } catch (error) {
        console.error("에러가 발생했어요 에러내용 : ", error);
      }
    })();
  }, [id]);

  return <div></div>;
};

export default OngoingPage;
