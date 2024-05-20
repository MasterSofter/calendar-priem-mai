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
      <div className="d-flex flex-row justify-content-between align-items-center mb-6 pb-3">
        <Title/>
        <MonthNavigation/>
      </div>
      {
        /*

         <div className="mb-5">
        <div className="d-none d-lg-flex flex-row justify-content-end align-items-center">
          <FilterStatus/>
        </div>
        <div className="d-lg-none flex-row justify-content-start align-items-center">
          <FilterStatus/>
        </div>
      </div>

        */
      }


      <Calendar selectedDate={selectedDate} selectDate={(date) => setSelectedDay(date)} locale="ru"/>

    </div>
  );
}