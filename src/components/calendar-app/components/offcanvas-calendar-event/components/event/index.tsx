import {Badge} from "react-bootstrap";

interface EventProps{
  id : string;
  className : string;
  category: string | null;
  header : string;
  text: string | null;
  link : string | null;
  location : string | null;
  primary : boolean | null;
  warning : boolean | null;
}

export function Event({id, warning, primary,  className, category, header, text, link, location} : EventProps) : JSX.Element {
  return (
    <div id={id} className={className}>
      <div className="px-3 px-lg-0 py-4 py-lg-3 pb-lg-6">
        <div className="text-end me-lg-3">
          <Badge pill bg="" className={`border ${primary ? "text-primary text-dark-mode-brand border-primary border-gradient-dark-mode" : warning ? "text-danger border-danger border-2" : "text-dark border-black border-dark-mode-light"} fs-calendar-offcanvas-badge`}>{category}</Badge>
        </div>
        <div className="row text-start pb-4 pt-4">
          <span className="fs-calendar-offcanvas-header lh-sm">{header}</span>
        </div>
        {
          text &&
          <div className="row text-start pb-4 pt-lg-2">
            <span className="col-11 col-lg-9 fs-calendar-offcanvas-text lh-sm">{text}</span>
          </div>
        }
        {
          link &&
          <div className="row text-start pb-4 pt-lg-2">
            <a className="fs-calendar-offcanvas-text text-mobile-uppercase" href={link ? link : ""} target="_blank">Узнать больше</a>
          </div>
        }
        {
          location &&
          <div className="d-flex flex-row justify-content-start align-items-center fs-calendar-offcanvas-text pt-lg-2">
            <i className={`fa-light ${location.replace(" ", "") === "Онлайн" ? "fa-globe" : "fa-location-dot"} me-3`}/>
            <span>{location}</span>
          </div>
        }
      </div>
    </div>
  );
}