{
  /*import React, { useState } from "react";
import useTasks from "../../hooks/useTask";

const TaskModal = ({ isOpen, onClose, date, refreshTasks }) => {
  const { createTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDate = new Date(date);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    const newTask = {
      title,
      description,
      startDate,
      endDate,
    };
    const result = await createTask(newTask);

    if (result) {
      await refreshTasks();
      onClose();
      setTitle("");
      setDescription("");
    }
  };
  if(!isOpen) return null


  return(
    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded shadow-md z-50 w-[90%] max-w-md">
      <h2 className="text-lg font-semibold mb-4">Nueva tarea</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border px-3 py-2 rounded"
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-3 py-2 rounded resize-none"
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  )


};



export default TaskModal;*/
}

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function TaskModal({ start, end, onCancel }) {
  const { user, token, loading } = useAuth();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dataStart: start,
    dataEnd: end,
  });

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!token) return;

    try {
      const res = await fetch("/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTask.title,
          start: newTask.dataStart,
          end: newTask.dataEnd,
          allDay: false,
          extendedProps: {
            description: newTask.description,
          },
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error HTTP ${res.status}: ${text}`);
      }

      const savedEvent = await res.json();

      // OPCIONAL: notificar al componente padre que se creó el evento
      // onSubmit(savedEvent)

      onCancel(); // Cerrar modal
    } catch (err) {
      console.error("Error creando tarea:", err);
    }
  };

  return (
    <div className="absolute top-10 left-10 bg-white shadow-xl border rounded-lg p-4 z-50 w-72">
      <h2 className="font-semibold text-lg mb-2">Nueva Tarea</h2>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          name="title"
          value={newTask.title}
          placeholder="Título"
          className="w-full border px-2 py-1 mb-2 rounded"
          onChange={handleChange}
        />
        <textarea
          placeholder="Descripción"
          name="description"
          className="w-full border px-2 py-1 mb-2 rounded"
          rows={3}
          value={newTask.description}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          Crear
        </button>
      </form>
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="text-gray-600 text-sm">
          Cancelar
        </button>
      </div>
    </div>
  );
}
