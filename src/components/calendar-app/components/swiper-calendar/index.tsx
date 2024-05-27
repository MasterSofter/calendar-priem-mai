import { Swiper, SwiperSlide } from 'swiper/react';
import Calendar from "../calendar";
import {createYear} from "../../../../utils/helpers/date";
import {useWindowDimensions} from "../../../hooks/useWindowDimensions";
import {useSwiperCalendar} from "./hooks/useSwiperCalendar";
import React from "react";
import {ICalendarDay} from "../../index";

interface SwiperCalendarProps {
  selectedDate : Date;
  setShowEvents:  React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDate :  React.Dispatch<React.SetStateAction<Date>>;
  setSelectedMonth :  React.Dispatch<React.SetStateAction<number>>;
  selectedMonth : number;
  calendarData: Array<ICalendarDay> | undefined;
  filter: object | undefined;
  locale : string;
}

export function SwiperCalendar({calendarData, setShowEvents, filter, selectedDate, setSelectedDate, locale, selectedMonth, setSelectedMonth} : SwiperCalendarProps) : JSX.Element {
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
              <Calendar setShowEvents={setShowEvents} calendarData={calendarData} filter={filter}  selectedDate={selectedDate} setSelectedDate={setSelectedDate} className={`calendar-${index}`} month={month} locale={"ru"}/>
            </SwiperSlide>
          )
        }
      </Swiper>
    </>
  )
}