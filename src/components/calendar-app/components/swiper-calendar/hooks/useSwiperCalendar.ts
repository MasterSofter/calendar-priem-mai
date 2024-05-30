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
      console.log("Отрисовка", selectedMonth)
      //@ts-ignore
      swiperRef.current.slideTo(selectedMonth);
    }
  }, [selectedMonth]);

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
    if(swiperRef.current){
      //@ts-ignore
      swiperRef.current.allowTouchMove = defineAllowTouchMove(width);
    }
  }, [width]);

  useEffect(()=> {
    if(window.innerWidth < 990){
      //@ts-ignore
      document.querySelector(".swiper-calendar").style.maxHeight = `${window.innerHeight - $("#calendar-nav").height() + 3.4 * (window.innerWidth/100)}px`;
    }
    if(window.innerWidth < 767){
      //@ts-ignore
      document.querySelector(".swiper-calendar").style.maxHeight = `${window.innerHeight - $("#calendar-nav").height() + 3.4 * (window.innerWidth/100)}px`;
    }
  })

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