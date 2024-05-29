import React, {useState} from "react";
import Filter, {IFilter} from "./components/filter";
import CalendarApp, {ICalendarDay} from "./components/calendar-app";

interface AppProps {
  calendarData : Array<ICalendarDay>
}

function App({calendarData} : AppProps) {
  const [filter, setFilter] = useState<IFilter>({categories : new Array<string>(), degree: ""});
  const [locale, setLocale] = useState<string>("ru");

  return (
  <div className="d-flex flex-column flex-lg-row justify-content-center w-100">
    <CalendarApp calendarData={calendarData} className="col col-lg-10 bg-white-lg rounded-calendar border border-2 border-transparent border-dark-mode-light pt-4 p-lg-5 me-lg-2 mx-dark-mode-0 h-100" locale={locale} filter={filter} setFilter={setFilter}/>
    <Filter calendarData={calendarData} prefix="desktop" className="col d-none d-lg-flex bg-white-lg border border-2 border-transparent border-dark-mode-light rounded-calendar ms-lg-2 mx-dark-mode-0 p-0 min-vw-15" filter={filter} setFilter={setFilter}/>
  </div>
  );
}

export default App;