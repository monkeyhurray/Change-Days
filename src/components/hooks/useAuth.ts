import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/utils/supabaseClient';

import type { AuthCredentials } from '@/types/index';

export const useSignin = () => {
  return useMutation(async ({ email, password }: AuthCredentials) => {
    const { user, error } = await supabase.auth.signIn({ email, password });

    if (error) throw new Error(error.message);
    return user;
  });
};

export const useSignup = () => {
  return useMutation(async ({ email, password }: AuthCredentials) => {
    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) throw new Error(error.message);
    return user;
  });
};
