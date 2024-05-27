import React from "react";

type FilterProps = {
  setFilter : React.Dispatch<object>,
  className: string
}

export interface IFilter {

}

export default function Filter (props : FilterProps) : JSX.Element {

  return (
    <div className={props.className}>
      <div className="w-100 mt-5">
        <div className="text-center my-4 mb-5 pt-2"><span className="fs-calendar-filter-title fw-book">Фильтр</span></div>
        <hr className="border-1 border-dark border-dark-mode-light my-3"/>
        {/* Уровни образования */}
        <div className="px-3">
          <span className="text-uppercase fs-calendar-filter fw-bold mb-2 d-block">Уровень образования</span>
          <div className="form-check cursor-pointer hover-effect-up">
            <input className="form-check-input input-calendar-filter cursor-pointer" type="radio" name="Уровни образования" id="cal-filter-all"/>
            <label className="form-check-label fs-calendar-filter cursor-pointer" htmlFor="cal-filter-all">
              Все
            </label>
          </div>
          <div className="form-check cursor-pointer hover-effect-up">
            <input className="form-check-input input-calendar-filter cursor-pointer" type="radio" name="Уровни образования" id="cal-filter-bvo"/>
            <label className="form-check-label fs-calendar-filter cursor-pointer" htmlFor="cal-filter-bvo">
              Базовое высшее
            </label>
          </div>
          <div className="form-check cursor-pointer hover-effect-up">
            <input className="form-check-input input-calendar-filter cursor-pointer" type="radio" name="Уровни образования" id="cal-filter-spec"/>
            <label className="form-check-label fs-calendar-filter cursor-pointer" htmlFor="cal-filter-spec">
              Специализированное высшее
            </label>
          </div>
        </div>
        <hr className="border-1 border-dark border-dark-mode-light my-3"/>
        {/* Категории */}
        <div className="px-3">
          <span className="text-uppercase fs-calendar-filter fw-bold mb-2 d-block">Категории</span>
          <div className="form-check cursor-pointer hover-effect-up">
            <input className="form-check-input input-calendar-filter cursor-pointer" type="checkbox" name="Категории" id="cal-filter-priem"/>
            <label className="form-check-label fs-calendar-filter cursor-pointer" htmlFor="cal-filter-priem">
              Предварительный приём
            </label>
          </div>
          <div className="form-check cursor-pointer hover-effect-up">
            <input className="form-check-input input-calendar-filter cursor-pointer" type="checkbox" name="Категории" id="cal-filter-open-doors"/>
            <label className="form-check-label fs-calendar-filter cursor-pointer" htmlFor="cal-filter-open-doors">
              День открытых дверей
            </label>
          </div>
          <div className="form-check cursor-pointer hover-effect-up">
            <input className="form-check-input input-calendar-filter cursor-pointer" type="checkbox" name="Категории" id="cal-filter-priem-docs"/>
            <label className="form-check-label fs-calendar-filter cursor-pointer" htmlFor="cal-filter-priem-docs">
              Приём документов
            </label>
          </div>
          <div className="form-check cursor-pointer hover-effect-up">
            <input className="form-check-input input-calendar-filter cursor-pointer" type="checkbox" name="Категории" id="cal-filter-priem-agree"/>
            <label className="form-check-label fs-calendar-filter cursor-pointer" htmlFor="cal-filter-priem-agree">
              Приём согласий
            </label>
          </div>
          <div className="form-check cursor-pointer hover-effect-up">
            <input className="form-check-input input-calendar-filter cursor-pointer" type="checkbox" name="Категории" id="cal-filter-event"/>
            <label className="form-check-label fs-calendar-filter cursor-pointer" htmlFor="cal-filter-event">
              Мероприятие
            </label>
          </div>
          <div className="form-check cursor-pointer hover-effect-up">
            <input className="form-check-input input-calendar-filter cursor-pointer" type="checkbox" name="Категории" id="cal-filter-university-saturdays"/>
            <label className="form-check-label fs-calendar-filter cursor-pointer" htmlFor="cal-filter-university-saturdays">
              Университетские субботы
            </label>
          </div>
          <div className="form-check cursor-pointer hover-effect-up">
            <input className="form-check-input input-calendar-filter cursor-pointer" type="checkbox" name="Категории" id="cal-filter-completion"/>
            <label className="form-check-label fs-calendar-filter cursor-pointer" htmlFor="cal-filter-completion">
              Завершение
            </label>
          </div>
          <div className="form-check cursor-pointer hover-effect-up">
            <input className="form-check-input input-calendar-filter cursor-pointer" type="checkbox" name="Категории" id="cal-filter-order"/>
            <label className="form-check-label fs-calendar-filter cursor-pointer" htmlFor="cal-filter-order">
              Приказ
            </label>
          </div>
          <div className="form-check cursor-pointer hover-effect-up">
            <input className="form-check-input input-calendar-filter cursor-pointer" type="checkbox" name="Категории" id="cal-filter-consultation"/>
            <label className="form-check-label fs-calendar-filter cursor-pointer" htmlFor="cal-filter-consultation">
              Консультация
            </label>
          </div>
          <div className="form-check cursor-pointer hover-effect-up">
            <input className="form-check-input input-calendar-filter cursor-pointer" type="checkbox" name="Категории" id="cal-filter-exam"/>
            <label className="form-check-label fs-calendar-filter cursor-pointer" htmlFor="cal-filter-exam">
              Экзамен
            </label>
          </div>
          <div className="form-check cursor-pointer hover-effect-up">
            <input className="form-check-input input-calendar-filter cursor-pointer" type="checkbox" name="Категории" id="cal-filter-results"/>
            <label className="form-check-label fs-calendar-filter cursor-pointer" htmlFor="cal-filter-results">
              Результаты
            </label>
          </div>
          <div className="form-check cursor-pointer hover-effect-up">
            <input className="form-check-input input-calendar-filter cursor-pointer" type="checkbox" name="Категории" id="cal-filter-hostels"/>
            <label className="form-check-label fs-calendar-filter cursor-pointer" htmlFor="cal-filter-hostels">
              Заселение в общежитие
            </label>
          </div>
        </div>
      </div>
      </div>
  );
}