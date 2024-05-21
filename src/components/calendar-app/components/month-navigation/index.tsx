import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import {getMonthesNames} from "../../../../utils/helpers/date";
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import $ from "jquery";

interface MonthNavigationProps{
  locale : string;
  selectedMonth : number;
  setSelectedMonth : React.Dispatch<React.SetStateAction<number>>;
}

export default function MonthNavigation(props : MonthNavigationProps): JSX.Element {

  const months = getMonthesNames(props.locale);

  let actualMonths = [];
  for (let i = 0; i < 12; i++) {
    actualMonths.push(((new Date().getMonth()) + (i - 1)) % 12);
  }

  $(document).on("click", ".swiper-slide", function (){
    $(this).addClass("month-selected").siblings().removeClass("month-selected");
    let monthIndex : number | undefined = months.find(item => item.monthShort == $(this).text())?.monthIndex;
    if( typeof(monthIndex) === "number")
      props.setSelectedMonth(monthIndex)
  })

  return (
    <>
      <div className="d-none d-lg-block calendar-month-nav w-calendar-month-nav cursor-grab">
        <Swiper
          slidesPerView={7}
          loop={true}
          className="w-100 pb-4 swiper-months"
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
        >
          {
            actualMonths.map((item, num) =>
              <SwiperSlide key={num} className={`${props.selectedMonth === item ? "month-selected" : ""} text-muted fw-light fs-calendar-nav hover-effect-up`}>
                <span className="cursor-pointer">
                   {months[item].monthShort}
                </span>
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