import {useCalendar} from "./hooks/useCalendar";
import Day from "../calendar-day";
import React, {JSX} from "react";
import {IMonth} from "../../../../utils/helpers/date";

interface CalendarProps {
  locale: string;
  month : IMonth;
}

export default function Calendar({month, locale}: CalendarProps): JSX.Element {
  const firstWeekDayNumber = 2;
  const {functions, state} = useCalendar({month, locale, firstWeekDayNumber});

  let calendarWeeks: Array<JSX.Element> = [];
  state.calendarWeeks.map((week, weekNumber) => {
    let calendarDays: Array<JSX.Element> = [];
    week.map((day, index) => calendarDays.push(<Day key={index} number={day.dayNumber}
                                                    isActualDate={day.monthIndex == month.monthIndex}/>));
    calendarWeeks.push(
      <div className="col container" key={weekNumber}>
        <div className="row justify-content-between text-center">
          {calendarDays}
        </div>
        {
          (weekNumber + 1 !== state.calendarWeeks.length) ? <hr className="border-2 border-dark border-dark-mode-light my-3"/> : <></>
        }
      </div>
    );
  });

  return (
    <div className="">
      <div className="d-none d-lg-flex row justify-content-between text-start mb-5">
        {
          state.weekDaysNames.map((item, number) =>
            <div key={number} className="col text-muted fs-calendar-nav fw-normal">
              {item.dayShort}
            </div>
          )
        }
      </div>
      <hr className="border-2 border-dark border-dark-mode-light my-3"></hr>
      <div className="row d-flex flex-column">
        {calendarWeeks}
      </div>
    </div>
  );
}