import { useMemo, useState } from "react";
import { format } from "date-fns";

import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import Card from "../common/Card";
import Button from "../common/Button";
import ConsistencyCell from "../common/ConsistencyCell";

import consistencyData from "../../config/consistencyData";
import generateHeatMap from "../../utils/generateHeatMap";


const weekLabels=[
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];


function ConsistencyCalendar(){


const CELL_SIZE=9;
const GAP=9;

const COLUMN_WIDTH=CELL_SIZE+GAP;


const currentYear=new Date().getFullYear();

const [year,setYear]=useState(currentYear);



const heatMap=useMemo(()=>{

 return generateHeatMap(
  consistencyData,
  year
 );

},[year]);





const monthLabels=useMemo(()=>{


const labels=[];

let lastMonth=null;



heatMap.forEach((week,index)=>{


const firstDay=week.find(Boolean);


if(!firstDay)
 return;



if(firstDay.month!==lastMonth){


labels.push({

month:firstDay.month,

index

});


lastMonth=firstDay.month;


}


});



return labels;


},[heatMap]);






return (

<Card

title="📅 Consistency Calendar"

subtitle="Track your long-term habit consistency"


action={

<div className="flex gap-3 items-center">


<Button

variant="secondary"

className="w-10 h-10 p-0 "

onClick={()=>setYear(y=>y-1)}

>

<FaChevronLeft/>

</Button>



<span className="
text-white
font-semibold
w-16
text-center
">

{year}

</span>



<Button

variant="secondary"

className="w-10 h-10 p-0"

disabled={year===currentYear}

onClick={()=>setYear(y=>y+1)}

>

<FaChevronRight/>

</Button>


</div>


}

>



{/* Month Labels */}


<div
  className="relative h-5 mb-3 w-full"
  style={{
    marginLeft: "38px",
  }}
>
  {monthLabels.map((month) => (
    <span
      key={month.index}
      className="
        absolute
        text-[11px]
        text-slate-500
        font-medium
        whitespace-nowrap
      "
      style={{
        left: `${(month.index / heatMap.length) * 100}%`,
      }}
    >
      {format(
        new Date(
          year,
          month.month,
          1
        ),
        "MMM"
      )}
    </span>
  ))}
</div>







<div className="flex gap-4">


{/* Days */}


<div

className="
flex
flex-col
text-[11px]
text-slate-500
"

style={{

gap:`${GAP}px`

}}

>


{

weekLabels.map(day=>(

<div

key={day}

className="h-3 flex items-center"

>

{day}

</div>

))

}


</div>









{/* Grid */}


<div

className="
overflow-hidden
max-w-full
"

>


<div

className="flex"

style={{

gap:`${GAP}px`

}}

>


{

heatMap.map((week,i)=>(


<div

key={i}

className="flex flex-col"

style={{

gap:`${GAP}px`

}}

>


{

week.map((day,j)=>(


<ConsistencyCell

key={j}

day={day}

/>


))

}


</div>


))


}



</div>


</div>



</div>





</Card>


)

}


export default ConsistencyCalendar;