import React, {useEffect} from "react";

interface DayProps {
  isToday : boolean;
  selectedDate : Date;
  setSelectedDate :  React.Dispatch<React.SetStateAction<Date>>;
  date : Date,
  isActualDate : boolean
}

export default function Day({isToday, selectedDate, setSelectedDate, date, isActualDate}: DayProps) : JSX.Element {
  return (
    <div onClick={() => {
      setSelectedDate(date);
    }} className={`${isToday ? "bg-current-date" : ""} ${(selectedDate === date) ? "border border-dark border-dark-mode-light" : ""} cursor-pointer hover-effect-up border-2 hover-border rounded-calendar col text-center text-lg-start h-day-cell ${isActualDate ? "" : "text-muted"}`}>
      <span className="fs-day-number">{date.getDate()}</span>
    </div>
  );
}