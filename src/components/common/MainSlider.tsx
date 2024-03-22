"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import React, { PropsWithChildren, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChallengeListRow } from "@/app/page";
import { supabase } from "@/supabase/supabase";
type Item = {
  name: string;
  id: number;
  userId: string;
  period: string;
  frequency: string;
};

type Props = {
  items: ChallengeListRow[] | any;
};
const fetchUserData = async (userId: string | null) => {
  if (userId) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("uid", userId)
      .single();

    if (error) {
      console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
      return null;
    }

    return data; // 사용자 정보 반환
  }
};

const MainSlider = ({ items }: PropsWithChildren<Props>) => {
  const [userData, setUserData] = useState<{ name: string }[]>([]);
  useEffect(() => {
    // MainSlider 컴포넌트가 렌더링될 때마다 사용자 정보를 가져오는 효과
    const fetchData = async () => {
      const userDataPromises = items.map((item: ChallengeListRow) =>
        fetchUserData(item.created_by)
      );
      const userDataList = await Promise.all(userDataPromises);
      setUserData(userDataList);
    };

    fetchData();
  }, [items]); // items가 변경될 때마다 실행

  useEffect(() => {
    console.log("userData", userData);
  }, [userData]);

  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={4}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {items.map((item: ChallengeListRow, index: number) => (
        <SwiperSlide key={item.id}>
          <Link className="block h-72" href={`/challenge/${item.id}`}>
            <div style={{ height: "200px" }} className="h-50 relative mb-3">
              <img
                className="object-cover h-full w-full"
                src={item.thumbnail ? item.thumbnail : "/challenge.jpeg"}
                alt="vercel"
              />
            </div>
            <p className="text-m mb-1">{userData[index]?.name}</p>
            <p className="text-xl mb-2">{item.name}</p>
            <p>
              <span className="bg-gray-300 mr-3 rounded-lg px-2 py-1 text-gray-700">
                {item.start_date}-{item.end_date}
              </span>
              <span className="bg-gray-300 mr-3 rounded-lg px-2 py-1 text-gray-700">
                {item.frequency}
              </span>
            </p>
          </Link>
        </SwiperSlide>
      ))}
      ...
    </Swiper>
  );
};

export default MainSlider;
