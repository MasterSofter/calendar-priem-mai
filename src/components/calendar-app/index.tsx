import MonthNavigation from "./components/month-navigation";
import Title from "./components/title";
import React, {useRef, useState} from "react";
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

type CalendarProps = {
  locale : string
  calendarData: Array<ICalendarDay>,
  selectedMonth : number,
  setSelectedMonth : React.Dispatch<React.SetStateAction<number>>,
  filter: IFilter,
  setFilter:  React.Dispatch<React.SetStateAction<IFilter>>;
  className: string
}

export default function CalendarApp({selectedMonth, setSelectedMonth, calendarData, filter, setFilter, className, locale}: CalendarProps): JSX.Element {
  const [showEvents, setShowEvents] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const swiperCalendarRef = useRef<any>(null);
  const swiperMobileMonthsRef = useRef<any>(null);

  return (
    <div className={className}>
      <div id="calendar-nav" className="position-relative zindex-3 d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center mb-lg-6 pb-lg-6 pt-4 pt-lg-6 mt-lg-2 px-lg-5">
        <Title/>
        <MonthNavigation selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} swiperCalendarRef={swiperCalendarRef} swiperMobileMonthsRef={swiperMobileMonthsRef} calendarData={calendarData} filter={filter} setFilter={setFilter} locale={locale}/>
      </div>
      <SwiperCalendar swiperCalendarRef={swiperCalendarRef} swiperMobileMonthsRef={swiperMobileMonthsRef} setShowEvents={setShowEvents} calendarData={calendarData} filter={filter} selectedDate={selectedDate} setSelectedDate={setSelectedDate} locale={locale} />
      <OffcanvasCalendarEvent filter={filter} selectedDate={selectedDate} calendarData={calendarData} show={showEvents} setShow={setShowEvents} locale={locale} />
    </div>
  );
}