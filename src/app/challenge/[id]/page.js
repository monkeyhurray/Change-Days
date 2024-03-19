import React from "react";

const page = (props) => {
  const id = props.params.id;
  return (
    <>
      <div>
        <div className="border-b-2 border-b-gray-300 py-3">
          <p>
            <span className="mr-5 text-2xl">1만보 걷기 챌린지</span>
            <span className="mr-3 text-white bg-gray-600 p-2 rounded-xl">
              주3일
            </span>
            <span className="mr-3 text-white bg-gray-600 p-2 rounded-xl">
              2주 동안
            </span>
          </p>
          <span className="">작성자 : ㅎㅇ</span>
        </div>
        <div>
          <p className="py-5 text-xl">챌린지 소개</p>
          <div className="h-36">즐겁게 걸어보자</div>
        </div>
        <div>
          <p className="py-5 text-xl">인증 방법</p>
          <div className="h-36">
            오늘 날짜와 걸음 수가 적힌 만보기 캡처 화면 다운로드
          </div>
        </div>
        <div>
          <p className="py-5 ">
            참가자 수:<span>1234명</span>
          </p>
        </div>
      </div>
      <div className="text-xl text-center ">
        <span className="mr-3 text-white bg-black px-5 py-3 rounded-xl cursor-pointer">
          참가하기
        </span>
      </div>
    </>
  );
};

export default page;
