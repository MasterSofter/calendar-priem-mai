import {useCalendar} from "./hooks/useCalendar";
import Day from "../calendar-day";
import {JSX} from "react";

interface CalendarProps {
  locale?: string;
  selectedDate: Date;
  selectDate: (date: Date) => void;
  firstWeekDayNumber?: number;
}

export default function Calendar(
  {
    locale = "default",
    selectedDate: date,
    selectDate,
    firstWeekDayNumber = 2
  }: CalendarProps): JSX.Element {
  const {functions, state} = useCalendar({
    locale,
    selectedDate: date,
    firstWeekDayNumber
  });

  let calendarWeeks: Array<JSX.Element> = [];
  state.calendarWeeks.map((week, weekNumber) => {
    let calendarDays: Array<JSX.Element> = [];
    week.map((day, index) => calendarDays.push(<Day key={index} number={day.dayNumber}
                                                    isActualDate={day.isActualDate}/>));
    calendarWeeks.push(
      <div className="col container" key={weekNumber}>
        <div className="row justify-content-between text-center">
          {calendarDays}
        </div>
        {
          (weekNumber + 1 !== state.calendarWeeks.length) ? <hr className="border-2 my-3"/> : <></>
        }
      </div>
    );
  });

  return (
    <>
      <div className="d-none d-lg-flex row justify-content-between text-start mb-5">
        {
          state.weekDaysNames.map((item, number) =>
            <div key={number} className="col text-muted fs-calendar-nav fw-normal">
              {item.dayShort}
            </div>
          )
        }
      </div>
      <hr className="border-2 my-3"></hr>
      <div className="row d-flex flex-column">
        {calendarWeeks}
      </div>
    </>
  );
}