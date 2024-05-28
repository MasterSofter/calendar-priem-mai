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
            <div onClick={handleClose} className="sticky-top bg-body d-flex flex-row justify-content-start align-items-center py-4 pt-5 px-4">
              <i className="fa-regular fa-arrow-left fs-calendar-offcanvas-text me-3"/>
              <span className="fs-calendar-offcanvas-title lh-1 text-capitalize">{createDate({locale: locale}).month}</span>
            </div>
            <Filter calendarData={calendarData} prefix="mobile" filter={filter} setFilter={setFilter} className="col d-flex flex-column justify-content-start"/>
          </div>
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}