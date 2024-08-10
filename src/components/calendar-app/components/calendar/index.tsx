import {useCalendar} from "./hooks/useCalendar";
import Day from "../calendar-day";
import React, {JSX} from "react";
import {IMonth} from "../../../../utils/helpers/date";
import {ICalendarDay} from "../../index";
import {IFilter} from "../../../filter";

interface CalendarProps {
  id : string,
  selectedDate : Date;
  setShowEvents:  React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDate :  React.Dispatch<React.SetStateAction<Date>>;
  className: string;
  locale: string;
  calendarData: Array<ICalendarDay>;
  filter: IFilter;
  month : IMonth;
}

export function Calendar({id, setShowEvents, calendarData, filter, selectedDate, setSelectedDate, className, month, locale}: CalendarProps): JSX.Element {
  const firstWeekDayNumber = 2;
  const {functions, state} = useCalendar({month, locale, firstWeekDayNumber});

  let calendarWeeks: Array<JSX.Element> = [];
  state.calendarWeeks.map((week, weekNumber) => {
    let calendarDays: Array<JSX.Element> = [];

    week.map((day, index) => calendarDays.push(
      <Day key={`day-${index}-month-${day.monthIndex}`}
           setShowEvents={setShowEvents}
           calendarData={calendarData}
           filter={filter}
           selectedDate={selectedDate}
           setSelectedDate={setSelectedDate}
           date={day.date}
           isToday={day.isToday}
           isActualDate={day.isActualDate}
           visible={day.visible}/>
    ));
    calendarWeeks.push(
      <div className="col" key={weekNumber}>
        <div className="px-3 px-lg-5 row justify-content-between text-center mb-3">
          {calendarDays}
        </div>
        {
          (weekNumber + 1 !== state.calendarWeeks.length)
            ? <hr className="border-2 border-grey-light mb-3"/>
            : <hr className="d-lg-none border-3 border-grey-light mb-3"/>
        }
      </div>
    );
  });

  return (
    <div id={id} className={className}>
      <div className="row d-flex text-start">
        <span className="text-muted fs-calendar-nav fw-normal text-capitalize ms-4 ms-lg-5">{month.monthName}</span>
      </div>
      <hr className="calendar-start-line border-2 border-grey-light mt-3 mb-2 mb-lg-1"/>
      <div className="d-none d-lg-flex flex-row row justify-content-between text-start px-3 px-lg-5">
        {
          state.weekDaysNames.map((item, number) =>
            <div key={number} className="col text-muted fs-calendar-day-nav fw-normal">
              {item.dayShort}
            </div>
          )
        }
      </div>
      <hr className="d-none d-lg-flex calendar-start-line border-2 border-grey-light mt-1 mb-3"/>
      <div className="row d-flex flex-column">
        {calendarWeeks}
      </div>
    </div>
  );
}

//@ts-ignore
export const MemoizedCalendar = React.memo(Calendar, (props, nextProps)=> {
  if(props.calendarData === nextProps.calendarData && props.filter === nextProps.filter) {
    // don't re-render/update
    return true
  }
})