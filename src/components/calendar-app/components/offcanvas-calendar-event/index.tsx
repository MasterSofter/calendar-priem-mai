import {Offcanvas, OffcanvasBody, OffcanvasHeader} from "react-bootstrap";
import {ICalendarDay} from "../../index";
import React from "react";
import {createDate} from "../../../../utils/helpers/date";
import {Event} from "./components/event";
import {IFilter} from "../../../filter";

interface OffcanvasCalendarEventProps{
  locale: string;
  selectedDate : Date;
  filter : IFilter;
  calendarData: Array<ICalendarDay> | undefined,
  show : boolean;
  setShow:  React.Dispatch<React.SetStateAction<boolean>>;
}

export function OffcanvasCalendarEvent({filter, locale, calendarData, selectedDate, show, setShow } : OffcanvasCalendarEventProps) : JSX.Element {
  const handleClose = () => setShow(false);

  let degree = "";
  let categories : Array<ICalendarDay> | undefined;

  //1. Получить уровень, относящийся к этому дню этого месяца с учетом фильтра
  if(filter.degree != ""){
    calendarData?.map(
      (item, index) => {
        if (filter.degree == item.degree && item.month === selectedDate.getMonth() && item.number == selectedDate.getDate())
          degree = item.degree;
      }
    )
  }

  //2. Получить массив категорий, удовлетворяющий условиям фильтра
  if(filter.categories.length > 0 && filter.degree != "")
    categories = calendarData?.filter(
      (item) => (!!filter.categories.find(el => el == item.category) && item.degree == degree && item.month === selectedDate.getMonth() && item.number == selectedDate.getDate())
    );
  else if (filter.categories.length > 0)
    categories = calendarData?.filter(
      (item) => (!!filter.categories.find(el => el == item.category) && item.month === selectedDate.getMonth() && item.number == selectedDate.getDate())
    );
  else if(filter.degree != "")
    categories = calendarData?.filter(
      (item) => (item.degree == degree && item.month === selectedDate.getMonth() && item.number == selectedDate.getDate())
    );
  else
    categories = calendarData?.filter(
      (item) => (item.month === selectedDate.getMonth() && item.number == selectedDate.getDate())
    );

  return (
    <>
      <Offcanvas className="w-100 h-100" scroll={true} backdrop={false} placement="end" show={show} onHide={handleClose}>
        <OffcanvasBody className="py-0 px-0" >
          <div className="d-none d-lg-block w-100 h-100 page-wrapper calendar-wrapper">
            <div className="container content-wrapper">
              <div className="row d-flex flex-column flex-lg-row justify-content-center min-vh-100">
                <div className="col-3 border-end border-dark border-dark-mode-light d-flex flex-column justify-content-between py-5">
                  <div className="d-flex flex-column justify-content-start mb-6">
                    <div className="d-flex flex-row justify-content-start align-items-center mb-6">
                      <i onClick={handleClose} className="fa-regular fa-arrow-left fs-calendar-offcanvas-text border border-2 border-black border-dark-mode-light rounded-circle hover-effect-up cursor-pointer p-3 me-3"/>
                      <span className="fs-calendar-offcanvas-text text-muted">Esc</span>
                    </div>
                    <span className="fs-calendar-offcanvas-title lh-1">{createDate({date: selectedDate, locale: locale}).dateMonth}</span>
                  </div>
                  <div className="d-flex flex-column mb-6">
                    {
                      categories?.map((item, index) => <span className="fs-calendar-offcanvas-category hover-effect-up" key={index}>{item.category}</span>)
                    }
                  </div>
                </div>
                <div className="col d-flex flex-column justify-content-start py-6 px-6 mx-5">
                  {
                    categories?.map((item, index) => <Event className="row" key={index} category={item.category} header={item.header} text={item.text} link={item.link} location={item.location}/>)
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="d-lg-none">
            <div onClick={handleClose} className="px-4 sticky-top bg-body d-flex flex-row justify-content-start align-items-center py-5">
              <i className="fa-regular fa-arrow-left fs-calendar-offcanvas-text me-3"/>
              <span className="fs-calendar-offcanvas-title lh-1">{createDate({date: selectedDate, locale: locale}).dateMonth}</span>
            </div>
            <div className="px-4 col d-flex flex-column justify-content-start">
              {
                categories?.map((item, index) => <Event className="row bg-white bg-dark-mode-gray mb-4" key={index} category={item.category} header={item.header} text={item.text} link={item.link} location={item.location}/>)
              }
            </div>
          </div>
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}