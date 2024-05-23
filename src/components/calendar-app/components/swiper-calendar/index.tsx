import { Swiper, SwiperSlide } from 'swiper/react';
import Calendar from "../calendar";
import {createYear} from "../../../../utils/helpers/date";
import {useWindowDimensions} from "../../../hooks/useWindowDimensions";
import {useSwiperCalendar} from "./hooks/useSwiperCalendar";
import {useEffect} from "react";

interface SwiperCalendarProps {
  selectedMonth : number;
}

export function SwiperCalendar({selectedMonth} : SwiperCalendarProps) : JSX.Element {
  const { height, width } = useWindowDimensions();
  const {state, functions} = useSwiperCalendar({selectedMonth, width})

  return (
    <>
      <Swiper
        onSwiper={(swiper : any) => {
          state.swiperRef.current = swiper;
        }}
        loop={true}
        spaceBetween={40}
        direction={functions.defineDirection(width)}
        slidesPerView={'auto'}
        speed={2000}
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
    </>
  )
}