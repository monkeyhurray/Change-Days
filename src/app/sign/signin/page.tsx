'use client';

import React, { useState } from 'react';
import { useSignin } from '../../../components/hooks/useAuth';
import { supabase } from '@/utils/supabaseClient';
import { redirect } from 'next/navigation';

async function signIn(email: string, password: string) {
  const { user, session, error } = await supabase.auth.signin({
    email,
    password,
  });

  if (error) {
    console.error('Login error:', error.message);
    return { error };
  }

  console.log('로그인된 유저:', user);
  console.log('Session:', session);
  redirect('/');

  return { user, session };
}

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useSignin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>로그인하기</button>
    </form>
  );
};

export default SignInPage;
