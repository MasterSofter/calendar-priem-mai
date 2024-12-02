import { Swiper, SwiperSlide } from 'swiper/react';
import {MemoizedCalendar} from "../calendar";
import {createMonth, createYear} from "../../../../utils/helpers/date";
import {useWindowDimensions} from "../../../hooks/useWindowDimensions";
import {useSwiperCalendar} from "./hooks/useSwiperCalendar";
import {ICalendarDay} from "../../index";
import {IFilter} from "../../../filter";
import {useEffect} from "react";

interface SwiperCalendarProps {
  swiperCalendarRef :  React.MutableRefObject<any>;
  selectedYear : number;
  selectedDate : Date;
  setShowEvents:  React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDate :  React.Dispatch<React.SetStateAction<Date>>;
  calendarData: Array<ICalendarDay>;
  filter: IFilter;
  locale : string;
}

export function SwiperCalendar({selectedYear, swiperCalendarRef, calendarData, setShowEvents, filter, selectedDate, setSelectedDate, locale} : SwiperCalendarProps) : JSX.Element {
  const { height, width } = useWindowDimensions();
  const {state, functions} = useSwiperCalendar({selectedYear, width, height})

  return (
    <div>
      <Swiper
        onSwiper={(swiper : any) => {
          state.swiperRef.current = swiper;
          swiperCalendarRef.current = swiper;
        }}
        loop={false}
        spaceBetween={0}
        direction={functions.defineDirection(width)}
        slidesPerView={'auto'}
        speed={functions.defineSpeed(width)}
        className="disable-carousel swiper-calendar mt-neg-calendar-swiper position-relative zindex-1 d-none d-lg-block"
      >
        {
          createYear({year: selectedYear, locale:locale}).yearMonthes().map((month, index) =>
            <SwiperSlide key={index}>
              <MemoizedCalendar selectedYear={selectedYear} id={`month-${index}`} setShowEvents={setShowEvents} calendarData={calendarData} filter={filter} selectedDate={selectedDate} setSelectedDate={setSelectedDate} className={`w-100 calendar-${index}`} month={month} locale={"ru"}/>
            </SwiperSlide>
          )
        }
        <SwiperSlide key="end-month">
          <MemoizedCalendar selectedYear={selectedYear} id={`month-end-month`} setShowEvents={setShowEvents} calendarData={calendarData} filter={filter} selectedDate={selectedDate} setSelectedDate={setSelectedDate} className={`w-100 calendar-end`} month={createMonth({date: new Date(new Date().getFullYear() + 1, 0), locale: locale})} locale={"ru"}/>
        </SwiperSlide>
      </Swiper>
      <div id="calendar-mobile" className="overflow-x-hidden overflow-y-scroll d-flex flex-column d-lg-none mt-neg-calendar-swiper" style={{height: "100dvh"}}>
        {
          createYear({year: selectedYear, locale:locale}).yearMonthes().map((month, index) =>
            <MemoizedCalendar selectedYear={selectedYear} id={`mobile-month-${index}`} key={index} setShowEvents={setShowEvents} calendarData={calendarData} filter={filter} selectedDate={selectedDate} setSelectedDate={setSelectedDate} className={`w-100 calendar-${index}`} month={month} locale={"ru"}/>
          )
        }
        <MemoizedCalendar selectedYear={selectedYear} id={`month-end-month`} setShowEvents={setShowEvents} calendarData={calendarData} filter={filter} selectedDate={selectedDate} setSelectedDate={setSelectedDate} className={`w-100 calendar-end`} month={createMonth({date: new Date(new Date().getFullYear() + 1, 0), locale: locale})} locale={"ru"}/>
      </div>
    </div>
  )
}