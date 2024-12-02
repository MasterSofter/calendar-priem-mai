import {createDate, IDate} from "./createDate";
import { getMonthNumberOfDays } from './getMonthNumberOfDays';

interface CreateMonthParams {
  date: Date;
  locale?: string;
}

export interface IMonth {
  monthName : string,
  monthIndex : number,
  monthNumber : number,
  year : number,
  monthDays : () => Array<IDate>
}

export function createMonth (params: CreateMonthParams) : IMonth {
  const date = params.date;
  const locale = params?.locale ?? "default";

  const d = createDate({ date, locale });
  const { month: monthName, year, monthNumber, monthIndex } = d;

  const day = (dayNumber: number) : IDate =>
    createDate({ date: new Date(year, monthIndex, dayNumber), locale });

  const monthDays = () : Array<IDate> => {
    const days = [];

    for (let i = 0; i <= getMonthNumberOfDays(monthIndex, year) - 1; i += 1) {
      days[i] = day(i + 1);
    }

    return days;
  };

  return {
    monthName,
    monthIndex,
    monthNumber,
    year,
    monthDays
  };
};
