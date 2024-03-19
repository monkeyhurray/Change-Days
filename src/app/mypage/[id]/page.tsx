import { supabase } from "@/supabase/supabase";
import React from "react";

const PersonalPage = async () => {
  let { data: ChallengeList, error } = await supabase
    .from("ChallengeList")
    .select("*");

  let { data: user, error: userError } = await supabase
    .from("user")
    .select("*");

  console.log(ChallengeList);

  console.log(user);

  if (error) {
    return <>now Loading. . .</>;
  }

  if (userError) {
    return <>now Loading userData</>;
  }

  return (
    <div>
      {ChallengeList?.map((item) => {
        return <div key={item.id}>{item.initialDate}</div>;
      })}
      <p>1234567</p>
    </div>
  );
};

export default PersonalPage;
