"use client";

import {
  frequencyArr,
  periodArr,
  useOneWeek,
  days,
} from "@/components/createChallenge/createCalendar";
import CreateChallengeBar from "@/components/common/Create-ChallengeBar";
import React, { useState } from "react";

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
};

const CreateChallengePage = () => {
  const [title, setTitle] = useState("");
  // const [public, setPublic] = useState(false);
  const [authorize, setAuthorize] = useState("");
  const [frequency, setFrequency] = useState("매일");
  const [period, setPeriod] = useState("");

  const postChallengeMutation = useCreateMutation();

  function getDayOfWeek() {
    const dayOfWeek = new Date().getDay();

    //0:일, 1:월, 2:화, 3:수, 4:목, 5:금, 6:토
    return dayOfWeek;
  }
  console.log(getDayOfWeek());

  const toUseOneWeek = useOneWeek();
  console.log(toUseOneWeek);
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
    setPeriod(periodArrFilter.value);
  };

  const createChallengeBtn = () => {
    setTitle("");
    setAuthorize("");
    postChallengeMutation.mutate();
  };

  return (
    <div className="mx-auto">
      {" "}
      <div className="text-center">
        <div>
          <h1>제목:&nbsp;</h1>
          <input
            className="border border-black-700 rounded border-black"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <h1>인증 빈도:&nbsp;</h1>

        <div className="mt-1 flex">
          {frequencyArr.map((item) => {
            return (
              <div key={item.id}>
                <button
                  className={`${
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
        <div>
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
        <h1>챌린지 기간:&nbsp;</h1>
        <div className="mt-1 flex">
          {periodArr.map((item) => {
            return (
              <div key={item.id}>
                <button
                  className={`${
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
        <div>인증 가능 시간</div>
        <div className="h-20 w-44 border border-black-700 rounded border-black">
          <button>시작 시간&nbsp;|</button>
          <button>&nbsp;종료 시간</button>
        </div>
        <div>
          <h1>시작일:&nbsp;</h1>

          {toUseOneWeek.map((day, idx) => {
            return <button key={idx}>{day.slice(6)} ()</button>;
          })}
        </div>
        <div>
          <div>인증 방법</div>
          <textarea
            value={authorize}
            required
            onChange={(e) => setAuthorize(e.target.value)}
          />
        </div>
        <button onClick={() => {}}>이전</button>
        <CreateChallengeBar />
      </div>
    </div>
  );
};

const ACTIVE_BUTTON =
  "mt-1 flex text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700";
const INACTIVE_BUTTON =
  "mt-1 flex border border-black-700 rounded border-black";

export default CreateChallengePage;
