import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newChallenge) => {
      const response = await fetch(`http://localhost:4000/challenge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newChallenge),
      });
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenge"] });
    },
  });
};
