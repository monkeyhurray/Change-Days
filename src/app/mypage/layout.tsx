<<<<<<< HEAD
'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabase/supabase';
import { useRouter, usePathname } from 'next/navigation';
=======
"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import { useRouter, usePathname } from "next/navigation";
>>>>>>> 5aceba5 (fix: 코드 수정 완료)

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [shouldRender, setShouldRender] = useState<boolean>(false);

  useEffect(() => {
    const getUserSession = async () => {
      const { data, error } = await supabase.auth.getSession();
<<<<<<< HEAD
      console.log('data => ', data);
=======
      console.log("data => ", data);
>>>>>>> 5aceba5 (fix: 코드 수정 완료)

      // 로그인, 회원가입 로직에는 반대로 해서 적용해야 함
      const isLogin = data.session?.access_token ? true : false;
      if (isLogin) {
        setShouldRender(isLogin);
      } else {
        // alert가 의존성 배열 때문에 2번 뜨는 이슈가 있음 => 해결해야 함
<<<<<<< HEAD
        alert('로그인이 필요한 서비스입니다.');
        router.replace('/sign/signin');
=======
        alert("로그인이 필요한 서비스입니다.");
        router.replace("/sign/signin");
>>>>>>> 5aceba5 (fix: 코드 수정 완료)
      }
    };

    getUserSession();
  }, [router, pathname]);

<<<<<<< HEAD
  return <>{shouldRender && children}</>;
=======
  return (
    <div className="p-7 pt-10 mt-5 mx-auto w-2/5 min-w-96 rounded-lg shadow-lg shadow-gray-500/50">
      {shouldRender && children}
    </div>
  );
>>>>>>> 5aceba5 (fix: 코드 수정 완료)
};

export default MyPageLayout;
