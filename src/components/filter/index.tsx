import React from "react";

type FilterProps = {
  setFilter : React.Dispatch<object>,
  className: string
}

export default function Filter (props : FilterProps) : JSX.Element {

  return (
    <div className={props.className}>
    </div>
  );
}