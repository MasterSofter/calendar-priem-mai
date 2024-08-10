import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper css
import "swiper/css";
import "swiper/css/pagination";

import {createDate} from "../../../../utils/helpers/date";
import {Pagination} from "swiper/modules";
import {OffcanvasFilter} from "../../../filter/components/offcanvas-filter";
import {IFilter} from "../../../filter";
import {ICalendarDay} from "../../index";
import {useMonthNavigation} from "./hooks/useMonthNavigation";
import React from "react";

interface MonthNavigationProps {
  swiperCalendarRef :  React.MutableRefObject<any>;
  swiperMobileMonthsRef: React.MutableRefObject<any>;
  selectedMonth : number;
  setSelectedMonth : React.Dispatch<React.SetStateAction<number>>;
  locale: string;
  filter : IFilter;
  calendarData : Array<ICalendarDay>;
  setFilter:  React.Dispatch<React.SetStateAction<IFilter>>;
}

export default function MonthNavigation({selectedMonth, setSelectedMonth, swiperCalendarRef, swiperMobileMonthsRef, calendarData, filter, locale, setFilter}: MonthNavigationProps): JSX.Element {
  const {state, functions} = useMonthNavigation({selectedMonth, setSelectedMonth, swiperCalendarRef, locale})

  return (
    <>
      <div className="d-none d-lg-block calendar-month-nav w-calendar-month-nav cursor-grab">
        <Swiper
          onSwiper={(swiper: any) => {
            state.swiperMonthsRef.current = swiper;
          }}
          slidesPerView={7}
          loop={false}
          id="swiperMonths"
          className="disable-carousel pb-4"
          pagination={{
            dynamicBullets: false,
          }}
          modules={[Pagination]}
        >
          {
            state.actualMonths.map((item, num) =>
              //@ts-ignore
              <SwiperSlide key={num} className={`${item === state.selectedMonth ? "month-selected" : item >= state.currentDate.getMonth() ? "fw-light" : "text-muted fw-light"} pb-4 lh-1 fs-calendar-nav hover-effect-up slide-month`}>
                <span className="cursor-pointer">
                   {state.months[item].monthShort}
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
              state.swiperMonthsMobileRef.current = swiper;
              swiperMobileMonthsRef.current = swiper;
            }}
            slidesPerView="auto"
            spaceBetween={0}
            loop={false}
            direction="vertical"
            speed={1}
            className="disable-carousel swiper-mobile-months"
          >
            {
              state.months.map((item, num) =>
                <SwiperSlide key={num} className="d-inline">
                  {
                    <div className={`${item.monthIndex >= state.currentDate.getMonth() ? "" : "text-muted"} my-2 fs-calendar-nav cursor-pointer text-capitalize text-start`}>
                     <span>{item.month}</span>
                    </div>
                  }
                </SwiperSlide>
              )
            }
          </Swiper>
        </div>
        <div className="col-4 text-center fs-calendar-nav my-auto">{createDate({locale: locale}).dateMonth}</div>
        <div onClick={functions.handleOpen} className="col-4 text-end fs-calendar-nav my-auto">Фильтр</div>
      </div>
      <OffcanvasFilter selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} calendarData={calendarData} filter={filter} setFilter={setFilter} show={state.showFilter} setShow={functions.setShowFilter} locale={locale}/>
    </>
  );
}