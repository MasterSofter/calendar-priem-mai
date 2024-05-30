import { Swiper, SwiperSlide } from 'swiper/react';
import Calendar from "../calendar";
import {createMonth, createYear} from "../../../../utils/helpers/date";
import {useWindowDimensions} from "../../../hooks/useWindowDimensions";
import {useSwiperCalendar} from "./hooks/useSwiperCalendar";
import React from "react";
import {ICalendarDay} from "../../index";
import {IFilter} from "../../../filter";

interface SwiperCalendarProps {
  selectedDate : Date;
  setShowEvents:  React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDate :  React.Dispatch<React.SetStateAction<Date>>;
  setSelectedMonth :  React.Dispatch<React.SetStateAction<number>>;
  selectedMonth : number;
  calendarData: Array<ICalendarDay> | undefined;
  filter: IFilter;
  locale : string;
}

export function SwiperCalendar({calendarData, setShowEvents, filter, selectedDate, setSelectedDate, locale, selectedMonth, setSelectedMonth} : SwiperCalendarProps) : JSX.Element {
  const { height, width } = useWindowDimensions();
  const {state, functions} = useSwiperCalendar({selectedMonth, setSelectedMonth, width, height})

  return (
    <>
      <Swiper
        onSwiper={(swiper : any) => {
          state.swiperRef.current = swiper;
        }}
        loop={false}
        spaceBetween={0}
        direction={'vertical'}
        slidesPerView={'auto'}
        speed={2000}
        className="disable-carousel swiper-calendar mt-neg-calendar-swiper position-relative zindex-1"
      >
        {
          createYear({locale:locale}).yearMonthes().map((month, index) =>
            <SwiperSlide key={index}>
              <Calendar setShowEvents={setShowEvents} calendarData={calendarData} filter={filter} selectedDate={selectedDate} setSelectedDate={setSelectedDate} className={`w-100 calendar-${index}`} month={month} locale={"ru"}/>
            </SwiperSlide>
          )
        }
        <SwiperSlide key="end-month">
          <Calendar setShowEvents={setShowEvents} calendarData={undefined} filter={filter} selectedDate={selectedDate} setSelectedDate={setSelectedDate} className={`w-100 calendar-end`} month={createMonth({date: new Date(new Date().getFullYear() + 1, 0), locale: locale})} locale={"ru"}/>
        </SwiperSlide>
      </Swiper>
    </>
  )
}