import {Offcanvas, OffcanvasBody} from "react-bootstrap";
import {createDate} from "../../../../utils/helpers/date";
import {ICalendarDay} from "../../../calendar-app";
import Filter, {IFilter} from "../../index";
import React from "react";


interface OffcanvasFilterProps{
  locale: string;
  show : boolean;
  selectedMonth : number;
  setSelectedMonth : React.Dispatch<React.SetStateAction<number>>;
  calendarData : Array<ICalendarDay>;
  filter : IFilter;
  setFilter:  React.Dispatch<React.SetStateAction<IFilter>>;
  setShow:  React.Dispatch<React.SetStateAction<boolean>>;
}

export function OffcanvasFilter({selectedMonth, setSelectedMonth, calendarData, filter, locale, show, setShow, setFilter} : OffcanvasFilterProps) :JSX.Element {
  const handleClose = () => setShow(false);
  return (
    <>
      <Offcanvas className="w-100 h-100" scroll={false} backdrop={false} placement="end" show={show} onHide={handleClose}>
        <OffcanvasBody className="py-0 px-0" >
          <div className="d-lg-none">
            <div onClick={handleClose} className="sticky-top d-flex flex-row justify-content-start align-items-center py-4 ps-3">
              <i className="fa-regular fa-arrow-left fs-calendar-offcanvas-header text-muted ms-3 me-3"/>
              <span className="fs-calendar-offcanvas-title lh-1 text-capitalize ms-2">{createDate({locale: locale}).month}</span>
            </div>
            <Filter selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} calendarData={calendarData} prefix="mobile" filter={filter} setFilter={setFilter} className="d-flex flex-column justify-content-start"/>
          </div>
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}