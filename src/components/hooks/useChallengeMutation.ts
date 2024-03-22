import { supabase } from "@/supabase/supabase";

const postCreateChallengeData = async (newChallenge: {
  name: string;
  frequency: string;
}) => {
  try {
    const { error } = await supabase
      .from("challenges")
      .insert([
        {
          name: newChallenge.name,
          frequency: newChallenge.frequency,
        },
      ])
      .select();
    if (error) {
      return Promise.reject(error);
    }
  } catch (error) {
    alert("오류 발생했어요");
    console.log(error);
  }
};
export { postCreateChallengeData };
