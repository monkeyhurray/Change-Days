'use client';

import React, { useState } from 'react';
import { supabase } from '@/supabase/supabase';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [pwValid, setPwValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const validateEmail = (email: string) => {
    const regExp = /\S+@\S+\.\S+/;
    if (email.length === 0) {
      setEmailValid(true);
      return;
    }
    setEmailValid(regExp.test(email));
  };

  const validatePassword = (password: string) => {
    const regExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (password.length === 0) {
      setPwValid(true);
      return;
    }
    setPwValid(regExp.test(password));
  };

  const handleSubmitSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailValid || !pwValid) {
      setError('모든 입력칸을 올바르게 작성해주세요.');
      return;
    }

    setLoading(true);

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

      setEmail('');
      setPassword('');

      alert('회원가입이 완료되었습니다!');
      router.replace('/sign/signin');
    } catch (error: any) {
      setError(error.error_description || error.message);
      alert('회원가입 도중 오류가 발생하였습니다. 고객센터로 연락해주세요.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmitSignUp}>
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
            required
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
            required
          />
        </div>
        {!pwValid && (
          <p style={{ color: 'red' }}>
            * 영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
          </p>
        )}

        <div>
          <button type='submit' disabled={loading}>
            {loading ? '처리 중...' : '회원가입하기'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
