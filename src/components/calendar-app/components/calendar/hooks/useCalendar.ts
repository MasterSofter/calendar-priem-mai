import {
  createDate,
  createMonth,
  getMonthesNames,
  getMonthNumberOfDays,
  getWeekDaysNames,
  IDate
} from "../../../../../utils/helpers/date";
import {useMemo, useState} from "react";

interface UseCalendarParams {
  locale?: string;
  selectedDate: Date;
  firstWeekDayNumber?: number;
}

const DAYS_IN_WEEK = 7;

export function useCalendar(
  {
    locale = "default",
    selectedDate: date,
    firstWeekDayNumber = 2
  }: UseCalendarParams) {
  const [selectedDay, setSelectedDay] = useState(createDate({date}));
  const [selectedMonth, setSelectedMonth] = useState(createMonth({
    date: new Date(selectedDay.year, selectedDay.monthIndex),
    locale
  }));
  const [selectedYear, setSelectedYear] = useState(selectedDay.year);
  const monthesNames = useMemo(() => getMonthesNames(locale), []);
  const weekDaysNames = useMemo(() => getWeekDaysNames(locale, firstWeekDayNumber), []);
  const days = useMemo(() => selectedMonth.monthDays(), [selectedMonth, selectedYear]);
  const calendarDays: Array<IDate> = useMemo(() => {
    const monthNumberOfDays = getMonthNumberOfDays(selectedMonth.monthIndex, selectedYear);
    const firstDay = days[0];
    const lastDay = days[monthNumberOfDays - 1];
    const shiftIndex = firstWeekDayNumber - 1;

    const result: Array<IDate> = new Array();
    //1. Заполнить дни прошлого месяца в начале первой недели
    {
      const prevMonthDays = createMonth({
        date: new Date(selectedYear, selectedMonth.monthIndex - 1),
        locale
      }).monthDays();

      const numberOfPrevDays =
        firstDay.dayNumberInWeek - 1 - shiftIndex < 0
          ? DAYS_IN_WEEK - (firstWeekDayNumber - firstDay.dayNumberInWeek)
          : firstDay.dayNumberInWeek - 1 - shiftIndex;

      for (let i = 0; i < numberOfPrevDays; i++) {
        const inverted = numberOfPrevDays - i;
        result.push(prevMonthDays[prevMonthDays.length - inverted]);
      }
    }

    //2. Заполнить дни текущего месяца
    result.push(...days);

    //3. Заполнить дни следующего месяца в конце последней недели
    {
      const nextMonthDays = createMonth({
        date: new Date(selectedYear, selectedMonth.monthIndex + 1),
        locale
      }).monthDays();

      const numberOfNextDays =
        DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex > 6
          ? DAYS_IN_WEEK - lastDay.dayNumberInWeek - (DAYS_IN_WEEK - shiftIndex)
          : DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex;

      for (let i = 0; i < numberOfNextDays; i++) {
        result.push(nextMonthDays[i]);
      }
    }

    return result;
  }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);
  const calendarWeeks: Array<Array<IDate>> = useMemo(() => {
    let result: Array<Array<IDate>> = new Array<Array<IDate>>();
    let countWeeks = Math.round(calendarDays.length / 7);

    for (let i = 0; i < countWeeks; i++) {
      result.push(calendarDays.slice((i * 7), (i * 7) + 7));
    }

    return result;
  }, [calendarDays]);
  return {
    state: {
      calendarWeeks,
      weekDaysNames,
      monthesNames,
      calendarDays
    },
    functions: {}
  };
}