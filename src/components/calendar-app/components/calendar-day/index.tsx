import React from "react";
import {ICalendarDay} from "../../index";
import {IFilter} from "../../../filter";
import {removeDuplicates} from "../../../../utils/helpers/array/removeDuplicates";

interface DayProps {
  isToday : boolean;
  selectedDate : Date;
  setShowEvents:  React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDate :  React.Dispatch<React.SetStateAction<Date>>;
  date : Date;
  calendarData: Array<ICalendarDay>;
  filter: IFilter;
  isActualDate : boolean;
}

export default function Day({setShowEvents, calendarData, filter, isToday, selectedDate, setSelectedDate, date, isActualDate}: DayProps) : JSX.Element {
  let categories : Array<ICalendarDay>;

  //1. Выбрать все
  categories = calendarData.filter(
    (item) => (item.month === date.getMonth() && item.number === date.getDate())
  );
  //2, Оставить только по выбранным категориям
  if (filter.categories.length > 0)
    categories = categories?.filter(
      (item) => (!!filter.categories.find(el => el === item.category))
    );
  //3. Исключить по невыбранным уровням, если degree != "Все"
  if(filter.degree !== "Все")
    categories = categories?.filter(
      (item) => (item.degree === filter.degree || item.degree === "Все" )
    );

  //2. Смотрим есть ли категории по приоритету 1.Warning 2.Primary
  let warningCategories = categories?.filter((item) => item.warning);
  let primaryCategories = categories?.filter((item) => item.primary);
  categories = categories?.filter((item) => !item.warning && !item.primary);
  categories = removeDuplicates(categories, "category");

  let uniqueArray = removeDuplicates(primaryCategories, "category");
  uniqueArray?.map((item) =>  categories?.unshift(item));

  uniqueArray = removeDuplicates(warningCategories, "category");
  uniqueArray?.map( (item) =>  categories?.unshift(item));

  return (
    <div onClick={() => {setSelectedDate(date); if(categories && categories.length > 0) setShowEvents(true);}} className={`${isToday ? "bg-grey-light" : ""} border ${(selectedDate === date) ? "border-dark border-dark-mode-light" : "border-transparent"} cursor-pointer hover-effect-up border-2 hover-border rounded-calendar-day-cell col text-center text-lg-start h-day-cell ${isActualDate ? "" : "text-muted"}`}>
      <div className="d-flex flex-column justify-content-between h-100 py-2">
        <span className="fs-day-number">{date.getDate()}</span>
        <div className="d-none d-lg-flex flex-column">
          {
            categories?.map((item, index) => index < 3
              && <span key={`day-event-${index}`} className={`lh-1 mb-2 day-event-overflow fs-day-event ${item.primary ? "text-primary text-dark-mode-brand" : ""} ${item.warning ? "text-danger" : ""} `}>{item.category}</span>
            )
          }
          {categories && categories?.length > 3 &&
          <span key={`day-event-end`} className="text-primary text-dark-mode-brand lh-1 fs-day-event">{`еще +${categories?.length - 3}`}</span>
          }
        </div>
        <div className="d-lg-none text-center">
          <i className={`fa-solid fa-circle text-primary text-dark-mode-white ${(!categories || (categories && categories.length === 0)) ? "d-none" : ""} ${categories && categories.length < 2 ? "fs-circle-sm" : categories && categories.length < 4 ? "fs-circle-md" : "fs-circle-lg"}`}/>
        </div>
      </div>
    </div>
  );
}