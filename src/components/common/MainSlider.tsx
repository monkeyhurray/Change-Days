"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import React, { PropsWithChildren } from "react";
import Link from "next/link";
import Image from "next/image";
type Item = {
  name: string;
  id: number;
  userId: string;
  period: string;
  frequency: string;
};

type Props = {
  items: Item[];
};
const MainSlider = ({ items }: PropsWithChildren<Props>) => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={4}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <Link href={`/challenge/${item.id}`} className=" bg-blue-100">
            <Image
              className="bg-red-300"
              src="/challenge.jpeg"
              alt="vercel"
              width="300"
              height="300"
            />
            <p className="text-m mb-1">{item.userId}</p>
            <p className="text-xl mb-1">{item.name}</p>
            <p>
              <span>{item.period}</span>
              <span>{item.frequency}</span>
            </p>
          </Link>
        </SwiperSlide>
      ))}
      ...
    </Swiper>
  );
};

export default MainSlider;
