"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import { useRouter, usePathname } from "next/navigation";
import { Session } from "@supabase/supabase-js";
import HamburgerMenu from "./HamburgerMenu";

const Header = () => {
  const [session, setSession] = useState<Session | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getUserSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(data.session);
      } catch (error) {
        alert("Session 처리에 오류가 발생했습니다.");
        console.log(error);
      }
    };

    getUserSession();
  }, [router, pathname]);

  const token = session?.access_token ? true : false;

  return (
    <div className="flex border-b border-b-gray-500 h-14 items-center justify-between">
      <p>
        <Link className="font-bold text-lg" href="/">
          Change Days
        </Link>
      </p>
      <p>
        {token ? (
          <HamburgerMenu
            signOut={() => {
              supabase.auth.signOut();
              router.replace("/sign/signin");
            }}
          />
        ) : (
          <>
            <Link href={"/sign/signin"}>로그인 /</Link>
            <Link href={"/sign/signup"}>회원가입</Link>
          </>
        )}
      </p>
    </div>
  );
};

export default Header;
