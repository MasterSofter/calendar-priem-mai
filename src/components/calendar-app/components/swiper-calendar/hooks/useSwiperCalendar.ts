import React, {useEffect, useRef} from "react";
import Swiper from "swiper";

interface SwiperCalendarParams {
  swiperMobileMonthsRef : React.MutableRefObject<typeof Swiper>;
  width : number;
  height : number;
}

export function useSwiperCalendar({swiperMobileMonthsRef,  width, height} : SwiperCalendarParams){
  const defineDirection = (width : number) : ("horizontal" | "vertical") => width < 990 ? "vertical" : "horizontal";
  const defineSpeed = (width : number) : number => width < 992 ? 250 : 2000;

  const swiperRef = useRef<typeof Swiper>();

  useEffect(() => {
    if(swiperRef.current)
    {
      swiperRef.current.allowTouchMove = false;
      swiperRef.current.on('slideChangeTransitionEnd', function () {
        swiperMobileMonthsRef.current.slideTo(swiperRef.current.activeIndex);
      });
      swiperRef.current.slideTo(new Date().getMonth());
      swiperMobileMonthsRef.current.slideTo(swiperRef.current.activeIndex);
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