'use client';

import React, { useState } from 'react';
import { useSignup } from '../../../components/hooks/useAuth';
import { redirect } from 'next/navigation';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signupMutation = useSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    signupMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          alert('회원가입 되셨습니다!');
          redirect('/sign/signin');
        },
        onError: (error) => {
          alert(`회원가입에 실패하였습니다. ${error.message}`);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input
          id='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <button type='submit'>회원가입하기</button>
      </div>
    </form>
  );
};

export default SignUpPage;
