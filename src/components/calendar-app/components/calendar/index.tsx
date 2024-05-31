import {useCalendar} from "./hooks/useCalendar";
import Day from "../calendar-day";
import React, {JSX} from "react";
import {IMonth} from "../../../../utils/helpers/date";
import {ICalendarDay} from "../../index";
import {IFilter} from "../../../filter";

interface CalendarProps {
  selectedDate : Date;
  setShowEvents:  React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDate :  React.Dispatch<React.SetStateAction<Date>>;
  className: string;
  locale: string;
  calendarData: Array<ICalendarDay> | undefined;
  filter: IFilter;
  month : IMonth;
}

export default function Calendar({setShowEvents, calendarData, filter, selectedDate, setSelectedDate, className, month, locale}: CalendarProps): JSX.Element {
  const firstWeekDayNumber = 2;
  const {functions, state} = useCalendar({month, locale, firstWeekDayNumber});

  let calendarWeeks: Array<JSX.Element> = [];
  state.calendarWeeks.map((week, weekNumber) => {
    let calendarDays: Array<JSX.Element> = [];
    week.map((day, index) => calendarDays.push(<Day key={`day-${index}-month-${day.monthIndex}`} setShowEvents={setShowEvents} calendarData={calendarData} filter={filter} selectedDate={selectedDate} setSelectedDate={setSelectedDate} date={day.date} isToday={(new Date().getDate() === day.date.getDate()) && (new Date().getMonth() === day.date.getMonth())} isActualDate={day.monthIndex == month.monthIndex}/>));
    calendarWeeks.push(
      <div className="col" key={weekNumber}>
        <div className="px-3 px-lg-5 row justify-content-between text-center">
          {calendarDays}
        </div>
        {
          (weekNumber + 1 !== state.calendarWeeks.length)
            ? <hr className="border-2 border-grey-light my-3"/>
            : <hr className="d-lg-none border-3 border-grey-light my-3"/>
        }
      </div>
    );
  });

  return (
    <div className={className}>
      <div className="d-none d-lg-flex flex-row row justify-content-between text-start mb-5 px-3 px-lg-5">
        {
          state.weekDaysNames.map((item, number) =>
            <div key={number} className="col text-muted fs-calendar-day-nav fw-normal">
              {item.dayShort}
            </div>
          )
        }
      </div>
      <div className="d-lg-none row d-flex text-start">
        <span className="col-4 text-muted fs-calendar-nav fw-normal text-capitalize ms-4">{month.monthName}</span>
      </div>
      <hr className="calendar-start-line border-2 border-grey-light my-3"/>
      <div className="row d-flex flex-column">
        {calendarWeeks}
      </div>
    </div>
  );
}