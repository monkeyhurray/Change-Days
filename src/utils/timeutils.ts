import { DateTime } from "luxon";

type TimeUtilFormat = {
  formatStartDate: string;
  formatEndDate: string;
  durationMessage: string;
  formattedCreatedAt: string; 
};

export const timeUtil = (
  startIso: string,
  endIso: string,
  createdAtIso: string 
): TimeUtilFormat => {
  const startDate = DateTime.fromISO(startIso);
  const endDate = DateTime.fromISO(endIso);
  const createdAtDate = DateTime.fromISO(createdAtIso); 

  const formatStartDate = startDate.toFormat("M월 d일");
  const formatEndDate = endDate.toFormat("M월 d일");

  const diff = endDate.diff(startDate, ["days"]);
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

  const formattedCreatedAt = createdAtDate.setLocale("ko").toLocaleString({
    weekday: "short",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return {
    formatStartDate,
    formatEndDate,
    durationMessage,
    formattedCreatedAt,
  }; 
};
