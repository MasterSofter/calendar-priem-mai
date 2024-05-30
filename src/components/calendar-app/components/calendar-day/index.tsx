import React, {useEffect, useState} from "react";
import {ICalendarDay} from "../../index";
import {IFilter} from "../../../filter";
import {removeDuplicates} from "../../../../utils/helpers/string/removeDuplicates";

interface DayProps {
  isToday : boolean;
  selectedDate : Date;
  setShowEvents:  React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDate :  React.Dispatch<React.SetStateAction<Date>>;
  date : Date;
  calendarData: Array<ICalendarDay> | undefined;
  filter: IFilter;
  isActualDate : boolean;
}

export default function Day({setShowEvents, calendarData, filter, isToday, selectedDate, setSelectedDate, date, isActualDate}: DayProps) : JSX.Element {
  let categories : Array<ICalendarDay> | undefined;

  //1. Получить массив категорий, удовлетворяющий условиям фильтра
  if(filter.categories.length > 0 && filter.degree != "Все")
    categories = calendarData?.filter(
      (item) => (!!filter.categories.find(el => el == item.category) && item.degree == filter.degree && item.month === date.getMonth() && item.number == date.getDate())
    );
  else if (filter.categories.length > 0)
    categories = calendarData?.filter(
      (item) => (!!filter.categories.find(el => el == item.category) && item.month === date.getMonth() && item.number == date.getDate())
    );
  else if(filter.degree != "Все")
    categories = calendarData?.filter(
      (item) => (item.degree == filter.degree && item.month === date.getMonth() && item.number == date.getDate())
    );
  else
    categories = calendarData?.filter(
      (item) => (item.month === date.getMonth() && item.number == date.getDate())
    );

  //2. Смотрим есть ли категории по приоритету 1.Warning 2.Primary
  let warningCategories = categories?.filter((item) => item.warning);
  let primaryCategories = categories?.filter((item) => item.primary);
  categories = categories?.filter((item) => !item.warning && !item.primary);

  let uniqueArray = removeDuplicates(primaryCategories, "category");
  uniqueArray?.map((item) => {
    categories?.unshift(item);
  });

  uniqueArray = removeDuplicates(warningCategories, "category");
  uniqueArray?.map( (item) => {
    categories?.unshift(item);
  });

  return (
    <div onClick={() => {setSelectedDate(date); setShowEvents(true);}} className={`${isToday ? "bg-grey-light" : ""} border ${(selectedDate === date) ? "border-dark border-dark-mode-light" : "border-transparent"} cursor-pointer hover-effect-up border-2 hover-border rounded-calendar-day-cell col text-center text-lg-start h-day-cell ${isActualDate ? "" : "text-muted"}`}>
      <div className="d-flex flex-column justify-content-between h-100 py-2">
        <span className="fs-day-number">{date.getDate()}</span>
        <div className="d-none d-lg-flex flex-column">
          {
            categories?.map((item, index) => index < 3
              && <span key={`day-event-${index}`} className={`lh-1 mb-2 fs-day-event ${item.primary ? "text-primary text-dark-mode-white" : ""} ${item.warning ? "text-danger text-dark-mode-white" : ""} `}>{item.category}</span>
            )
          }
          {categories && categories?.length > 3 &&
          <span key={`day-event-end`} className="lh-1 fs-day-event">{`еще +${categories?.length - 3}`}</span>
          }
        </div>
        <div className="d-lg-none text-center">
          <i className={`fa-solid fa-circle text-primary text-dark-mode-white ${(!categories || categories && categories.length == 0 )? "d-none" : ""} ${categories && categories.length < 2 ? "fs-circle-sm" : categories && categories.length < 4 ? "fs-circle-md" : "fs-circle-lg"}`}></i>
        </div>
      </div>
    </div>
  );
}