import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar-custom.css"; // estilos personalizados

export default function Menu() {
  const [date, setDate] = useState(new Date());

  const today = new Date();
  const formattedToday = today.toLocaleDateString("en-GB");

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
        <p className="text-white">   {formattedToday}</p>
      </div>
      <hr className="border-t border-white w-full my-4 mt-4" />
      <div>
        
      </div>
    </div>
  );
}
