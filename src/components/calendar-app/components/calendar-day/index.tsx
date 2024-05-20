interface DayProps {
  number : number,
  isActualDate : boolean
}

export default function Day(props: DayProps) : JSX.Element {
  return (
    <div className={`col text-start h-day-cell ${props.isActualDate ? "" : "text-muted"}`}>
      <span className="fs-day-number">{props.number}</span>
    </div>
  );
}