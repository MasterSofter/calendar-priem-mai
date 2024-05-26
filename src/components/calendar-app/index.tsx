import MonthNavigation from "./components/month-navigation";
import Title from "./components/title";
import {useState} from "react";
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

export default function CalendarApp(props: CalendarProps): JSX.Element {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState<number>((new Date()).getMonth())

  return (
    <div className={props.className}>
      <div className="position-relative zindex-3 calendar-nav d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center mb-lg-6 pb-lg-6 pt-lg-4">
        <Title/>
        <MonthNavigation selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} locale={props.locale}/>
      </div>
      <SwiperCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}  selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} locale={props.locale} />
    </div>
  );
}