'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChallengeListRow } from '@/app/page';
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
const MainSlider = ({ items }: PropsWithChildren<Props>) => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={4}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {items.map((item: ChallengeListRow) => (
        <SwiperSlide key={item.id}>
          <Link href={`/challenge/${item.id}`} className=' bg-blue-100'>
            <Image
              className='bg-black'
              src='/challenge.jpeg'
              alt='vercel'
              width='300'
              height='300'
            />
            <p className="text-m mb-1">{item.created_by}</p>
            <p className="text-xl mb-1">{item.name}</p>
            <p>
              <span className="bg-gray-300 mr-3 rounded-lg px-2 py-1 text-gray-700">
                {item.start_date}-{item.end_date}
              </span>
              <span className='bg-gray-300 mr-3 rounded-lg px-2 py-1 text-gray-700'>
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
