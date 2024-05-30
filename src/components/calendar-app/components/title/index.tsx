export default function Title() : JSX.Element {
  return (
    <div className="w-calendar-title d-flex flex-column mb-5 mb-lg-0 ms-4 ms-lg-0">
      <span className="fs-calendar-title fw-bold lh-1 text-grey text-start">Календарь</span>
      <span className="fs-calendar-title fw-bold lh-1 text-grey text-end">абитуриента</span>
    </div>
  );
}