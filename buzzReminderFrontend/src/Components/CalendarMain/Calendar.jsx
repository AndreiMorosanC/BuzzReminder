import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarController from "./CalendarController";


const calendar = ()=>{





  return(
    <div className="w-[100%] ">
      <CalendarController/>

    </div>
  )
}

export default calendar;