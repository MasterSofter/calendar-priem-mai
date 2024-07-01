import {createDate, IDate} from "./createDate";
import {createMonth, IMonth} from "./createMonth";

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

  const yearMonthes = () : Array<IMonth> => {
    const monthes : Array<IMonth> = new Array<IMonth>();

    for (let i = 0; i <= monthCount - 1; i++) {
      monthes[i] = createMonth({locale: locale, date : new Date(year, i)});
    }

    return monthes;
  };

  const actualYearMonths = () : Array<IMonth> => {
    const monthes : Array<IMonth> = new Array<IMonth>();

    for (let i = today.monthNumber; i <= monthCount - 1; i++) {
      monthes[i] = createMonth({locale: locale, date : new Date(year, i)});
    }

    return monthes;
  }

  return {
    yearMonthes,
    actualYearMonths,
    month,
    year
  };
};
