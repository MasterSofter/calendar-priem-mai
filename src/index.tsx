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
  //@ts-ignore
 <div className="page-wrapper content-wrapper">
   <App calendarData={calendarData}/>
 </div>
);
