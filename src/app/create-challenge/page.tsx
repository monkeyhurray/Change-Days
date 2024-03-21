"use client";

import { DateTime } from "luxon";
import { MouseEvent, useState } from "react";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { supabase } from "@/supabase/supabase";

import {
  frequencyArr,
  periodArr,
} from "@/components/createChallenge/createCalendar";

import camera from "../../../public/camera.jpg";
import { postCreateChallengeData } from "@/components/hooks/useChallengeMutation";
import { useRouter } from "next/navigation";

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
  const dt = DateTime.now();
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("매일");
  const [period, setPeriod] = useState("");
  const [periodNum, setPeriodNum] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [startToday, setStartToday] = useState("");
  const [monthWeek, setMonthWeek] = useState(9);
  const [introduce, setIntroduce] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [uploadImg, setUploadImg] = useState<File | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
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
  const handleClickEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createChallengeBtn();
    router.push("/");
  };
  const readTrueImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const imageFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (!event || !event.target) return;
      if (typeof event.target.result !== "string" || !fileRef.current) return;

      fileRef.current.src = event.target.result as string;
    };
    setUploadImg(imageFile);

    console.log(imageFile);
    console.log(imageFile.name);
    reader.readAsDataURL(imageFile);
    return new Promise((resolve) => {
      reader.onload = () => {
        setPrevImage(reader.result as string);
      };
    });
  };

  const toUseStorage = async () => {
    try {
      const { error } = await supabase.storage
        .from("images")
        .upload(("challenge/" + uploadImg?.name) as string, uploadImg as File, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        alert(error);
        return console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createChallengeBtn = async () => {
    const newChallenge: { name: string; frequency: string } = {
      name,
      frequency,
    };

    await toUseStorage();
    await postCreateChallengeData(newChallenge);
    setName("");
  };

  return (
    <div className="mt-8">
      {" "}
      <div className="ml-20">
        <div className="flex mb-5">
          <h1>제목:&nbsp;</h1>
          <input
            className="border border-black-700 rounded border-black"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
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
                  <div>인증 요일은 {item.certificationDays} 입니다. </div>
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
        <div className="flex">
          <input
            id="upload"
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={(e) => readTrueImage(e)}
            accept="image/*"
          />

          <label htmlFor="upload" className="cursor-pointer">
            <Image
              className="inline"
              width={60}
              height={60}
              src={camera}
              alt="사진"
            />
          </label>

          {prevImage !== "" ? (
            <Image src={prevImage} width={60} height={60} alt="보여줄 사진" />
          ) : (
            <></>
          )}
        </div>

        <div>
          <div className="mb-3">소개</div>
          <textarea
            className="h-28 w-6/12 border border-black-700 rounded border-black"
            value={introduce}
            placeholder="예) 하루에 10키로 뛰기"
            required
            onChange={(e) => setIntroduce(e.target.value)}
          />
        </div>

        <div>
          <Link
            className="inline-flex items-center h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
            href="/"
          >
            이전
          </Link>
          <button
            className="inline-flex items-center h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
            onClick={handleClickEvent}
          >
            완료
          </button>
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
