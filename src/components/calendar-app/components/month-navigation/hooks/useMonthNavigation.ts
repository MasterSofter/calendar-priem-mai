import React, {useEffect, useRef, useState} from "react";
import {getMonthesNames} from "../../../../../utils/helpers/date";
import {Swiper} from "swiper/react";

interface UseMonthNavigationParams {
  locale?: string;
  selectedYear : number;
  setSelectedYear : React.Dispatch<React.SetStateAction<number>>;
  selectedMonth : number;
  setSelectedMonth : React.Dispatch<React.SetStateAction<number>>;
  swiperCalendarRef :  React.MutableRefObject<any>;
}

export function useMonthNavigation ({selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, swiperCalendarRef, locale = "default"} : UseMonthNavigationParams) {
  const currentDate = new Date();
  const swiperMonthsRef = useRef<typeof Swiper>();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const months = getMonthesNames(locale);

  const handleOpen = () => setShowFilter(true);

  const monthIndexes = [];
  for (let i = 0; i < 12; i++) {
    monthIndexes.push(i);
  }

  useEffect(() => {
    document.querySelectorAll(".slide-year").forEach( (item) => {
      item.addEventListener("click", function (event) {
        setSelectedYear(Number(item.textContent));
      })});
  },[]);

  useEffect(() => {
    const calendarMobile = document.querySelector("#calendar-mobile");
    if(calendarMobile) {
      calendarMobile.addEventListener("scroll", () => {
        for(let i = 0; i < 12; i++) {
          const month = document.querySelector(`#mobile-month-${i}`);
          if(month) {
            if(((month.getBoundingClientRect().top - calendarMobile.getBoundingClientRect().top) <= 10)){
              //@ts-ignore
              setSelectedMonth(i);
            }
          }
        }
      });
    }
  },[]);



  // При изменении выбранного месяца листаем список месяцев на десктопе
  useEffect(() => {
    if (swiperMonthsRef.current)
      //@ts-ignore
      swiperMonthsRef.current.slideTo(selectedMonth - 2 >= 0 ? selectedMonth - 2 : selectedMonth - 1 >= 0 ? selectedMonth - 1 : selectedMonth);

    }, [selectedMonth]);

  // При клике на месяц листаем свайпер календаря на десктопе
  useEffect(() => {
    document.querySelectorAll(".slide-month").forEach( (item) => {
      item.addEventListener("click", function (event) {
        let monthIndex: number | undefined = months.find(el => el.month === item.textContent)?.monthIndex;
        if (typeof (monthIndex) === "number")
        {
          swiperCalendarRef.current.slideTo(monthIndex);
          setSelectedMonth(monthIndex);
        }
      })});
  },[swiperCalendarRef])

  return {
    state: {
      currentDate,
      months,
      selectedYear,
      selectedMonth,
      monthIndexes,
      swiperMonthsRef,
      showFilter
    },
    functions: {
      handleOpen,
      setShowFilter
    }
  };
}