'use client';
import { supabase } from '@/supabase/supabase';
import React, { useEffect, useState, useRef } from 'react';
import { ChallengeListRow } from '@/app/page';
import ParticipateBtn from '@/components/challenge/ParticipateBtn';
import { timeUtil } from '@/utils/timeutils';
import UploadModal from '@/components/common/UploadModal';
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
// import camera from '../../../../public/camera.jpg';

import { UserDataProps } from '@/components/mypage/UserData';
type Props = {
  params: { id: string };
};
const ChallengePage = ({ params }: Props) => {
  const id = params.id;

  const [challenge, setChallenge] = useState<ChallengeListRow | null>(null);
  const [user, setUser] = useState<UserDataProps | null>(null);
  const [createdByUser, setCreatedByUser] = useState<string | null>(null);
  const [durationMessage, setDurationMessage] = useState<string>('');
  const [formattedStartDate, setFormattedStartDate] = useState<string>('');
  const [formattedEndDate, setFormattedEndDate] = useState<string>('');
  const [prevImage, setPrevImage] = useState('');
  const [uploadImg, setUploadImg] = useState<File | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const fetchUserData = async () => {
    const { data, error } = await supabase.auth.getUser();
    console.log(data);

    if (data.user) {
      console.log('userId', data.user.id);
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('uid, nickname', data.user.id)
        .single();
      console.log('user', userData);
      setUser(userData);
    }
  };
  console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      const { data: challengeData, error: challengeError } = await supabase
        .from('challenges')
        .select(
          `*,
           id, name, public, start_date, end_date, thumbnail, etc, created_by, created_at`
        )
        .eq('id', id)
        .single();

      // const { data, error } = await supabase.auth.signUp({
      //   email,
      //   password,
      // });

      // console.log('회원가입 처리 후, 확인 데이터 => ', data.user);

      // if (data.user && data.user.id) {
      //   const { error: insertError } = await supabase.from('users').insert([
      //     {
      //       uid: data.user.id,
      //       nickname: '원숭이',
      //       email: data.user.email,
      //     },
      //   ]);

      if (challengeError) {
        console.error(
          '챌린지 정보를 가져오는 중 오류가 발생했습니다.',
          challengeError
        );

        return;
      }
      console.log('dsdasd', challengeData);
      setChallenge(challengeData);

      if (challengeData) {
        const { formatStartDate, formatEndDate, durationMessage } = timeUtil(
          challengeData.start_date,
          challengeData.end_date,
          challengeData.created_at
        );
        setDurationMessage(durationMessage);
        setFormattedStartDate(formatStartDate);
        setFormattedEndDate(formatEndDate);
        console.log('며칠하니', durationMessage);
      }

      if (challengeData && challengeData.created_by) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('uid', challengeData.created_by)
          .single();

        if (userError) {
          console.error(
            '사용자 정보를 가져오는 중 오류가 발생했습니다.',
            userError
          );
          return;
        }

        setCreatedByUser(userData?.name || null);
      }
    };

    fetchData();
    fetchUserData();
  }, [id]);

  const readImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const imageFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (!event || !event.target) return;
      if (typeof event.target.result !== 'string' || !fileRef.current) return;

      fileRef.current.src = event.target.result as string;
    };
    setUploadImg(imageFile);

    reader.readAsDataURL(imageFile);
    return new Promise((resolve) => {
      reader.onload = () => {
        setPrevImage(reader.result as string);
      };
    });
  };

  if (!challenge) {
    return <div>챌린지 정보를 불러오는 중입니다...</div>;
  }

  return (
    <>
      <div>
        <div className='border-b-2 border-b-gray-300 py-3'>
          <p className='mb-2'>
            <span className='mr-5 text-2xl'>{challenge.name}</span>
            <span className='mr-3 text-white bg-gray-600 p-2 rounded-xl'>
              {durationMessage}
            </span>
            <span className='mr-3 text-white bg-gray-600 p-2 rounded-xl'>
              {formattedStartDate}-{formattedEndDate}
            </span>
          </p>
          <span>작성자: 원숭이</span> {/* 작성자 표시 */}
        </div>

        <Card className='mt-10 py-4'>
          <CardHeader className='pb-0 pt-2 px-4 flex-col'>
            <p className='py-5 text-xl font-bold'>챌린지 소개</p>
          </CardHeader>
          <CardBody className='overflow-visible py-2'>
            <div className='flex flex-col items-center'>
              <Image
                alt='섬네일'
                className='object-cover rounded-xl'
                src={challenge.thumbnail}
                width={550}
                height={550}
              />
              <div className='mt-10 ml-16 mt-16 mr-16 mb-12'>
                {challenge.etc}
              </div>
            </div>
            {/* <div className='ml-16 mr-16'>
              <div>
                <p className='py-5 text-xl font-bold'>인증하기</p>
                <div className='h-24'>사진을 예쁘게 찍어서 올리세요</div>
                <div className='flex'>
                  <input
                    id='upload'
                    ref={fileRef}
                    type='file'
                    className='hidden'
                    onChange={(e) => readImage(e)}
                    accept='image/*'
                  />

                  <label htmlFor='upload' className='cursor-pointer'>
                    <Image
                      className='inline'
                      width={60}
                      height={60}
                      src={camera}
                      alt='사진'
                    />
                  </label>

                  {prevImage !== '' ? (
                    <Image
                      src={prevImage}
                      width={60}
                      height={60}
                      alt='보여줄 사진'
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {/* <div>
                <p className='py-5 '>
                  참가자 수:<span>&nbsp;1234명</span>
                </p>
              </div> 
            </div>  */}
          </CardBody>
        </Card>

        <ParticipateBtn challengeId={id} />
      </div>
    </>
  );
};

export default ChallengePage;
