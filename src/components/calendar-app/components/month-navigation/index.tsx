import React, {useEffect, useRef} from "react";
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import {createDate, getMonthesNames} from "../../../../utils/helpers/date";
import {Pagination} from "swiper/modules";
import $ from "jquery";
import {capitalizeFirstLetter} from "../../../../utils/helpers/string/capitalizeFirstLetter";

interface MonthNavigationProps {
  locale: string;
  selectedMonth: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
}

export default function MonthNavigation(props: MonthNavigationProps): JSX.Element {
  const swiperMonthsMobileRef = useRef();
  const months = getMonthesNames(props.locale);

  let actualMonths = [];
  for (let i = 0; i < 12; i++) {
    actualMonths.push(((new Date().getMonth()) + (i - 1)) % 12);
  }

  $(document).on("click", ".swiper-slide", function () {
    $(this).addClass("month-selected").siblings().removeClass("month-selected");
    let monthIndex: number | undefined = months.find(item => item.monthShort == $(this).text())?.monthIndex;
    if (typeof (monthIndex) === "number")
      props.setSelectedMonth(monthIndex);
  });

  useEffect(() => {
    if (swiperMonthsMobileRef.current) {
      //@ts-ignore
      swiperMonthsMobileRef.current.on("slideChangeTransitionEnd", function () {
        //@ts-ignore
        props.setSelectedMonth(swiperMonthsMobileRef.current?.activeIndex);
      });
    }

  }, [swiperMonthsMobileRef]);

  useEffect(() => {
    if (swiperMonthsMobileRef.current)
      //@ts-ignore
      swiperMonthsMobileRef.current.slideTo(props.selectedMonth);
  }, [props.selectedMonth]);

  return (
    <>
      <div className="d-none d-lg-block calendar-month-nav w-calendar-month-nav cursor-grab">
        <Swiper
          slidesPerView={7}
          loop={true}
          className="pb-4"
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
        >
          {
            actualMonths.map((item, num) =>
              <SwiperSlide key={num}
                           className={`${props.selectedMonth === item ? "month-selected" : ""} text-muted fw-light fs-calendar-nav hover-effect-up`}>
                <span className="cursor-pointer">
                   {months[item].monthShort}
                </span>
              </SwiperSlide>
            )
          }
        </Swiper>
      </div>
      <div className="d-flex d-lg-none bg-body flex-row justify-content-end w-100" style={{maxHeight: "3rem"}}>
        <div className="col-4">
          <Swiper
            onSwiper={(swiper: any) => {
              swiperMonthsMobileRef.current = swiper;
            }}
            slidesPerView={1}
            spaceBetween={10}
            loop={false}
            direction="vertical"
            speed={1000}
          >
            {
              months.map((item, num) =>
                <SwiperSlide key={num} className="text-start fs-calendar-nav">
                  <span className="cursor-pointer">
                     {capitalizeFirstLetter(item.month)}
                  </span>
                </SwiperSlide>
              )
            }
          </Swiper>
        </div>
        <div className="col-4 text-center fs-calendar-nav">{createDate({locale: props.locale}).dateMonth}</div>
        <div className="col-4 text-end fs-calendar-nav">Фильтр</div>
      </div>
    </>
  );
}