import {ICalendarDay} from "../../../components/calendar-app";

export function compareByTime(a : ICalendarDay, b: ICalendarDay) : number {
  try {
    let timeStart1 = a.timeStart?.replaceAll(" ", "");
    let timeStart2 = b.timeStart?.replaceAll(" ", "");

    let [hours_1, minutes_1] : Array<string> = timeStart1 ? timeStart1.split(':') : ["", ""];
    let [hours_2, minutes_2] : Array<string> = timeStart2 ? timeStart2.split(':') : ["", ""];

    if(hours_1 === "" || hours_2 === "") return 0;

    if(Number(hours_1) < Number(hours_2)) return -1;
    else if(Number(hours_1) > Number(hours_2)) return 1;
    else {
      if(Number(minutes_1) < Number(minutes_2)) return -1;
      else if(Number(minutes_1) > Number(minutes_2)) return 1;
      else return 0;
    }
  }
  catch (e){
    return 0;
  }
}