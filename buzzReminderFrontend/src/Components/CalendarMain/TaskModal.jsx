import React, { useState } from "react";
import TaskForm from "./TaskForm";
import useTasks from "../../hooks/useTask";
import { useAuth } from "../../context/AuthContext";
import DeleteTaskButton from "./SubComponets/DeleteTaskButton";
const TaskModal = ({
  start,
  end,
  taskToEdit,
  onCancel,
  onTaskCreated,
  onTaskEdited,
  onTaskDeleted,
}) => {
  const { user } = useAuth();

  const { createTask, editTask } = useTasks();
  const isEditing = !!taskToEdit;
  const [formTask, setFormTask] = useState({
    id: taskToEdit?.id || taskToEdit?._id || "",
    title: taskToEdit?.title || "",
    description: taskToEdit?.description || "",
    startDate: taskToEdit?.startDate || start,
    endDate: taskToEdit?.endDate || end,
    email: user?.email || "",
    reminderOffsetMinutes: taskToEdit?.reminderOffsetMinutes || 60,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormTask({
      ...formTask,
      [name]: name === "reminderOffsetMinutes" ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      id: formTask.id,
      title: formTask.title,
      description: formTask.description,
      startDate: formTask.startDate,
      endDate: formTask.endDate,
      reminderOffsetMinutes: formTask.reminderOffsetMinutes,
      email: formTask.email,
    };

    if (isEditing) {
      const updated = await editTask(taskData.id, taskData);
      if (updated) onTaskEdited(updated);
    } else {
      const created = await createTask(taskData);
      if (created) onTaskCreated(created);
    }

    onCancel();
  };

  return (
    <div className="absolute top-10 left-10 bg-white shadow-xl border rounded-lg p-4 z-50 w-72">
      <h2 className="font-semibold text-lg mb-2">
        {isEditing ? "Editar Tarea" : "Nueva Tarea"}
      </h2>
      <TaskForm
        taskData={formTask}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel={isEditing ? "Guardar Cambios" : "Crear"}
      />
      <div className="flex justify-end mt-2">
        <button onClick={onCancel} className="text-gray-600 text-sm">
          Cancelar
        </button>
        {isEditing && (
          <DeleteTaskButton
            taskId={formTask.id}
            onDeleted={(id) => {
              onTaskDeleted(id); // ⬅️ actualiza el calendario
              onCancel(); // ⬅️ cierra el modal
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TaskModal;
