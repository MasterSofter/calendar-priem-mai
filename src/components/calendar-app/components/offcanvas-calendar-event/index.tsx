import {Offcanvas, OffcanvasBody, OffcanvasHeader} from "react-bootstrap";
import {ICalendarDay} from "../../index";
import React from "react";
import {createDate} from "../../../../utils/helpers/date";
import {Event} from "./components/event";
import {IFilter} from "../../../filter";
import {removeDuplicates} from "../../../../utils/helpers/array/removeDuplicates";

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

  let categories : Array<ICalendarDay> | undefined;

  //1. Получить массив категорий, удовлетворяющий условиям фильтра
  //1.1 Выбрать все
  categories = calendarData?.filter(
    (item) => (item.month === selectedDate.getMonth() && item.number == selectedDate.getDate())
  );
  //1.2 Оставить только по выбранным категориям
  if (filter.categories.length > 0)
    categories = categories?.filter(
      (item) => (!!filter.categories.find(el => el == item.category))
    );
  //1.3 Исключить по невыбранным уровням, если degree != "Все"
  if(filter.degree != "Все")
    categories = categories?.filter(
      (item) => (item.degree == filter.degree || item.degree == "Все" )
    );

  //2. Группируем по категориям
  let uniqueArray = removeDuplicates(categories, "category");
  let groupsCategories : Array<Array<ICalendarDay> | undefined> = new Array<Array<ICalendarDay>>();
  uniqueArray.map((el, index) => {
    groupsCategories[index] = categories?.filter(filterItem => filterItem.category == el.category);
  })

  categories = new Array<ICalendarDay>();
  groupsCategories.map( i => i?.map( k => categories?.push(k)) )

  function getIndexOfCategory(category : string) : number{
    let item = categories?.find( el => el.category == category );
    if(item != undefined && categories != undefined)
      return categories.indexOf(item);
    return 0;
  }

  function onSmoothScrollTo(id : string){
    const rootElement = document.getElementById(id);
    if (!rootElement) return;
    setTimeout(() => {
      rootElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }, 0);
  }

  return (
    <>
      <Offcanvas className="w-100 h-100" scroll={false} backdrop={false} placement="end" show={show} onHide={handleClose}>
        <OffcanvasBody className="py-0 px-0" >
          <div className="d-none d-lg-block w-100 h-100">
            <div className="container page-wrapper">
              <div className="row d-flex flex-column flex-lg-row justify-content-center min-vh-100">
                <div className="col-3 border-end border-dark border-dark-mode-light d-flex flex-column py-5">
                  <div className="row d-flex flex-column justify-content-start mb-6 position-fixed">
                    <div className="d-flex flex-row justify-content-start align-items-center mb-6">
                      <i onClick={handleClose} className="fa-regular fa-arrow-left fs-calendar-offcanvas-text border border-2 border-black border-dark-mode-light rounded-circle hover-effect-up cursor-pointer p-3 me-3"/>
                      <span className="fs-calendar-offcanvas-text text-muted">Esc</span>
                    </div>
                    <span className="fs-calendar-offcanvas-title lh-1">{createDate({date: selectedDate, locale: locale}).dateMonth}</span>
                  </div>
                  <div className="row d-flex flex-column position-fixed" style={{width:"23rem", bottom:"4.5rem"}}>
                    {
                      removeDuplicates(categories, "category")?.map((item, index) => <span onClick={() => onSmoothScrollTo(`event-category-${getIndexOfCategory(item.category)}`)} className={`${item.primary ? "text-primary text-dark-mode-brand" : ""} ${item.warning ? "text-danger" : ""} fs-calendar-offcanvas-category hover-effect-up cursor-pointer lh-sm mb-3`} key={index}>{item.category}</span>)
                    }
                  </div>
                </div>
                <div className="col d-flex flex-column justify-content-start py-6 px-6 mx-5 mt-6">
                  {
                    categories?.map((item, index) => <Event id={`event-category-${index}`} className="row" key={index} warning={item.warning} primary={item.primary} category={item.category} header={item.header} text={item.text} link={item.link} location={item.location}/>)
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="d-lg-none">
            <div onClick={handleClose} className="ps-4 sticky-top bg-body d-flex flex-row justify-content-start align-items-center py-4">
              <i className="fa-regular fa-arrow-left fs-calendar-offcanvas-text text-muted ms-3 me-3"/>
              <span className="fs-calendar-offcanvas-title lh-1 ms-2">{createDate({date: selectedDate, locale: locale}).dateMonth}</span>
            </div>
            <div className="d-flex flex-column justify-content-start">
              {
                categories?.map((item, index) => <Event id={`event-category-${index}`} className="bg-grey-light mb-4 px-4 py-2" key={index} warning={item.warning} primary={item.primary} category={item.category} header={item.header} text={item.text} link={item.link} location={item.location}/>)
              }
            </div>
          </div>
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}