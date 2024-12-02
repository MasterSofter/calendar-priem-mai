import {useEffect, useState} from "react";
import Filter, {IFilter} from "./components/filter";
import CalendarApp, {ICalendarDay} from "./components/calendar-app";

interface AppProps {
  calendarData : Array<ICalendarDay>
}

function App({calendarData} : AppProps) {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [filter, setFilter] = useState<IFilter>({categories : new Array<string>(), degree: ""});
  const locale = "ru";
  
  useEffect(() => {
    const handleLoad = () => {
      if(window.innerWidth < 991){
        const rootElement = document.getElementById('root');
        if (!rootElement) return;
        setTimeout(() => {
          rootElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }, 300);
      }
    };

    window.addEventListener('load', handleLoad);

    return () => {
       window.removeEventListener('load', handleLoad);
    };
 }, []);

  return (
  <div className="calendar-wrapper d-flex flex-column flex-lg-row h-100">
    <CalendarApp
      selectedYear = {selectedYear}
      setSelectedYear = {setSelectedYear}
      selectedMonth = {selectedMonth}
      setSelectedMonth = {setSelectedMonth}
      calendarData={calendarData}
      filter={filter}
      setFilter={setFilter}
      locale={locale}
      className="col-lg-10 h-100 bg-white rounded-calendar overflow-hidden border border-dark-mode-2 border-calendar-dark-mode-light"
    />
    <Filter
      selectedYear = {selectedYear}
      selectedMonth = {selectedMonth}
      setSelectedMonth = {setSelectedMonth}
      calendarData={calendarData}
      filter={filter}
      setFilter={setFilter}
      prefix="desktop"
      className="col-lg d-none d-lg-block bg-white-lg border border-dark-mode-2 border-calendar-dark-mode-light rounded-calendar ms-lg-2 pt-4 p-0"
    />
  </div>
  );
}

export default App;