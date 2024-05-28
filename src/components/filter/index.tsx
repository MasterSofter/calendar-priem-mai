import React, {useEffect} from "react";
import {ICalendarDay} from "../calendar-app";

type FilterProps = {
  prefix :string;
  filter : IFilter;
  calendarData : Array<ICalendarDay>;
  setFilter : React.Dispatch<IFilter>,
  className: string
}

export interface IFilter {
  degree : string;
  categories: Array<string>,
}

export default function Filter ({calendarData, prefix, filter, setFilter, className} : FilterProps) : JSX.Element {

  const degrees : Array<string> = new Array<string>();
  calendarData.map((item, index) => {
    if(!degrees.find(el => item.degree && el == item.degree) && item.degree)
      degrees.push(item.degree);
  })

  const categories : Array<string> = new Array<string>();
  calendarData.map((item, index) => {
    if(!categories.find(el => item.category && el == item.category) && item.category)
      categories.push(item.category);
  })

  /*
  const levels : Array<string> = [
    "Все",
    "Базовое высшее",
    "Специализированное высшее"
  ]

  let categories : Array<string> = [
    "Предварительный приём",
    "День открытых дверей",
    "Приём документов",
    "Приём согласий",
    "Мероприятие",
    "Университетские субботы",
    "Завершение",
    "Приказ",
    "Консультация",
    "Экзамен",
    "Результаты",
    "Заселение в общежитие"
  ];
  */

  useEffect( () => {
    if(filter.degree == "")
      setFilter({...filter, degree: degrees[0]})
  }, [] )

  return (
    <div className={className}>
      <div className="w-100 mt-lg-5">
        <div className="d-none d-lg-block text-center my-4 mb-5 pt-2"><span className="fs-calendar-filter-title fw-book">Фильтр</span></div>
        <hr className="border-filter border-dark border-dark-mode-light my-3"/>
        {/* Уровни образования */}
        <div className="px-3">
          <span className="text-lg-uppercase fs-calendar-filter fw-lg-bold mb-4 mb-lg-2 ms-3 ms-lg-0 d-block">Уровень образования</span>
          {
            degrees.map((degree, index) =>
              <div key={index} className="form-check cursor-pointer hover-effect-up mb-3 mb-lg-0 ms-3 ms-lg-0">
                <input checked={degrees[index] == filter.degree} onChange={(e)=> {
                  if(e.currentTarget.checked){
                    filter.degree = degrees[index];
                    setFilter({...filter});
                  }
                }} className="form-check-input input-calendar-filter cursor-pointer me-4 me-lg-3" type="radio" name={`${prefix}-Уровни образования`} id={`${prefix}-cal-filter-level-${index}`}/>
                <label id={`${prefix}-label-level-${index}`} className="form-check-label fs-calendar-filter cursor-pointer" htmlFor={`${prefix}-cal-filter-level-${index}`}>
                  {degree}
                </label>
              </div>
            )
          }
        </div>
        <hr className="border-filter border-dark border-dark-mode-light my-3"/>
        {/* Категории */}
        <div className="px-3">
          <span className="text-lg-uppercase fs-calendar-filter fw-lg-bold mb-4 mb-lg-2 ms-3 ms-lg-0 d-block">Категории</span>
          {
            categories.map((category, index) =>
              <div key={index} className="form-check cursor-pointer hover-effect-up mb-3 mb-lg-0 ms-3 ms-lg-0">
                <input checked={!!filter.categories.find(item => item == categories[index]) } onChange={(e)=> {

                  const _index = filter.categories.indexOf(`${categories[index]}`);
                  if (_index > -1)
                    filter.categories.splice(_index, 1);

                  if(e.currentTarget.checked)
                    filter.categories.push(categories[index])

                  setFilter({...filter});
                }} className="form-check-input input-calendar-filter cursor-pointer me-4 me-lg-3" type="checkbox" name="Категории" id={`${prefix}-cal-filter-${index}`}/>
                <label className="form-check-label fs-calendar-filter cursor-pointer" htmlFor={`${prefix}-cal-filter-${index}`}>
                  {category}
                </label>
              </div>
            )
          }
        </div>
      </div>
      </div>
  );
}