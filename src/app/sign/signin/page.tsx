"use client";


import React, { useState } from "react";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmitSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('로그인 처리 후 확인 데이터 => ', data);

      if (error) {
        alert("로그인 도중 오류가 발생하였습니다. 고객센터로 연락해주세요.");
        console.log(error);

        return;
      }
    } catch (error) {
      alert("로그인 도중 오류가 발생하였습니다. 고객센터로 연락해주세요.");
      console.log(error);
    }

    router.replace("/");
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmitSignIn}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          value={email}
          placeholder='ex. changedays@gmail.com'
          // minLength={}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          placeholder="ex. changedays!1234"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">로그인하기</button>
      </form>
    </div>
  );
};

export default SignInPage;
