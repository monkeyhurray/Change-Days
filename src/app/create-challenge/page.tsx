"use client";

import { DateTime } from "luxon";
import { useState } from "react";
import { useRef } from "react";
import Link from "next/link";
import UploadImg from "@/components/common/UploadImg";
import {
  frequencyArr,
  periodArr,
} from "@/components/createChallenge/noCreateCalendar";

import { useCreateMutation } from "@/components/hooks/useChallengeMutation";
type FrequencyIds = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type FrequencyChallenge = {
  id: FrequencyIds;
  certificationDays: string;
  value: string;
  days: number;
};

type PeriodChallenge = {
  id: FrequencyIds;
  value: string;
  number: number;
};

const CreateChallengePage = () => {
  const imgFalseRef = useRef<HTMLImageElement>(null);
  const imgTrueRef = useRef<HTMLImageElement>(null);
  const dt = DateTime.now();
  const [title, setTitle] = useState("");
  const [textAreaAuthorize, setTextAreaAuthorize] = useState("");
  const [frequency, setFrequency] = useState("매일");
  const [period, setPeriod] = useState("");
  const [periodNum, setPeriodNum] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [startToday, setStartToday] = useState("");
  const [monthWeek, setMonthWeek] = useState(9);

  const [exampleFalseImg, setExampleFalseImg] = useState(
    "https://newsimg-hams.hankookilbo.com/2023/06/09/3a4636e2-63f3-4aba-af1e-8f08e469f12d.jpg"
  );

  const [exampleTrueImg, setExampleTrueImg] = useState(
    "https://image.news1.kr/system/photos/2022/3/21/5278974/article.jpg/dims/optimize"
  );

  const [img, setImg] = useState("");

  const postChallengeMutation = useCreateMutation();
  const arr = Array.from({ length: 7 }, (v, i) => i++);

  const frequencyFunc = (id: FrequencyIds) => {
    const frequencyArrFilter = frequencyArr.find(
      (item) => item.id === id
    ) as FrequencyChallenge;
    setFrequency(frequencyArrFilter.value);
  };

  const periodFunc = (id: FrequencyIds) => {
    const periodArrFilter = periodArr.find(
      (item) => item.id === id
    ) as PeriodChallenge;
    setPeriodNum(periodArrFilter.number);
    setMonthWeek(9);
    setPeriod(periodArrFilter.value);
  };

  const onclickStartDay = (idx: number) => {
    setMonthWeek(idx);
    const plusDt = dt.plus({ days: idx + periodNum });
    const todayDt = dt.plus({ days: idx });
    const laterDate = plusDt.month + "월" + plusDt.day + "일";
    setStartToday(`${todayDt.month}월${todayDt.day}일`);
    setStartDate(laterDate);
  };

  const readFalseImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const imageFile = e.target.files[0];
    const reader = new FileReader();
    console.log(imageFile);
    console.log(reader);

    reader.onload = (event: ProgressEvent<FileReader>) => {
      console.log(event.target?.result);
      if (!event || !event.target) return;
      if (typeof event.target.result !== "string" || !imgFalseRef.current)
        return;

      imgFalseRef.current.src = event.target.result as string;
    };
    console.log(imgFalseRef);
    reader.readAsDataURL(imageFile);
  };

  const readTrueImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const imageFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (!event || !event.target) return;
      if (typeof event.target.result !== "string" || !imgTrueRef.current)
        return;

      imgTrueRef.current.src = event.target.result as string;
    };

    reader.readAsDataURL(imageFile);
  };

  const createChallengeBtn = () => {
    setTitle("");
    setTextAreaAuthorize("");
    postChallengeMutation.mutate();
  };

  return (
    <div className="mt-8">
      {" "}
      <div className="ml-20">
        <div className="flex mb-5">
          <h1>제목:&nbsp;</h1>
          <input
            className="border border-black-700 rounded border-black"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <h1 className="mb-5">인증 빈도:&nbsp;</h1>
        <div className="mb-5 mt-1 flex">
          {frequencyArr.map((item) => {
            return (
              <div key={item.id}>
                <button
                  className={`mr-2 ${
                    frequency === item.value ? ACTIVE_BUTTON : INACTIVE_BUTTON
                  }`}
                  onClick={() => frequencyFunc(item.id)}
                >
                  {item.value}
                </button>
              </div>
            );
          })}
        </div>
        <div className="mb-3">
          {frequencyArr.map((item) => {
            return (
              <div key={item.id}>
                {frequency === item.value ? (
                  <div>인증 요일은 {item.certificationDays} </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
        <h1 className="mb-3">챌린지 기간:&nbsp;</h1>
        <div className="mb-3 mt-1 flex">
          {periodArr.map((item) => {
            return (
              <div key={item.id}>
                <button
                  className={`mr-2 ${
                    period === item.value ? ACTIVE_BUTTON : INACTIVE_BUTTON
                  }`}
                  onClick={() => periodFunc(item.id)}
                >
                  {item.value}
                </button>
              </div>
            );
          })}
        </div>
        {/* <div>인증 가능 시간</div>
        <div className="h-20 w-44 border border-black-700 rounded border-black">
          <button>시작 시간&nbsp;|</button>
          <button>&nbsp;종료 시간</button>
        </div> */}
        <h1 className="mb-3">시작일:&nbsp;</h1>
        <div className="mb-3 mt-1 flex">
          {arr.map((num) => {
            const nowMonthWeek = `${dt.month}월 ${dt.day + num}일`;
            return (
              <button
                className={`mr-2 ${
                  monthWeek === num ? ACTIVE_BUTTON : INACTIVE_BUTTON
                }`}
                key={num}
                onClick={() => onclickStartDay(num)}
              >
                {nowMonthWeek}
              </button>
            );
          })}
        </div>
        <h1 className="mb-3">
          {startDate !== "" && monthWeek !== 9
            ? `${startToday} ~ ${startDate}`
            : ""}
        </h1>
        <div>
          <div className="mb-3">인증 방법</div>
          <textarea
            className="h-28 w-6/12 border border-black-700 rounded border-black"
            value={textAreaAuthorize}
            placeholder="예) 오늘 날짜와 걸음 수가 적힌 만보기 캡쳐 화면 업로드"
            required
            onChange={(e) => setTextAreaAuthorize(e.target.value)}
          />
        </div>

        <label>나쁜 예시 사진</label>
        <div>
          <input
            type="file"
            onChange={(e) => readFalseImage(e)}
            accept="image/*"
          />
          <div>
            <img
              ref={imgFalseRef}
              src={exampleFalseImg}
              width={200}
              height={200}
              alt="img"
            />
          </div>
        </div>
        <label>옳은 예시 사진</label>
        <div>
          <input
            type="file"
            onChange={(e) => readTrueImage(e)}
            accept="image/*"
          />

          <div>
            <img
              ref={imgTrueRef}
              src={exampleTrueImg}
              width={200}
              height={200}
              alt="img"
            />
          </div>
        </div>
        <UploadImg />
        <h1 className="mt-5 mb-5">진짜 인증 사진</h1>
        <img width={150} height={100} src={img} alt="진짜 이미지" />
        <input type="file" />
        <div>
          <Link
            className="inline-flex items-center h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
            href="/"
          >
            이전
          </Link>
          <Link
            className="inline-flex items-center h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
            href="/"
            onClick={createChallengeBtn}
          >
            완료
          </Link>
        </div>
      </div>
    </div>
  );
};

const ACTIVE_BUTTON =
  "mt-1 flex text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700";
const INACTIVE_BUTTON =
  "mt-1 w-20 h-7 justify-center flex border border-black-700 rounded border-black";

export default CreateChallengePage;
