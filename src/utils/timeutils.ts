import { DateTime } from "luxon";

type TimeUtilFormat = {
  formatStartDate: string;
  formatEndDate: string;
  durationMessage: string;
};

export const timeUtil = (startIso: string, endIso: string): TimeUtilFormat => {
  const startDate = DateTime.fromISO(startIso);
  const endDate = DateTime.fromISO(endIso);

  const formatStartDate = startDate.toFormat('M월 d일');
  const formatEndDate = endDate.toFormat('M월 d일'); 

  const diff = endDate.diff(startDate, ['days']);
  const diffDays = diff.days;

  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;

  let durationMessage = `${diffDays}일`;

  if (weeks > 0) {
    durationMessage = `${weeks}주`;
    if (days > 0) {
      durationMessage += ` ${days}일`;
    }
  }

  return { formatStartDate, formatEndDate, durationMessage }; 
};