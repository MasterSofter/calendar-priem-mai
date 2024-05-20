import { createDate } from './createDate';
import { createMonth } from './createMonth';

interface CreateYearParams {
  year?: number;
  locale?: string;
  monthNumber?: number;
}

export function createYear (params?: CreateYearParams) {
  const locale = params?.locale ?? 'default';

  const monthCount = 12;
  const today = createDate();

  const year = params?.year ?? today.year;
  const monthNumber = params?.monthNumber ?? today.monthNumber;

  const month = createMonth({ date: new Date(year, monthNumber - 1), locale });

  const getMonthDays = (monthIndex: number) =>
    createMonth({ date: new Date(year, monthIndex), locale }).monthDays();

  const yearMonthes = () => {
    const monthes = [];

    for (let i = 0; i <= monthCount - 1; i += 1) {
      monthes[i] = getMonthDays(i);
    }

    return monthes;
  };

  return {
    yearMonthes,
    month,
    year
  };
};
