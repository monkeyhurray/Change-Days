// src/app/sign/signin/page.tsx
'use client';

import React, { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmitSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // signIn({ email, password });
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmitSignIn}>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          value={email}
          placeholder='ex. changedays@gmail.com'
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          value={password}
          placeholder='ex. changedays!1234'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>로그인하기</button>
      </form>
    </div>
  );
};

export default SignInPage;
