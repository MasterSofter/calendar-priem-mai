import React, {useEffect, useRef} from "react";

interface SwiperCalendarParams {
  setSelectedMonth :  React.Dispatch<React.SetStateAction<number>>
  selectedMonth : number;
  width : number;
  height : number;
}

export function useSwiperCalendar({selectedMonth, setSelectedMonth,  width, height} : SwiperCalendarParams){
  const defineDirection = (width : number) : ("horizontal" | "vertical") => width < 990 ? "vertical" : "horizontal";
  const defineAllowTouchMove = (width : number) : boolean => width < 990;
  const defineSpeed = (width : number) : number => width < 990 ? 800 : 2000;

  const swiperRef = useRef();

  useEffect(() => {
    if(swiperRef.current)
    {
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
  }, [height, width]);

  // useEffect(()=> {
  //   //@ts-ignore
  //   document.querySelector(".swiper-calendar").style.maxHeight = "100vh";
  //   if(window.innerWidth < 990){
  //     //@ts-ignore
  //     //document.querySelector(".swiper-calendar").style.maxHeight = `${(window.innerHeight/100 * 76 + $("#calendar-nav").height() - 3.4 * (window.innerWidth/100))}px`;
  //   }
  // }, [width])

  return {
    state: {
      swiperRef
    },
    functions: {
      defineDirection,
      defineAllowTouchMove,
      defineSpeed
    }
  };
}