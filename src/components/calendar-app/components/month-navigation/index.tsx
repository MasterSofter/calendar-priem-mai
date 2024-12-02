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

interface YearAndMonthNavigationProps {
  swiperCalendarRef :  React.MutableRefObject<any>;
  selectedYear : number;
  setSelectedYear : React.Dispatch<React.SetStateAction<number>>;
  selectedMonth : number;
  setSelectedMonth : React.Dispatch<React.SetStateAction<number>>;
  locale: string;
  filter : IFilter;
  calendarData : Array<ICalendarDay>;
  setFilter:  React.Dispatch<React.SetStateAction<IFilter>>;
}

export default function YearAndMonthNavigation({selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, swiperCalendarRef, calendarData, filter, locale, setFilter}: YearAndMonthNavigationProps): JSX.Element {
  const {state, functions} = useMonthNavigation({selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, swiperCalendarRef, locale})

  return (
    <>
      <div className="d-none d-lg-flex flex-row justify-content-between calendar-month-nav">
        <div className="d-flex flex-column">
          <span className="text-muted">месяц</span>
          <div className="d-flex flex-row justify-content-start w-100 cursor-grab">
            <Swiper
              onSwiper={(swiper: any) => {
                state.swiperMonthsRef.current = swiper;
              }}
              slidesPerView={"auto"}
              loop={false}
              id="swiperMonths"
              className="disable-carousel pb-4 pt-1 w-calendar-month-nav ms-0"
              pagination={{
                dynamicBullets: false,
              }}
              modules={[Pagination]}
            >
              {
                state.monthIndexes.map((item, num) =>
                  //@ts-ignore
                  <SwiperSlide onClick={() => {console.log("Hello")}} key={num} className={`${item === state.selectedMonth ? "month-selected" : (item >= state.currentDate.getMonth() || state.selectedYear > state.currentDate.getFullYear()) ? "text-dark" : "text-muted"} pb-4 pe-2 lh-1 fs-calendar-nav hover-effect-up slide-month w-auto`}>
                    <span className={`cursor-pointer border border-2 ${item === state.selectedMonth ? "border-primary" : (item >= state.currentDate.getMonth() || state.selectedYear > state.currentDate.getFullYear()) ? "border-black border-dark-mode-light" : ""} px-2 py-1 rounded-pill`}>
                       {state.months[item].month}
                    </span>
                  </SwiperSlide>
                )
              }
            </Swiper>
          </div>
        </div>
        <div className="d-flex flex-column">
          <span className="text-muted mb-1">год</span>
          <div className="d-flex flex-row">
            <span className={`slide-year fs-calendar-nav-year hover-effect-up cursor-pointer border border-2 ${(new Date().getFullYear()) === state.selectedYear ? "border-primary text-primary" :  "border-black border-dark-mode-light text-dark"} px-5 me-2 rounded-pill`}>{new Date().getFullYear()}</span>
            <span className={`slide-year fs-calendar-nav-year hover-effect-up cursor-pointer border border-2 ${(new Date().getFullYear() + 1) === state.selectedYear ? "border-primary text-primary" :  "border-black border-dark-mode-light text-dark"} px-5 rounded-pill`}>{new Date().getFullYear()+1}</span>
          </div>
        </div>
      </div>
      <div className="d-flex d-lg-none flex-row justify-content-between px-4 w-100" >
        <div className="col-4 text-start fs-calendar-nav my-auto text-capitalize">{state.months[selectedMonth].month}</div>
        <div className="col-4 text-center fs-calendar-nav my-auto">{createDate({locale: locale}).dateMonth}</div>
        <div onClick={functions.handleOpen} className="col-4 text-end fs-calendar-nav my-auto">Фильтр</div>
      </div>
      <OffcanvasFilter selectedYear={selectedYear} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} calendarData={calendarData} filter={filter} setFilter={setFilter} show={state.showFilter} setShow={functions.setShowFilter} locale={locale}/>
    </>
  );
}