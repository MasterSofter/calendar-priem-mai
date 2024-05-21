import MonthNavigation from "./components/month-navigation";
import Title from "./components/title";
import Calendar from "./components/calendar";
import {useState} from "react";

export type CalendarDay = {
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
  calendarData: Array<CalendarDay> | undefined,
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
  const [selectedDate, setSelectedDay] = useState(new Date());

  return (
    <div className={props.className}>
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center mb-lg-6 pb-lg-4">
        <Title/>
        <MonthNavigation/>
      </div>
      <Calendar selectedDate={selectedDate} selectDate={(date) => setSelectedDay(date)} locale="ru"/>

      <div className="d-lg-none">
        <MonthNavigation/>
        <Calendar selectedDate={selectedDate} selectDate={(date) => setSelectedDay(date)} locale="ru"/>
      </div>
    </div>
  );
}