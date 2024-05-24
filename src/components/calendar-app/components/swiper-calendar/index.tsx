import { Swiper, SwiperSlide } from 'swiper/react';
import Calendar from "../calendar";
import {createYear} from "../../../../utils/helpers/date";
import {useWindowDimensions} from "../../../hooks/useWindowDimensions";
import {useSwiperCalendar} from "./hooks/useSwiperCalendar";
import React, {useEffect, useRef} from "react";

interface SwiperCalendarProps {
  setSelectedMonth :  React.Dispatch<React.SetStateAction<number>>;
  selectedMonth : number;
  locale : string;
}

export function SwiperCalendar({locale, selectedMonth, setSelectedMonth} : SwiperCalendarProps) : JSX.Element {
  const { height, width } = useWindowDimensions();
  const {state, functions} = useSwiperCalendar({selectedMonth, setSelectedMonth, width})

  return (
    <>
      <Swiper
        onSwiper={(swiper : any) => {
          state.swiperRef.current = swiper;
        }}
        loop={false}
        spaceBetween={0}
        direction={functions.defineDirection(width)}
        slidesPerView={'auto'}
        speed={2000}
        className="swiper-calendar mt-neg-calendar-swiper position-relative zindex-1"
      >
        {
          createYear({locale:locale}).yearMonthes().map((month, index) =>
            <SwiperSlide key={index}>
              <Calendar className={`calendar-${index}`} month={month} locale={"ru"}/>
            </SwiperSlide>
          )
        }
      </Swiper>
    </>
  )
}