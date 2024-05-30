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

  const degrees : Array<string> = ["Все"];
  calendarData.map((item, index) => {
    if(!degrees.find(el => el === item.degree) && (item.degree != "" && item.degree != null))
      degrees.push(item.degree);
  });

  const categories : Array<string> = new Array<string>();
  calendarData.map((item, index) => {
    if(!categories.find(el => item.category && el == item.category) && item.category)
      categories.push(item.category);
  });

  useEffect( () => {
    if(filter.degree == "")
      setFilter({...filter, degree: degrees[0]})
  }, [] );

  return (
    <div className={className}>
      <div className="w-100 pt-lg-1 mt-lg-5">
        <div className="d-none d-lg-block text-center mb-5"><span className="fs-calendar-filter-title fw-book">Фильтр</span></div>
        <hr className="border-calendar-filter border-grey-light mb-4"/>
        {/* Уровни образования */}
        <div className="px-3 mb-1 pb-2">
          <span className="text-lg-uppercase fs-calendar-filter mb-4 mb-lg-2 ms-3 ms-lg-0 d-block text-uppercase">Уровень образования</span>
          {
            degrees.map((degree, index) =>
              <div key={index} className="d-flex flex-row align-items-center form-check cursor-pointer hover-effect-up pt-2 pb-4 pb-lg-2 ms-3 ms-lg-0">
                <input checked={degrees[index] == filter.degree} onChange={(e)=> {
                  if(e.currentTarget.checked){
                    filter.degree = degrees[index];
                    setFilter({...filter});
                  }
                }} className="form-check-input input-calendar-filter cursor-pointer me-1 me-lg-3" type="radio" name={`${prefix}-Уровни образования`} id={`${prefix}-cal-filter-level-${index}`}/>
                <label id={`${prefix}-label-level-${index}`} className="lh-1 form-check-label fs-calendar-filter cursor-pointer ms-3 ms-lg-0" htmlFor={`${prefix}-cal-filter-level-${index}`}>
                  {degree}
                </label>
              </div>
            )
          }
        </div>
        <hr className="border-calendar-filter border-grey-light mb-4"/>
        {/* Категории */}
        <div className="px-3">
          <span className="text-lg-uppercase fs-calendar-filter mb-4 mb-lg-2 ms-3 ms-lg-0 d-block text-uppercase">Категории</span>
          {
            categories.map((category, index) =>
              <div key={index} className="d-flex flex-row align-items-center form-check cursor-pointer hover-effect-up pt-2 pb-4 pb-lg-2 ms-3 ms-lg-0">
                <input checked={!!filter.categories.find(item => item == categories[index]) } onChange={(e)=> {

                  const _index = filter.categories.indexOf(`${categories[index]}`);
                  if (_index > -1)
                    filter.categories.splice(_index, 1);

                  if(e.currentTarget.checked)
                    filter.categories.push(categories[index])

                  setFilter({...filter});
                }} className="form-check-input input-calendar-filter cursor-pointer me-1 me-lg-3" type="checkbox" name="Категории" id={`${prefix}-cal-filter-${index}`}/>
                <label className="lh-1 form-check-label fs-calendar-filter cursor-pointer ms-3 ms-lg-0" htmlFor={`${prefix}-cal-filter-${index}`}>
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