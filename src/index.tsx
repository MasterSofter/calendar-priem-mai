import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// перед сборкой проекта нужно закомментировать
import "./css/_priem-theme.css";
// перед сборкой нужно закомментировать
import {calendarData} from "./calendar-data";

//Стили календаря
import "./scss/theme.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // перед сборкой нужно оставить только <App calendarData={calendarData}/>
  <div className="page-wrapper container content-wrapper">
    <App calendarData={calendarData}/>
  </div>
);
