import {useEffect, useState} from "react";
import Filter, {IFilter} from "./components/filter";
import CalendarApp, {ICalendarDay} from "./components/calendar-app";
import {createDate} from "./utils/helpers/date";

interface AppProps {
  calendarData : Array<ICalendarDay>
}

function App({calendarData} : AppProps) {
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

  function getActualCalendarData( calendarData : Array<ICalendarDay> ) : Array<ICalendarDay> {
    let result = new Array<ICalendarDay>();

    let currentDate = createDate({locale: locale, date: new Date()});
    let monday = new Date(currentDate.year, currentDate.monthIndex, currentDate.dayNumber - currentDate.dayNumberInWeek + 2);

    calendarData.forEach(data => {
      if(data.number >= monday.getDate() && data.month >= monday.getMonth())
        result.push(data);
    })
    return result;
  }

  return (
  <div className="calendar-wrapper d-flex flex-column flex-lg-row">
    <CalendarApp
      calendarData={getActualCalendarData(calendarData)}
      filter={filter}
      setFilter={setFilter}
      locale={locale}
      className="col-lg-10 bg-white-lg rounded-calendar border border-2 border-lg-0 border-calendar-dark-mode-light mx-dark-mode-0"
    />
    <Filter
      calendarData={getActualCalendarData(calendarData)}
      filter={filter}
      setFilter={setFilter}
      prefix="desktop"
      className="col-lg d-none d-lg-block bg-white-lg border border-2 border-lg-0 border-calendar-dark-mode-light rounded-calendar ms-neg-calendar-border-dark-mode mx-dark-mode-0 ms-lg-2 pt-4 p-0"
    />
  </div>
  );
}

export default App;