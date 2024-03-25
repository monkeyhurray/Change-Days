'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import React, { PropsWithChildren, useEffect, useState } from 'react';
import Link from 'next/link';
import { ChallengeListRow } from '@/app/page';
import { supabase } from '@/supabase/supabase';
import { timeUtil } from '@/utils/timeutils';

type Item = {
  name: string;
  id: number;
  userId: string;
};

type FormattedDateInfoItem = {
  formatStartDate: string;
  formatEndDate: string;
  durationMessage: string;
};

type Props = {
  items: ChallengeListRow[] | any;
};
const fetchUserData = async (userId: string | null) => {
  if (userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('uid', userId)
      .single();

    if (error) {
      console.error('사용자 정보를 가져오는 데 실패했습니다.', error);
      return null;
    }

    return data;
  }
};

const MainSlider = ({ items }: PropsWithChildren<Props>) => {
  const [userData, setUserData] = useState<{ name: string }[]>([]);
  const [formattedDateInfo, setFormattedDateInfo] = useState<
    FormattedDateInfoItem[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const userDataPromises = items.map((item: ChallengeListRow) =>
        fetchUserData(item.created_by)
      );
      const userDataList = await Promise.all(userDataPromises);
      setUserData(userDataList);
    };

    fetchData();
  }, [items]);

  useEffect(() => {
    const updateFormattedDateInfo = async () => {
      const updatedInfo = await Promise.all(
        items.map(async (item: any) => {
          const { formatStartDate, formatEndDate, durationMessage } = timeUtil(
            item.start_date,
            item.end_date,
            item.created_at
          );
          return { formatStartDate, formatEndDate, durationMessage };
        })
      );
      setFormattedDateInfo(updatedInfo);
    };

    updateFormattedDateInfo();
  }, [items]);

  useEffect(() => {
    console.log('userData', userData);
  }, [userData]);

  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={4}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {items.map((item: ChallengeListRow, index: number) => (
        <SwiperSlide key={item.id}>
          <Link className='block h-72' href={`/challenge/${item.id}`}>
            <div style={{ height: '200px' }} className='h-50 relative mb-3'>
              <img
                className='object-cover h-full w-full'
                src={item.thumbnail ? item.thumbnail : '/challenge.jpeg'}
                alt='vercel'
              />
            </div>
            <p className='text-m mb-1'>{userData[index]?.name}</p>
            <p className='text-xl mb-2'>{item.name}</p>
            <p>
              <span className='bg-gray-300 mr-3 rounded-lg px-2 py-1 text-gray-700'>
                {formattedDateInfo[index]?.formatStartDate}-
                {formattedDateInfo[index]?.formatEndDate}
              </span>
              <span className='bg-gray-300 mr-3 rounded-lg px-2 py-1 text-gray-700'>
                {formattedDateInfo[index]?.durationMessage}
              </span>
            </p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlider;
