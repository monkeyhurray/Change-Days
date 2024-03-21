'use client';

import React, { useState } from 'react';
import { supabase } from '@/supabase/supabase';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [pwValid, setPwValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    if (email.length === 0) {
      setEmailValid(true);
      return;
    }
    setEmailValid(re.test(email));
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (password.length === 0) {
      setPwValid(true);
      return;
    }
    setPwValid(re.test(password));
  };

  const handleSubmitSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailValid || !pwValid) {
      setError('모든 입력칸을 올바르게 작성해주세요.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('로그인 처리 후 확인 데이터 => ', data);

      if (error) {
        alert('로그인 도중 오류가 발생하였습니다. 고객센터로 연락해주세요.');
        console.log(error);
        return;
      }

      setEmail('');
      setPassword('');
      router.replace('/');
    } catch (error: any) {
      setError(error.error_description || error.message);
      alert('로그인 도중 오류가 발생하였습니다. 고객센터로 연락해주세요.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmitSignIn}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            value={email}
            placeholder='ex. changedays@gmail.com'
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
          />
        </div>
        {!emailValid && (
          <p style={{ color: 'red' }}>* 유효한 이메일을 입력해주세요.</p>
        )}

        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            value={password}
            placeholder='ex. changedays!1234'
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
          />
        </div>
        {!pwValid && (
          <p style={{ color: 'red' }}>
            * 영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
          </p>
        )}
        <div>
          <button type='submit' disabled={loading}>
            {loading ? '처리 중...' : '로그인하기'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
