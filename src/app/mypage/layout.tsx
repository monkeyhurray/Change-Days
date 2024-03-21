'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabase/supabase';
import { useRouter } from 'next/navigation';

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    let checkUnmounted = false;
    const getUserSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log('data => ', data);

      // 로그인, 회원가입 로직에는 반대로 해서 적용해야 함
      if (!checkUnmounted) {
        const isLogin = data.session?.access_token ? true : false;
        if (isLogin) {
          router.push(`/mypage/${data.session?.user.id}`);
          setShouldRender(true);
        } else {
          // alert가 의존성 배열 때문에 2번 뜨는 이슈가 있음 => 해결해야 함
          alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.');
          router.replace('/sign/signin');
          return;
        }
      }
    };
    getUserSession();

    return () => {
      checkUnmounted = true;
    };
  }, [router]);

  return <>{shouldRender && children}</>;
};

export default MyPageLayout;
