import { getWeekNumber } from "./getWeekNumber";

interface CreateDateParams {
  locale?: string;
  date?: Date;
}

export interface IDate {
  date: Date,
  dayNumber : number,
  day: string,
  dayNumberInWeek : number,
  dayShort : string,
  year : number,
  yearShort : string,
  month : string,
  monthShort : string,
  monthNumber : number,
  monthIndex : number,
  timestamp : number,
  week : number
}

export function createDate (params?: CreateDateParams) : IDate {
  const locale = params?.locale ?? "default";

  const d = params?.date ?? new Date();
  const dayNumber : number = d.getDate();
  const day : string = d.toLocaleDateString(locale, { weekday: "long" });
  const dayNumberInWeek : number = d.getDay() + 1;
  const dayShort : string = d.toLocaleDateString(locale, { weekday: "short" });
  const year : number = d.getFullYear();
  const yearShort : string = d.toLocaleDateString(locale, { year: "2-digit" });
  const month : string = d.toLocaleDateString(locale, { month: "long" });
  const monthShort : string = d.toLocaleDateString(locale, { month: "short" }).replace('.','').slice(0,3);
  const monthNumber : number = d.getMonth() + 1;
  const monthIndex : number = d.getMonth();
  const timestamp : number = d.getTime();
  const week : number = getWeekNumber(d);

  return {
    date: d,
    dayNumber,
    day,
    dayNumberInWeek,
    dayShort,
    year,
    yearShort,
    month,
    monthShort,
    monthNumber,
    monthIndex,
    timestamp,
    week
  };
};
