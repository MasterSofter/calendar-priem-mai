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
      <div className="w-calendar-month-nav">
        <Swiper
          loop={true}
          breakpoints={{
            // when window width is >= 640px
            0: {
              slidesPerView: 3
            },
            // when window width is >= 768px
            990: {
              slidesPerView: 7,
            },
          }}
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
    </>
  );
}