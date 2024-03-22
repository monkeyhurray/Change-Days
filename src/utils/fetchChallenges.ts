import { supabase } from "@/supabase/supabase";

type Challenge = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  thumbnail: string;
  createdAt : string
};

  export const fetchChallenges = async (userId : string, setChallengesCallback :(challenges : Challenge[]) => void) : Promise<void> => {
    if (!userId) return;

      if (userId) {
        const { data, error } = await supabase
          .from("user_challenges")
          .select(
            `
          id, 
          challenge_id,
          user_profile_id,
          challenges :challenge_id (*)
        `
          )
          .eq("user_profile_id", userId);

        if (error) {
          console.error("에러발생함", error);
          return;
        }
        
        setChallengesCallback(data);
      }
    };
