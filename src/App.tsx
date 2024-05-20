import React, {useState} from "react";
import "./scss/theme.scss";
import Calendar, {CalendarDay} from "./components/calendar-app";
import Filter from "./components/filter";
import "./calendar-data"
import {CalendarData} from "./calendar-data";
import CalendarApp from "./components/calendar-app";
import {createDate} from "./utils/helpers/date/createDate";
import {createMonth} from "./utils/helpers/date/createMonth";
import {getWeekDaysNames} from "./utils/helpers/date/getWeekDaysNames";
import {getMonthesNames} from "./utils/helpers/date/getMonthesNames";
import {createYear} from "./utils/helpers/date/createYear";

function App() {

  const [calendarData, setCalendarData] = useState<Array<CalendarDay>>(CalendarData);
  const [filter, setFilter] = useState<object>();

  return (
    <div className="row">
      <CalendarApp className="col col-lg-10 bg-light rounded-calendar p-lg-5 p-md-4 p-3" calendarData={calendarData} filter={filter}/>
      <Filter className="d-none d-lg-flex col bg-light rounded-calendar ms-lg-2 ms-1" setFilter={setFilter}/>
    </div>
  );
}

export default App;


/*
*
*  let [month, setMonth] = useState(4);
  let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  let days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  let mounthData = [
    [undefined, undefined, "1", "2", "3", "4", "5"],
    ["6", "7", "8", "9", "10", "11", "12"],
    ["13", "14", "15", "16", "17", "18", "19"],
    ["20", "21", "22", "23", "24", "25", "26"],
    ["27", "28", "29", "30", "31", undefined, undefined]
  ];
*
* */

/*

<table className="w-100">
        <tbody>
        <tr>
          <td colSpan={1}>
            <i className="fs-calendar-app fa-solid fa-circle-chevron-left"/>
          </td>
          <td colSpan={5}>
            <span className="fs-calendar-app">Январь</span>
          </td>
          <td colSpan={1}>
            <i className="fs-calendar-app fa-solid fa-circle-chevron-right"/>
          </td>
        </tr>
        <tr className="fs-calendar-app">
          {
            days.map((value, number) =>
            <td key={number}>{value}</td>)
          }
        </tr>
        {
          mounthData.map((week, weekNumber) =>
          <tr key={weekNumber} className="fs-calendar-app" style={{verticalAlign:"top"}}>
            {
              week.map((day, dayNumber) =>
              day ? <td key={dayNumber} className={`${ day == "1" ? "bg-secondary rounded-5" : ""}`}>
                <div className="d-flex flex-column text-center my-4">
                  <span>{day}</span>
                  {
                    dayNumber % 2 == 0 ?
                      <div className="text-warning" style={{fontSize:"224px", marginBottom:"-5rem" , marginTop:"-10rem"}}>.</div>
                      : <></>
                  }
                </div>
                </td> : <td key={dayNumber}/>)
            }
          </tr>)
        }
        </tbody>
      </table>

* */