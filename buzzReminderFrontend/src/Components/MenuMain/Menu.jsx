import React, { useState,useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar-custom.css"; // estilos personalizados
import dayjs from "dayjs";
import useTasks from "../../hooks/useTask";

export default function Menu() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]); // estado para guardar tareas
  const { getTasks } = useTasks(); 
  const today = dayjs(); // fecha y hora actual
 const todayStr = dayjs().format("YYYY-MM-DD");

const eventsToday = tasks.filter(task =>
  dayjs(task.start).format("YYYY-MM-DD") === todayStr
);


 

  useEffect(() => {
    const fetchData = async () => {
      const allTasks = await getTasks();
      setTasks(allTasks);
    };
    fetchData();
  }, []);

  const formattedToday = today.format("DD/MM/YYYY");


  return (
    <div className="p-2 bg-blue-600 h-230">
      <div>
        <Calendar
          onChange={setDate}
          value={date}
          className="bg-blue-600 text-white  border-0 w-full"
          tileClassName={({ date, view }) => {
            // día actual resaltado
            if (
              date.getDate() === new Date().getDate() &&
              date.getMonth() === new Date().getMonth()
            ) {
              return "bg-yellow-300 text-black rounded-full";
            }
          }}
        />
      </div>
      <hr className="border-t border-white w-full my-4 mt-7" />
      <div className="flex flex-row">
        <p className="font-bold uppercase text-white mr-2">Today</p>
        <p className="text-white"> {formattedToday}</p>
      </div>
      <hr className="border-t border-white w-full my-4 mt-4" />
      <div>
        <div>
          

          {eventsToday.length === 0 && <p>No events today</p>}

          {eventsToday.map((event) => (
            <div key={event._id}>
              <p className="text-xs">
                {dayjs(event.start).format("HH:mm")} -{" "}
                {dayjs(event.end).format("HH:mm")}
              </p>
              <p className="font-semibold">{event.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
