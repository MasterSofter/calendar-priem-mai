import React, {useEffect, useState} from "react";
import Filter, {IFilter} from "./components/filter";
import CalendarApp, {ICalendarDay} from "./components/calendar-app";

interface AppProps {
  calendarData : Array<ICalendarDay>
}

function App({calendarData} : AppProps) {
  const [filter, setFilter] = useState<IFilter>({categories : new Array<string>(), degree: ""});
  //const [locale, setLocale] = useState<string>("ru"); // на будущее
  const locale = "ru";

  return (
  <div className="d-flex flex-column flex-lg-row justify-content-center w-100">
    <CalendarApp calendarData={calendarData} className="w-calendar bg-white-lg rounded-calendar border border-2 border-transparent border-calendar-dark-mode-light p-lg-5 me-lg-2 mx-dark-mode-0 h-100" locale={locale} filter={filter} setFilter={setFilter}/>
    <Filter calendarData={calendarData} prefix="desktop" className="w-filter d-none d-lg-block bg-white-lg border border-2 border-transparent border-calendar-dark-mode-light rounded-calendar ms-neg-calendar-border-dark-mode mx-dark-mode-0 ms-lg-2 pt-4 p-0" filter={filter} setFilter={setFilter}/>
  </div>
  );
}

export default App;