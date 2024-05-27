import {Badge} from "react-bootstrap";

interface EventProps{
  className : string;
  category: string | null;
  header : string | null;
  text: string | null;
  link : string | null;
  location : string | null;
}



export function Event({className, category, header, text, link, location} : EventProps) : JSX.Element {
  return (
    <div className={className}>
      <div className="py-4 py-lg-3 pb-lg-6">
        <div className="text-end mb-5 me-3">
          <Badge pill bg=""  className="text-dark border border-black border-dark-mode-light fs-calendar-offcanvas-badge">{category}</Badge>
        </div>
        <div className="row text-start mb-4 mb-lg-3">
          <span className="fs-calendar-offcanvas-category">{category}</span>
        </div>
        <div className="row text-start mb-4 mb-lg-3">
          <span className="col-11 col-lg-9 fs-calendar-offcanvas-text lh-sm">{text}</span>
        </div>
        <div className="row text-start mb-4 mb-lg-3">
          <a className="fs-calendar-offcanvas-text text-uppercase" href={link ? link : ""} target="_blank">Узнать больше</a>
        </div>
        <div className="d-flex flex-row justify-content-start align-items-center fs-calendar-offcanvas-text">
          <i className="fa-light fa-location-dot me-3"/>
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}