import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

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
        id: task._id || task.id,
        title: task.title,
        start: task.startDate,
        end: task.endDate,
        extendedProps: {
          description: task.description || "",
          reminderOffsetMinutes: task.reminderOffsetMinutes || 60,
        },
      }))
    );
  };

  useEffect(() => {
    if (token) fetchEvents();
  }, [token]);

  const handleEventClick = (info) => {
    
    const task = {
      ...info.event.extendedProps,
      title: info.event.title,
      startDate: info.event.start,
      endDate: info.event.end,
      id: info.event.id,
    };

    if (!task) {
      console.error(
        "⚠️ Tarea no encontrada para el evento con ID:",
        info.event.id
      );
      return;
    }
    setIsModalOpen({
      mode: "edit",
      start: new Date(task.startDate),
      end: new Date(task.endDate),
      taskToEdit: task,
    });
  };

  const handleDateClick = (info) => {
    setIsModalOpen({
      mode: "create",
      start: info.date,
      end: new Date(info.date.getTime() + 60 * 60 * 1000),
    });
  };

  const formatTask = (task) => ({
    id: task._id,
    title: task.title,
    start: task.startDate,
    end: task.endDate,
    extendedProps: {
      description: task.description || "",
      reminderOffsetMinutes: task.reminderOffsetMinutes || 60,
    },
  });

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          // Barra de encabezado con controles
          left: "prev,next today", // Botones de navegación (anterior/siguiente/hoy)
          center: "title", // Título del calendario (mes actual, por ej.)
          right: "dayGridMonth,timeGridWeek,timeGridDay", // Botones para cambiar vista
        }}
        weekends={true}
        events={events}
        selectable={true}
        editable={true}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
      />
      {isModalOpen && (
        <TaskModal
          start={isModalOpen.start}
          end={isModalOpen.end}
          taskToEdit={isModalOpen.taskToEdit}
          onCancel={() => setIsModalOpen(null)}
          onTaskCreated={(task) =>
            setEvents((prev) => [...prev, formatTask(task)])
          }
          onTaskEdited={(updatedTask) =>
            setEvents((prev) =>
              prev.map((e) =>
                e.id === updatedTask._id ? formatTask(updatedTask) : e
              )
            )
          }
          onTaskDeleted={(deletedId) =>
            setEvents((prev) => prev.filter((e) => e.id !== deletedId))
          }
        />
      )}
    </div>
  );
};

export default CalendarController;
