import MonthNavigation from "./components/month-navigation";
import Title from "./components/title";
import { Swiper, SwiperSlide } from 'swiper/react';
import {useState} from "react";
import $ from "jquery";
import {SwiperCalendar} from "./components/swiper-calendar";

export interface ICalendarDay {
  "month": number,
  "number": number,
  "timeStart": string | null,
  "timeEnd": string | null,
  "category": string | null,
  "header": string | null,
  "text": string | null,
  "location": string | null,
  "warning": boolean | null,
  "link": string | null,
  "degree": string | null
};

type CalendarProps = {
  locale : string
  calendarData: Array<ICalendarDay> | undefined,
  filter: object | undefined,
  className: string
}

function FilterStatus() {
  return (
    <>
      <span id="filter-active" className="btn btn-gradient btn-xs me-3 px-2 py-1"><i
        className="fa-regular fa-check"></i> Фильтр</span>
      <span id="filter-disable" className="d-none btn btn-xs me-3 px-2 py-1">Фильтр отключен</span>
      <span id="filter-count" className="lh-1">3&nbsp;события</span>
    </>
  );
}

export default function CalendarApp(props: CalendarProps): JSX.Element {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState<number>((new Date()).getMonth())

  return (
    <div className={props.className}>
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center mb-lg-6 pb-lg-4">
        <Title/>
        <MonthNavigation selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} locale={props.locale}/>
      </div>

        <SwiperCalendar selectedMonth={selectedMonth}/>

    </div>
  );
}