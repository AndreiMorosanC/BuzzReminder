import React, { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import TaskModal from "./TaskModal";
import useTasks from "../../hooks/useTask";
import { useAuth } from "../../context/AuthContext";

const CalendarController = () => {
  const { getTasks } = useTasks();
  const { token } = useAuth();

  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(null);

  const fetchEvents = async () => {
    const tasks = await getTasks();
    setEvents(
      tasks.map((task) => ({
        id: task._id,
        title: task.title,
        start: task.startDate,
        end: task.endDate,
      }))
    );
  };

  useEffect(() => {
    if (token) fetchEvents();
  }, [token]);

  const handleDateClick = (info) => {
   const start = new Date(info.date);
    const end = new Date(start.getTime() + 60 * 60 * 1000); 

    setIsModalOpen({ start, end });
  };

  return (
    <div>
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
      dateClick={handleDateClick}
      height="auto"
    />
      {isModalOpen && (
        <TaskModal
          start={isModalOpen.start}
          end={isModalOpen.end}
          
          onCancel={() => setModalData(null)}
        />
      )}
    </div>
  );
};

export default CalendarController;
