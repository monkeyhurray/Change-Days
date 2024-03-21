import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabase";
// export const useCreateMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (newChallenge) => {
//       const response = await fetch(`http://localhost:4000/challenge`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newChallenge),
//       });
//       const data = await response.json();
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["challenge"] });
//     },
//   });
// };

const postCreateChallengeData = async (newChallenge: { name: string }) => {
  try {
    const { error } = await supabase
      .from("challenges")
      .insert([
        {
          name: newChallenge.name,
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
