import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import {getMonthesNames} from "../../../../utils/helpers/date";

export default function MonthNavigation(): JSX.Element {

  const months = getMonthesNames("ru");

  let actualMonths = [];
  for (let i = 0; i < 12; i++) {
    actualMonths.push(((new Date().getMonth()) + (i - 1)) % 12);
  }

  return (
    <>
      <div className="d-none d-lg-block w-calendar-month-nav">
        <Swiper
          slidesPerView={7}
          loop={true}
          className="swiper-months"
        >
          {
            actualMonths.map((item, num) =>
              <SwiperSlide key={num} className={`${new Date().getMonth() === item ? "fw-medium" : "text-muted fw-light"} fs-calendar-nav`}>
                {months[item].monthShort}
              </SwiperSlide>
            )
          }
        </Swiper>
      </div>
      <div className="w-100 d-flex d-lg-none flex-row justify-content-between">
        <div className="col text-start fs-calendar-nav">Май</div>
        <div className="col text-center fs-calendar-nav">2 мая</div>
        <div className="col text-end fs-calendar-nav">Фильтр</div>
      </div>
    </>
  );
}