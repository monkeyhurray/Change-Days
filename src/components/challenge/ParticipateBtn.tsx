"use client";
import { supabase } from "@/supabase/supabase";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

type props = {
  challengeId: string;
};
const ParticipateBtn = ({ challengeId }: props) => {
  const [userData, setUserData] = useState<User | null>();
  const [isExistData, setIsExistData] = useState(false);
  const [isJoinClick, setIsJoinClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const { data: userData, error: error } = await supabase.auth.getUser();
      setUserData(userData.user);
    };
    fetchData();
  }, []);

  const onSubmitHandler = async () => {
    if (userData) {
      const { data, error } = await supabase
        .from("user_challenges")
        .insert({ challenge_id: challengeId, user_profile_id: userData.id });

      if (error) {
        console.log("참가하기 실패");
      } else {
        console.log("참가 성공");
        setIsJoinClick(true);
      }
    }
  };

  async function checkDataExists(challengeId: string, userId: string) {
    const { data, error } = await supabase
      .from("user_challenges")
      .select("*")
      .eq("challenge_id", challengeId)
      .eq("user_profile_id", userId);

    if (error) {
      console.error("Error fetching data:", error.message);
      return false; // or handle the error as needed
    }
    console.log(data);
    if (data.length > 0) {
      setIsExistData(true);
    } else {
      setIsExistData(false);
    }
    setIsLoading(true);
  }
  useEffect(() => {
    if (userData) {
      checkDataExists(challengeId, userData.id);
    }
  }, [userData, isJoinClick]);

  return (
    <>
      {isLoading && (
        <div>
          {isExistData ? (
            <p className="text-center font-bold">참가중인 챌린지입니다</p>
          ) : (
            <div onClick={onSubmitHandler} className="text-xl text-center ">
              <span className="mr-3 text-white bg-black px-5 py-3 rounded-xl cursor-pointer">
                참가하기
              </span>
            </div>
          )}
        </div>
      )}
      s
    </>
  );
};

export default ParticipateBtn;
