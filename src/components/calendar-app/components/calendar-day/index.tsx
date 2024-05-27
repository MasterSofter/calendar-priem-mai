import React, {useEffect} from "react";
import {ICalendarDay} from "../../index";

interface DayProps {
  isToday : boolean;
  selectedDate : Date;
  setShowEvents:  React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDate :  React.Dispatch<React.SetStateAction<Date>>;
  date : Date;
  calendarData: Array<ICalendarDay> | undefined;
  filter: object | undefined;
  isActualDate : boolean;
}

export default function Day({setShowEvents, calendarData, filter, isToday, selectedDate, setSelectedDate, date, isActualDate}: DayProps) : JSX.Element {

  //1. Получить массив категорий, относящиеся к этому дню этого месяца
  const categories = calendarData?.filter(
    (item) => (item.month === date.getMonth() && item.number == date.getDate())
  );

  return (
    <div onClick={() => {
      setSelectedDate(date);
      setShowEvents(true);
    }} className={`${isToday ? "bg-current-date" : ""} ${(selectedDate === date) ? "border border-dark border-dark-mode-light" : ""} cursor-pointer hover-effect-up border-2 hover-border rounded-calendar col text-center text-lg-start h-day-cell ${isActualDate ? "" : "text-muted"}`}>
      <div className="d-flex flex-column justify-content-between h-100 py-2">
        <span className="fs-day-number">{date.getDate()}</span>
        <div className="d-none d-lg-flex flex-column">
          {
            categories?.map((item, index) => index < 4
              ? <span key={index} className="fs-day-event">{item.category}</span> : <></>
            )
          }
          {categories && categories?.length > 4 &&
            <span className="fs-day-event">{`еще +${categories?.length - 4}`}</span>
          }



        </div>
        <div className="d-lg-none text-center">
          <i className={`fa-solid fa-circle text-primary ${categories && categories.length < 2 ? "fs-circle-sm" : categories && categories.length < 4 ? "fs-circle-md" : "fs-circle-lg"}`}></i>
        </div>
      </div>
    </div>
  );
}