import MonthNavigation from "./components/month-navigation";
import Title from "./components/title";
import {useState} from "react";
import {SwiperCalendar} from "./components/swiper-calendar";
import {OffcanvasCalendarEvent} from "./components/offcanvas-calendar-event";
import {IFilter} from "../filter";

export interface ICalendarDay {
  "month": number,
  "number": number,
  "timeStart": string | null;
  "timeEnd": string | null;
  "category": string | null;
  "header": string | null;
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
  filter: IFilter,
  setFilter:  React.Dispatch<React.SetStateAction<IFilter>>;
  className: string
}

export default function CalendarApp({calendarData, filter, setFilter, className, locale}: CalendarProps): JSX.Element {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState<number>((new Date()).getMonth());
  const [showEvents, setShowEvents] = useState<boolean>(false);

  return (
    <div className={className}>
      <div className="position-relative zindex-3 calendar-nav d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center mb-lg-6 pb-lg-6 pt-lg-4">
        <Title/>
        <MonthNavigation calendarData={calendarData} filter={filter} setFilter={setFilter} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} locale={locale}/>
      </div>
      <SwiperCalendar setShowEvents={setShowEvents} calendarData={calendarData} filter={filter} selectedDate={selectedDate} setSelectedDate={setSelectedDate}  selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} locale={locale} />
      <OffcanvasCalendarEvent filter={filter} selectedDate={selectedDate} calendarData={calendarData} show={showEvents} setShow={setShowEvents} locale={locale} />
    </div>
  );
}