import {
  eachDayOfInterval,
  endOfYear,
  format,
  startOfYear,
} from "date-fns";


export default function generateHeatMap(records, year) {

  const firstDay = startOfYear(
    new Date(year, 0, 1)
  );

  const lastDay = endOfYear(firstDay);


  const allDays = eachDayOfInterval({
    start:firstDay,
    end:lastDay,
  });



  const recordMap = {};

  records.forEach(record=>{
    recordMap[record.date] = record;
  });



  const weeks=[];

  let currentWeek=[];



  // Monday start
  const firstWeekday =
    (firstDay.getDay()+6)%7;



  for(let i=0;i<firstWeekday;i++){
    currentWeek.push(null);
  }



  allDays.forEach(day=>{


    const key = format(
      day,
      "yyyy-MM-dd"
    );


    const record = recordMap[key];



    currentWeek.push({

      date:key,

      month:day.getMonth(),

      completion:
        record?.completion ?? null,


      completedHabits:
        record?.completedHabits ?? 0,


      totalHabits:
        record?.totalHabits ?? 8,


    });



    if(currentWeek.length===7){

      weeks.push(currentWeek);

      currentWeek=[];

    }


  });



  while(
    currentWeek.length>0 &&
    currentWeek.length<7
  ){

    currentWeek.push(null);

  }



  if(currentWeek.length){

    weeks.push(currentWeek);

  }



  return weeks;

}