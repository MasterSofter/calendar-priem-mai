import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// перед сборкой проекта нужно закомментировать
//import "./css/_priem-theme.css";
// перед сборкой нужно закомментировать
//import {calendarData} from "./calendar-data";

//Стили календаря
import "./scss/theme.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

//@ts-ignore
if(typeof calendarData === "undefined")
  console.error("Не удалось получить calendarData! Проверьте, что данные календаря загружаются корректно.")

root.render(
  //@ts-ignore
  typeof calendarData !== "undefined" &&
  //@ts-ignore
  <App calendarData={calendarData}/>
);
