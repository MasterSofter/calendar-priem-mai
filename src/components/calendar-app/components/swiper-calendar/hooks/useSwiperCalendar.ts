import React, {useEffect, useRef, useState} from "react";
import $ from "jquery";

interface SwiperCalendarParams {
  setSelectedMonth :  React.Dispatch<React.SetStateAction<number>>
  selectedMonth : number;
  width : number;
}

export function useSwiperCalendar({selectedMonth, setSelectedMonth,  width} : SwiperCalendarParams){
  const defineDirection = (width : number) : ("horizontal" | "vertical") => width < 990 ? "vertical" : "horizontal";
  const defineAllowTouchMove = (width : number) : boolean => width < 990;

  const swiperRef = useRef();
  useEffect(() => {
    if(swiperRef.current)
    {
      //@ts-ignore
      swiperRef.current.on('slideChangeTransitionEnd', function () {
        //@ts-ignore
        setSelectedMonth(swiperRef.current?.activeIndex);
      });
    }

  }, [swiperRef]);

  useEffect(() => {
    if(swiperRef.current)
      //@ts-ignore
      swiperRef.current.slideTo(selectedMonth);
  }, [selectedMonth]);

  useEffect(() => {
    if(swiperRef.current){
      //@ts-ignore
      swiperRef.current.allowTouchMove = defineAllowTouchMove(width);
    }
  }, [width]);

  return {
    state: {
      swiperRef
    },
    functions: {
      defineDirection,
      defineAllowTouchMove
    }
  };
}