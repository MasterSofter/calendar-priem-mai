import YearAndMonthNavigation from "./components/month-navigation";
import Title from "./components/title";
import React, {useEffect, useRef, useState} from "react";
import {SwiperCalendar} from "./components/swiper-calendar";
import {OffcanvasCalendarEvent} from "./components/offcanvas-calendar-event";
import {IFilter} from "../filter";

export interface ICalendarDay {
  "month": number,
  "number": number,
  "timeStart": string | null;
  "timeEnd": string | null;
  "category": string | null;
  "header": string;
  "text": string | null;
  "location": string | null;
  "warning": boolean;
  "link": string | null;
  "degree": string | null;
  "primary": boolean;
};

interface CalendarProps {
  locale : string;
  calendarData: Array<ICalendarDay>;
  selectedYear : number;
  setSelectedYear : React.Dispatch<React.SetStateAction<number>>;
  selectedMonth : number;
  setSelectedMonth : React.Dispatch<React.SetStateAction<number>>;
  filter: IFilter;
  setFilter:  React.Dispatch<React.SetStateAction<IFilter>>;
  className: string;
}

export default function CalendarApp({selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, calendarData, filter, setFilter, className, locale}: CalendarProps): JSX.Element {
  const [showEvents, setShowEvents] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const swiperCalendarRef = useRef<any>(null);

  useEffect(() => { console.log("selectedMonth")}, [selectedMonth])

  return (
    <div className={className}>
      <div id="calendar-nav" className="position-relative bg-white zindex-3 d-flex flex-column mb-3 mb-lg-6 pb-lg-3 pt-4 px-lg-5">
        <div className="d-flex flex-row justify-content-between align-items-center px-4 px-lg-0 mb-6 mb-lg-3 mt-2">
          <h1 className="fs-calendar-title mb-0">Календарь абитуриента</h1>
          <div className="d-flex flex-row d-lg-none">
            <span className={`slide-year fs-calendar-nav-year hover-effect-up cursor-pointer border border-2 ${(new Date().getFullYear()) === selectedYear ? "border-primary text-primary" :  "border-black border-dark-mode-light text-dark"} px-3 me-2 rounded-pill`}>{new Date().getFullYear()}</span>
            <span className={`slide-year fs-calendar-nav-year hover-effect-up cursor-pointer border border-2 ${(new Date().getFullYear() + 1) === selectedYear ? "border-primary text-primary" :  "border-black border-dark-mode-light text-dark"} px-3 rounded-pill`}>{new Date().getFullYear()+1}</span>
          </div>
        </div>
        <YearAndMonthNavigation selectedYear={selectedYear} setSelectedYear={setSelectedYear} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} swiperCalendarRef={swiperCalendarRef} calendarData={calendarData} filter={filter} setFilter={setFilter} locale={locale}/>
      </div>
      <SwiperCalendar selectedYear={selectedYear} swiperCalendarRef={swiperCalendarRef} setShowEvents={setShowEvents} calendarData={calendarData} filter={filter} selectedDate={selectedDate} setSelectedDate={setSelectedDate} locale={locale} />
      <OffcanvasCalendarEvent filter={filter} selectedDate={selectedDate} calendarData={calendarData} show={showEvents} setShow={setShowEvents} locale={locale} />
    </div>
  );
}