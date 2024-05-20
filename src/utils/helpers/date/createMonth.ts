import { createDate } from './createDate';
import { getMonthNumberOfDays } from './getMonthNumberOfDays';

interface CreateMonthParams {
  date?: Date;
  locale?: string;
}

export function createMonth (params?: CreateMonthParams) {
  const date = params?.date ?? new Date();
  const locale = params?.locale ?? "default";

  const d = createDate({ date, locale });
  const { month: monthName, year, monthNumber, monthIndex } = d;

  const day = (dayNumber: number) =>
    createDate({ date: new Date(year, monthIndex, dayNumber), locale });

  const monthDays = () => {
    const days = [];

    for (let i = 0; i <= getMonthNumberOfDays(monthIndex, year) - 1; i += 1) {
      days[i] = day(i + 1);
    }

    return days;
  };

  return {
    day,
    monthName,
    monthIndex,
    monthNumber,
    year,
    monthDays
  };
};
