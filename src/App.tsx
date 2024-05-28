import React, {HTMLAttributes, MutableRefObject, useEffect, useRef, useState} from "react";
import "./scss/theme.scss";
import {ICalendarDay} from "./components/calendar-app";
import Filter from "./components/filter";
import "./calendar-data"
import {CalendarData} from "./calendar-data";
import CalendarApp from "./components/calendar-app";

function App() {
  const [calendarData, setCalendarData] = useState<Array<ICalendarDay>>(CalendarData);
  const [filter, setFilter] = useState<object>();
  const [locale, setLocale] = useState<string>("ru");

  return (
    <div className="w-100 h-100 page-wrapper calendar-wrapper">
      <div className="container content-wrapper py-5">
        <div className="row d-flex flex-column flex-lg-row justify-content-center">
          <CalendarApp className="calendar-content col col-lg-10 bg-white-lg rounded-calendar p-lg-5 p-md-4 p-3 h-100" locale={locale} calendarData={calendarData} filter={filter} setFilter={setFilter}/>
          <Filter className="col d-none d-lg-flex bg-white-lg border border-2 border-white border-dark-mode-light rounded-calendar ms-lg-2 ms-1 p-0" setFilter={setFilter}/>
        </div>
      </div>
    </div>
  );
}

export default App;