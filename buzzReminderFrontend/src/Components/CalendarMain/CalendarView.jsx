import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction";

const CalendarView = ({handleDateClick,handleEventClick,handleEventDrop,handleEventResize})=> {

    const {events, setEvents} = useState();


  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin ,interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{                      // Barra de encabezado con controles
        left: 'prev,next today',            // Botones de navegación (anterior/siguiente/hoy)
        center: 'title',                    // Título del calendario (mes actual, por ej.)
        right: 'dayGridMonth,timeGridWeek,timeGridDay' // Botones para cambiar vista
      }}
    weekends={true}
      events={events}
      selectable={true}
      editable={true}
      height="auto"
    />
  );
};

export default CalendarView;
