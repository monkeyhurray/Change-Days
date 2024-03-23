"use client";

import { DateTime } from "luxon";
import { MouseEvent, useState, useEffect } from "react";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/supabase/supabase";
import { periodArr } from "@/components/createChallenge/createCalendar";
import camera from "../../../public/camera.jpg";
import { useRouter } from "next/navigation";

type FrequencyIds = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type PeriodChallenge = {
  id: FrequencyIds;
  value: string;
  number: number;
};

const CreateChallengePage = () => {
  const dateTime = DateTime.now();
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("");
  const [periodNum, setPeriodNum] = useState(0);
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [monthWeek, setMonthWeek] = useState(9);
  const [introduce, setIntroduce] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [uploadImg, setUploadImg] = useState<File | null>(null);
  const [createdBy, setCreatedBy] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getUSerSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          return Promise.reject(error);
        }

        if (data.session === null) return;
        const created_by_id = data.session.user.id;

        setCreatedBy(created_by_id);
        return data;
      } catch (error) {
        alert(error);
      }
    };
    getUSerSession();
  }, []);

  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const arr = Array.from({ length: 7 }, (v, i) => i++);

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

    const plusDt = dateTime.plus({ days: idx + periodNum });
    const todayDt = dateTime.plus({ days: idx });

    let todayDtcalculateMonth;
    let todayDtcalculateDay;

    let plusDtCalculateMonth;
    let plusDtCalculateDay;

    if (plusDt.month < 10) {
      plusDtCalculateMonth = "0" + plusDt.month;
    } else {
      plusDtCalculateMonth = plusDt.month;
    }

    if (plusDt.day < 10) {
      plusDtCalculateDay = "0" + plusDt.day;
    } else {
      plusDtCalculateDay = plusDt.day;
    }

    if (todayDt.month < 10) {
      todayDtcalculateMonth = "0" + todayDt.month;
    } else {
      todayDtcalculateMonth = todayDt.month;
    }

    if (todayDt.day < 10) {
      todayDtcalculateDay = "0" + todayDt.day;
    } else {
      todayDtcalculateDay = todayDt.day;
    }

    setStartDate(
      `${todayDt.year}-${todayDtcalculateMonth}-${todayDtcalculateDay}`
    );
    setEndDate(`${plusDt.year}-${plusDtCalculateMonth}-${plusDtCalculateDay}`);
  };

  const readImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const imageFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (!event || !event.target) return;
      if (typeof event.target.result !== "string" || !fileRef.current) return;

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

  const uploadImgStorage = async (file: File) => {
    const fileExt = file?.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    try {
      const { error } = await supabase.storage
        .from("images")
        .upload(`challenge/${fileName}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw new Error("이미지 업로드 실패", error);
      }

      return `${process.env
        .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/images/challenge/${fileName}`;
    } catch (error) {
      console.log(error);
    }
  };

  const insertThumbnailUrlToDatabase = async (thumbnailUrl: string) => {
    const { data: storageUrl, error } = await supabase
      .from("challenges")
      .insert([
        {
          public: open,
          thumbnail: thumbnailUrl,
          etc: introduce,
          created_by: createdBy,
          start_date: startDate,
          end_date: endDate,
          name: title,
        },
      ]);

    if (error) {
      throw new Error(`데이터베이스 삽입 실패:, ${error.message}`);
    }

    return storageUrl;
  };

  const handleSubmit = async () => {
    if (!uploadImg) return;

    try {
      const uploadedImageUrl = await uploadImgStorage(uploadImg);

      // TODO - img 업로드 실패 시 처리
      if (!uploadedImageUrl) return;
      await insertThumbnailUrlToDatabase(uploadedImageUrl);
    } catch (error) {
      alert(error);
    }
  };

  const handleClickEvent = async (e: MouseEvent<HTMLButtonElement>) => {
    if (
      title.trim() !== "" &&
      introduce.trim() !== "" &&
      endDate.trim() !== "" &&
      uploadImg !== null
    ) {
      alert("등록 되었습니다.");
    } else {
      alert("누락된 값을 확인해 주세요!");
      return;
    }

    e.preventDefault();
    await handleSubmit();
    router.push("/");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className=" mt-8">
      {" "}
      <div className=" ml-96">
        <div className="flex mb-5">
          <h1>제목:&nbsp;</h1>
          <input
            className="border border-black-700 rounded border-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex">
          <button
            onClick={() => setOpen(true)}
            className={
              open ? `mr-2 ${ACTIVE_BUTTON}` : `mr-2 ${INACTIVE_BUTTON}`
            }
          >
            공개
          </button>
          <button
            onClick={() => setOpen(false)}
            className={open ? `${INACTIVE_BUTTON}` : `${ACTIVE_BUTTON}`}
          >
            비공개
          </button>
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
            const nowMonthWeek = `${dateTime.month}월 ${dateTime.day + num}일`;
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
          {endDate !== "" && monthWeek !== 9 ? `${startDate} ~ ${endDate}` : ""}
        </h1>
        <div className="flex">
          <input
            id="upload"
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={(e) => readImage(e)}
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
            className="p-4 h-28 w-6/12 border border-black-700 rounded border-black"
            value={introduce}
            placeholder="예) 하루에 10키로 뛰기"
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
    </form>
  );
};

const ACTIVE_BUTTON =
  "mt-1 flex text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700";

const INACTIVE_BUTTON =
  "mt-1 w-20 h-7 justify-center flex border border-black-700 rounded border-black";

export default CreateChallengePage;
