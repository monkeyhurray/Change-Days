'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabase/supabase';
import { useRouter, usePathname } from 'next/navigation';
import { Session } from '@supabase/supabase-js';

const Header = () => {
  const [session, setSession] = useState<Session | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getUserSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getUserSession();
  }, [router, pathname]);

  const token = session?.access_token ? true : false;

  return (
    <div className='flex bg-slate-300 h-14 items-center justify-between'>
      <p>
        <Link href='/'>Change Days</Link>
      </p>
      <p>
        {token ? (
          <button
            onClick={() => {
              supabase.auth.signOut();
              router.replace('/sign/signin');
            }}
          >
            로그아웃
          </button>
        ) : (
          <>
            <Link href={'/sign/signin'}>로그인 /</Link>
            <Link href={'/sign/signup'}>회원가입</Link>
          </>
        )}
      </p>
    </div>
  );
};

export default Header;
