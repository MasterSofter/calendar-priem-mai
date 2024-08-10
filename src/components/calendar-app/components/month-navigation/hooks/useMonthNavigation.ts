import React, {useEffect, useRef, useState} from "react";
import {getMonthesNames} from "../../../../../utils/helpers/date";
import {Swiper} from "swiper/react";

interface UseMonthNavigationParams {
  locale?: string;
  selectedMonth : number;
  setSelectedMonth : React.Dispatch<React.SetStateAction<number>>;
  swiperCalendarRef :  React.MutableRefObject<any>;
}

export function useMonthNavigation ({selectedMonth, setSelectedMonth, swiperCalendarRef, locale = "default"} : UseMonthNavigationParams) {
  const currentDate = new Date();
  const swiperMonthsMobileRef = useRef<typeof Swiper>();
  const swiperMonthsRef = useRef<typeof Swiper>();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const months = getMonthesNames(locale);

  const handleOpen = () => setShowFilter(true);

  const actualMonths = [];
  for (let i = 0; i < 12; i++) {
    actualMonths.push(i);
  }

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
        let monthIndex: number | undefined = months.find(el => el.monthShort === item.textContent)?.monthIndex;
        if (typeof (monthIndex) === "number")
        {
          swiperCalendarRef.current.slideTo(monthIndex);
          setSelectedMonth(monthIndex);
        }
      })});
  },[swiperCalendarRef])

  useEffect(() => {
    //@ts-ignore
    swiperMonthsMobileRef.current.allowTouchMove = false;
    //@ts-ignore
    swiperMonthsMobileRef.current.slideTo(selectedMonth);
    document.querySelector(`#mobile-month-${selectedMonth}`)?.scrollIntoView();

    const calendarMobile = document.querySelector("#calendar-mobile");
    if(calendarMobile) {
      calendarMobile.addEventListener("scroll", () => {
        for(let i = 0; i < 12; i++) {
          const month = document.querySelector(`#mobile-month-${i}`);
          if(month) {
            if(((month.getBoundingClientRect().top - calendarMobile.getBoundingClientRect().top) <= 10)){
              //@ts-ignore
              swiperMonthsMobileRef.current.slideTo(i);
              setSelectedMonth(i);
            }
          }
        }
      });
    }
  },[swiperMonthsMobileRef]);

  return {
    state: {
      currentDate,
      months,
      selectedMonth,
      actualMonths,
      swiperMonthsMobileRef,
      swiperMonthsRef,
      showFilter
    },
    functions: {
      handleOpen,
      setShowFilter
    }
  };
}