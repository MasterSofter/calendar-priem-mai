import { Swiper, SwiperSlide } from 'swiper/react';
import Calendar from "../calendar";
import {createYear} from "../../../../utils/helpers/date";
import {useEffect, useRef} from "react";
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

interface SwiperCalendarProps {
  selectedMonth : number;
}

export function SwiperCalendar(props : SwiperCalendarProps) : JSX.Element {
  const swiperRef = useRef();

  useEffect(() => {
    if(swiperRef.current)
      //@ts-ignore
      swiperRef.current.slideTo(props.selectedMonth);
  }, [props.selectedMonth]);

  return (
    <Swiper
      onSwiper={(swiper : any) => {
        swiperRef.current = swiper;
      }}
      allowTouchMove={false}
      className="swiper-calendar"
    >
      {
        createYear().yearMonthes().map((month, index) =>
          <SwiperSlide key={index}>
            <Calendar month={month} locale={"ru"}/>
          </SwiperSlide>
        )
      }
    </Swiper>
  )
}