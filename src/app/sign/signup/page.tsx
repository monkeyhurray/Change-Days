'use client';

import React, { useState } from 'react';
import { supabase } from '@/supabase/supabase';

import { useRouter } from 'next/navigation';
import { USER_ALREADY_REGISTERED } from '@/constants/errorCode';

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

    if (email.length === 0 || password.length === 0) {
      setError('모든 입력칸을 올바르게 작성해주세요.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log('회원가입 처리 후 확인 데이터 => ', data);

      setEmail('');
      setPassword('');

      alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      router.replace('/sign/signin');

      if (error && error.message === USER_ALREADY_REGISTERED) {
        alert('이미 가입된 이메일입니다.');
        console.log(error);
        return;
      }
    } catch (error: any) {
      setError(error.message);
      alert('회원가입 도중 오류가 발생하였습니다. 고객센터로 연락해주세요.');
      console.error(error);
      return;
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmitSignUp}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            value={email}
            placeholder='ex. changedays@gmail.com'
            onChange={(e) => {
              if (error.length !== 0) {
                setError('');
              }
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
          />
        </div>
        {!emailValid && (
          <p className='text-red-500'>* 유효한 이메일을 입력해주세요.</p>
        )}

        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            value={password}
            placeholder='ex. changedays!1234'
            onChange={(e) => {
              if (error.length !== 0) {
                setError('');
              }
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
          />
        </div>
        {!pwValid && (
          <p className='text-red-500'>
            * 영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
          </p>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
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
