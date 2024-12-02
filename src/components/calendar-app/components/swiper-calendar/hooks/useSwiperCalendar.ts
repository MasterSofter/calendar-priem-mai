import React, {useEffect, useRef} from "react";
import Swiper from "swiper";
import {getMonthesNames} from "../../../../../utils/helpers/date";

interface SwiperCalendarParams {
  selectedYear : number;
  width : number;
  height : number;
}

export function useSwiperCalendar({selectedYear,  width, height} : SwiperCalendarParams){
  const defineDirection = (width : number) : ("horizontal" | "vertical") => width < 990 ? "vertical" : "horizontal";
  const defineSpeed = (width : number) : number => width < 992 ? 250 : 2000;

  const swiperRef = useRef<typeof Swiper>();

  useEffect(() => {
    if(swiperRef.current)
    {
      swiperRef.current.allowTouchMove = false;
      swiperRef.current.slideTo(new Date().getMonth());
      console.log("hello");
      swiperRef.current.on('slideChangeTransitionEnd', function () {
        console.log("hello");
      });
    }
  }, [swiperRef]);

  return {
    state: {
      swiperRef
    },
    functions: {
      defineDirection,
      defineSpeed
    }
  };
}