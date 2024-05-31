import React, {useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper css
import "swiper/css";
import "swiper/css/pagination";

import {createDate, getMonthesNames} from "../../../../utils/helpers/date";
import {Pagination} from "swiper/modules";
import {OffcanvasFilter} from "../../../filter/components/offcanvas-filter";
import {IFilter} from "../../../filter";
import {ICalendarDay} from "../../index";

interface MonthNavigationProps {
  locale: string;
  selectedMonth: number;
  filter : IFilter;
  calendarData : Array<ICalendarDay>;
  setFilter:  React.Dispatch<React.SetStateAction<IFilter>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
}

export default function MonthNavigation({calendarData, filter, locale, selectedMonth, setSelectedMonth, setFilter}: MonthNavigationProps): JSX.Element {
  const swiperMonthsMobileRef = useRef();
  const swiperMonthsRef = useRef();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const months = getMonthesNames(locale);

  const handleOpen = () => setShowFilter(true);

  let actualMonths = [];
  for (let i = 0; i < 12; i++) {
    actualMonths.push(i);
  }

  // При клике на месяц делаем его выделенным (черным) и обновляем selectedMonth
  document.querySelectorAll(".slide-month").forEach( (item) => {
  item.addEventListener("click", function (event) {
      document.querySelectorAll(".slide-month").forEach (el => {
        el.classList.add("text-muted");
        el.classList.remove("month-selected");
      })
      item.classList.remove("text-muted");
      item.classList.add("month-selected");

      let monthIndex: number | undefined = months.find(el => el.monthShort == item.textContent)?.monthIndex;
      if (typeof (monthIndex) === "number")
        setSelectedMonth(monthIndex);
  })});

  // При завершении пролистывания swiperMonthsMobile обновляем selectedMonth
  useEffect(() => {
    if (swiperMonthsMobileRef.current) {
      //@ts-ignore
      swiperMonthsMobileRef.current.on("slideChangeTransitionEnd", function () {
        //@ts-ignore
        setSelectedMonth(swiperMonthsMobileRef.current?.activeIndex);
      });
    }
  }, []);

  // При обновлении selectedMonth пролистываем swiperMonths
  useEffect(() => {
    if (swiperMonthsRef.current)
      //@ts-ignore
      swiperMonthsRef.current.slideTo(selectedMonth - 2 >= 0 ? selectedMonth - 2 : selectedMonth - 1 >= 0 ? selectedMonth - 1 : selectedMonth);

    if (swiperMonthsMobileRef.current)
      //@ts-ignore
      swiperMonthsMobileRef.current.slideTo(selectedMonth);
  }, [selectedMonth]);

  return (
    <>
      <div className="d-none d-lg-block calendar-month-nav w-calendar-month-nav cursor-grab">
        <Swiper
          onSwiper={(swiper: any) => {
            swiperMonthsRef.current = swiper;
          }}
          slidesPerView={7}
          slidesPerGroup={4}
          loop={false}
          className="disable-carousel pb-4"
          pagination={{
            dynamicBullets: false,
          }}
          modules={[Pagination]}
        >
          {
            actualMonths.map((item, num) =>
              <SwiperSlide key={num} className={`${selectedMonth === item ? "month-selected" : "text-muted fw-light"} pb-4 lh-1 fs-calendar-nav hover-effect-up slide-month`}>
                <span className="cursor-pointer">
                   {months[item].monthShort}
                </span>
              </SwiperSlide>
            )
          }
        </Swiper>
      </div>
      <div className="bg-body d-flex d-lg-none flex-row justify-content-between px-4 w-100" >
        <div className="col-4 text-start" style={{maxHeight: "4rem"}}>
          <Swiper
            onSwiper={(swiper: any) => {
              swiperMonthsMobileRef.current = swiper;
            }}
            slidesPerView={1}
            spaceBetween={10}
            loop={false}
            direction="vertical"
            speed={1}
            className="disable-carousel swiper-mobile-months"
          >
            {
              months.map((item, num) =>
                <SwiperSlide key={num} className="slide-month justify-content-start">
                  <span className="fs-calendar-nav cursor-pointer text-capitalize text-start">
                     {item.month}
                  </span>
                </SwiperSlide>
              )
            }
          </Swiper>
        </div>
        <div className="col-4 text-center fs-calendar-nav my-auto">{createDate({locale: locale}).dateMonth}</div>
        <div onClick={handleOpen} className="col-4 text-end fs-calendar-nav my-auto">Фильтр</div>
      </div>
      <OffcanvasFilter calendarData={calendarData} filter={filter} setFilter={setFilter} show={showFilter} setShow={setShowFilter} locale={locale}/>
    </>
  );
}