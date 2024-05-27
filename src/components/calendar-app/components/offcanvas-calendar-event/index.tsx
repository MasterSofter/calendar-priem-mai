import {Offcanvas, OffcanvasBody, OffcanvasHeader} from "react-bootstrap";
import CalendarApp, {ICalendarDay} from "../../index";
import React from "react";
import {createDate} from "../../../../utils/helpers/date";
import {Event} from "./components/event";
import Filter from "../../../filter";

interface OffcanvasCalendarEventProps{
  locale: string;
  selectedDate : Date;
  calendarData: Array<ICalendarDay> | undefined,
  show : boolean;
  setShow:  React.Dispatch<React.SetStateAction<boolean>>;
}

export function OffcanvasCalendarEvent({ locale, calendarData, selectedDate, show, setShow } : OffcanvasCalendarEventProps) : JSX.Element {
  const handleClose = () => setShow(false);

  //1. Получить массив категорий, относящиеся к этому дню этого месяца
  const categories = calendarData?.filter(
    (item) => (item.month === selectedDate.getMonth() && item.number == selectedDate.getDate())
  );

  return (
    <>
      <Offcanvas className="w-100 h-100" scroll={true} backdrop={false} placement="end" show={show} onHide={handleClose}>
        <OffcanvasBody className="py-0" >
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
            <div onClick={handleClose} className="d-flex flex-row justify-content-start align-items-center py-5">
              <i className="fa-regular fa-arrow-left fs-calendar-offcanvas-text me-3"/>
              <span className="fs-calendar-offcanvas-title lh-1">{createDate({date: selectedDate, locale: locale}).dateMonth}</span>
            </div>
            <div className="col d-flex flex-column justify-content-start">
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