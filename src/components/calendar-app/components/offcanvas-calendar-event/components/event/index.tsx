import {Badge} from "react-bootstrap";

interface EventProps{
  className : string;
  category: string | null;
  header : string | null;
  text: string | null;
  link : string | null;
  location : string | null;
  primary : boolean;
  warning : boolean;
}

export function Event({warning, primary,  className, category, header, text, link, location} : EventProps) : JSX.Element {
  return (
    <div className={className}>
      <div className="px-3 px-lg-0 py-4 py-lg-3 pb-lg-6">
        <div className="text-end mb-5 me-3">
          <Badge pill bg="" className={`border ${primary ? "text-primary text-dark-mode-white border-primary border-dark-mode-light" : warning ? "text-danger text-dark-mode-white border-danger border-dark-mode-light" : "text-dark border-dark-mode-light"} fs-calendar-offcanvas-badge`}>{category}</Badge>
        </div>
        <div className="row text-start pb-5 pb-lg-4 pt-4">
          <span className="fs-calendar-offcanvas-header">{header}</span>
        </div>
        <div className="row text-start pb-5 pb-lg-4 pt-lg-2">
          <span className="col-11 col-lg-9 fs-calendar-offcanvas-text lh-sm">{text}</span>
        </div>
        <div className="row text-start pb-5 pb-lg-4 pt-lg-2">
          <a className="fs-calendar-offcanvas-text text-mobile-uppercase" href={link ? link : ""} target="_blank">Узнать больше</a>
        </div>
        <div className="d-flex flex-row justify-content-start align-items-center fs-calendar-offcanvas-text pt-lg-2">
          <i className="fa-light fa-location-dot me-3"/>
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}