import { supabase } from "@/supabase/supabase";
import React from "react";

const OngoingPage = async (id) => {
  const { data: challenges, error } = await supabase
    .from("userChallenges")
    .select("*")
    .eq("userId", id);

  return <div>OngoingPage</div>;
};

export default OngoingPage;
