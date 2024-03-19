import { supabase } from "@/supabase/supabase";
import React from "react";

const PersonalPage = async () => {
  const { data: challenges, error } = await supabase
    .from("challenges")
    .select("*");

  const { data: user, error: userError } = await supabase
    .from("user")
    .select("*");

  console.log("challenges 목록", challenges);

  console.log("userData", user);

  if (error) {
    return <>now Loading. . .</>;
  }

  if (userError) {
    return <>now Loading userData</>;
  }

  return (
    <div>
      {challenges?.map((item) => {
        return <div key={item.id}>{item.initialDate}</div>;
      })}
      <p>텍스트입니다</p>
      <div>
        {user.map((item) => {
          return <div key={item.id}>{item.nickname}</div>;
        })}
      </div>
    </div>
  );
};

export default PersonalPage;
