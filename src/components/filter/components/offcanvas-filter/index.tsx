import {Offcanvas, OffcanvasBody} from "react-bootstrap";
import {createDate} from "../../../../utils/helpers/date";
import {Event} from "../../../calendar-app/components/offcanvas-calendar-event/components/event";
import React from "react";
import {ICalendarDay} from "../../../calendar-app";
import Filter, {IFilter} from "../../index";


interface OffcanvasFilterProps{
  locale: string;
  show : boolean;
  calendarData : Array<ICalendarDay>;
  filter : IFilter;
  setFilter:  React.Dispatch<React.SetStateAction<IFilter>>;
  setShow:  React.Dispatch<React.SetStateAction<boolean>>;
}

export function OffcanvasFilter({calendarData, filter, locale, show, setShow, setFilter} : OffcanvasFilterProps) :JSX.Element {
  const handleClose = () => setShow(false);
  return (
    <>
      <Offcanvas className="w-100 h-100" scroll={true} backdrop={false} placement="end" show={show} onHide={handleClose}>
        <OffcanvasBody className="py-0 px-0" >
          <div className="d-lg-none">
            <div onClick={handleClose} className="sticky-top d-flex flex-row justify-content-start align-items-center py-5 ps-3">
              <i className="fa-regular fa-arrow-left fs-calendar-offcanvas-text text-muted ms-3 me-4"/>
              <span className="fs-calendar-offcanvas-title lh-1 text-capitalize ms-2">{createDate({locale: locale}).month}</span>
            </div>
            <Filter calendarData={calendarData} prefix="mobile" filter={filter} setFilter={setFilter} className="d-flex flex-column justify-content-start"/>
          </div>
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}