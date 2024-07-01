import {useEffect, useRef, useState} from "react";
import {getMonthesNames} from "../../../../../utils/helpers/date";
import {Swiper} from "swiper/react";

interface UseMonthNavigationParams {
  locale?: string;
  swiperCalendarRef :  React.MutableRefObject<any>;
  swiperMobileMonthsRef: React.MutableRefObject<any>;
}

export function useMonthNavigation ({swiperCalendarRef, swiperMobileMonthsRef, locale = "default"} : UseMonthNavigationParams) {
  const currentDate = new Date();
  const swiperMonthsMobileRef = useRef<typeof Swiper>();
  const swiperMonthsRef = useRef<typeof Swiper>();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth());
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
    // При клике на месяц делаем его выделенным (черным) и листаем свайпер календаря
    document.querySelectorAll(".slide-month").forEach( (item) => {
      item.addEventListener("click", function (event) {
        document.querySelectorAll(".slide-month").forEach (el => {
          el.classList.add("text-muted");
          el.classList.remove("month-selected");
        })
        item.classList.remove("text-muted");
        item.classList.add("month-selected");

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

  useEffect(() => {
    if(swiperMonthsRef.current){
      (document.querySelector("#swiperMonths"))?.querySelector(".swiper-wrapper")
        ?.classList.add("justify-content-end");
    }
  }, []);


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