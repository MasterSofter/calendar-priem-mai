import React, {useEffect, useRef, useState} from "react";
import {getMonthesNames} from "../../../../../utils/helpers/date";
import {Swiper} from "swiper/react";

interface UseMonthNavigationParams {
  locale?: string;
  selectedMonth : number;
  setSelectedMonth : React.Dispatch<React.SetStateAction<number>>;
  swiperCalendarRef :  React.MutableRefObject<any>;
  swiperMobileMonthsRef: React.MutableRefObject<any>;
}

export function useMonthNavigation ({selectedMonth, setSelectedMonth, swiperCalendarRef, swiperMobileMonthsRef, locale = "default"} : UseMonthNavigationParams) {
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

  useEffect(() => {
    if (swiperMonthsRef.current)
      //@ts-ignore
      swiperMonthsRef.current.slideTo(selectedMonth - 2 >= 0 ? selectedMonth - 2 : selectedMonth - 1 >= 0 ? selectedMonth - 1 : selectedMonth);
  }, [selectedMonth]);

  useEffect(() => {
    // При клике на месяц листаем свайпер календаря
    document.querySelectorAll(".slide-month").forEach( (item) => {
      item.addEventListener("click", function (event) {
        let monthIndex: number | undefined = months.find(el => el.monthShort === item.textContent)?.monthIndex;
        if (typeof (monthIndex) === "number")
        {
          swiperCalendarRef.current.slideTo(monthIndex);
          setSelectedMonth(monthIndex);
        }
      })});

    if (swiperMonthsMobileRef.current) {
      //@ts-ignore
      swiperMonthsMobileRef.current.on("slideChangeTransitionEnd", function () {
        //@ts-ignore
        swiperCalendarRef.current.slideTo(swiperMonthsMobileRef.current?.activeIndex);
        //@ts-ignore
        setSelectedMonth(swiperMonthsMobileRef.current?.activeIndex);
      });
    }
  });

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