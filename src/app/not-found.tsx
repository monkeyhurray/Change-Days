'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const NotFound = () => {
  const router = useRouter();
  return (
    <div className='bg-white flex justify-center items-center min-h-screen py-16'>
      <div className='max-w-md text-center'>
        <h1 className='text-3xl font-bold mb-8'>
          해당 페이지를 찾을 수 없습니다.
        </h1>
        <h2
          className='text-2xl hover:underline cursor-pointer'
          onClick={() => {
            router.replace('/');
          }}
        >
          홈으로
        </h2>
      </div>
    </div>
  );
};

export default NotFound;
