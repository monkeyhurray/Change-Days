'use client';

import React, { useState } from 'react';
import { supabase } from '@/supabase/supabase';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmitSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert('회원가입 도중 오류가 발생하였습니다. 고객센터로 연락해주세요.');
        console.log(error);

        return;
      }
    } catch (error) {
      alert('회원가입 도중 오류가 발생하였습니다. 고객센터로 연락해주세요.');
      console.log(error);
    }

    alert('회원가입이 완료되었습니다!');
    router.replace('/sign/signin');
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmitSignUp}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='email'
            value={email}
            placeholder='ex. changedays@gmail.com'
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
            placeholder='ex. changedays!1234'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type='submit'>회원가입하기</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
