import React, {useState} from "react";
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
    <div className="row">
      <CalendarApp className="col col-lg-10 bg-white rounded-calendar p-lg-5 p-md-4 p-3" locale={locale} calendarData={calendarData} filter={filter}/>
      <Filter className="d-none d-lg-flex col bg-white border border-3 border-dark-mode-light rounded-calendar ms-lg-2 ms-1" setFilter={setFilter}/>
    </div>
  );
}

export default App;