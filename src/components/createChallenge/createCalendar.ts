type FrequencyIds = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type Days = {
  id: number;
  name: string;
};

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

const days: Days[] = [
  { id: 1, name: "월" },
  { id: 2, name: "화" },
  { id: 3, name: "수" },
  { id: 4, name: "목" },
  { id: 5, name: "금" },
  { id: 6, name: "토" },
  { id: 7, name: "일" },
];

const frequencyArr: FrequencyChallenge[] = [
  {
    id: 1,
    certificationDays: "월, 화, 수, 목, 금, 토, 일 입니다.",
    value: "매일",
    days: 7,
  },
  {
    id: 2,
    certificationDays: "월, 화, 수, 목, 금 입니다.",
    value: "평일 매일",
    days: 7,
  },
  { id: 3, certificationDays: "토, 일 입니다.", value: "주말 매일", days: 2 },
  {
    id: 4,
    certificationDays: "월, 화, 수, 목, 금, 토, 일 중에 1일 인증해 주세요",
    value: "주 1일",
    days: 1,
  },
  {
    id: 5,
    certificationDays: "월, 화, 수, 목, 금, 토, 일 중에 2일 인증해 주세요",
    value: "주 2일",
    days: 2,
  },
  {
    id: 6,
    certificationDays: "월, 화, 수, 목, 금, 토, 일 중에 3일 인증해 주세요",
    value: "주 3일",
    days: 3,
  },
  {
    id: 7,
    certificationDays: "월, 화, 수, 목, 금, 토, 일 중에 4일 인증해 주세요",
    value: "주 4일",
    days: 4,
  },
];

const periodArr: PeriodChallenge[] = [
  { id: 1, value: "1주 동안" },
  { id: 2, value: "2주 동안" },
  { id: 3, value: "3주 동안" },
  { id: 4, value: "4주 동안" },
  { id: 5, value: "5주 동안" },
  { id: 6, value: "6주 동안" },
  { id: 7, value: "7주 동안" },
];

let date = new Date().toLocaleDateString();

const useOneWeek = () => {
  let today = Date.parse(date);
  let result = [];
  result.push(date);
  console.log(today);
  for (let i = 0; i < 6; i++) {
    today += 86400000;
    result.push(new Date(today).toLocaleDateString());
  }

  return result;
};

export { frequencyArr, periodArr, useOneWeek, days };
