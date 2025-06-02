import React from "react";
import useTasks from "../../../hooks/useTask";

const DeleteTaskButton = ({ taskId, onDeleted }) => {
  const { deleteTask } = useTasks();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "¿Seguro que quieres eliminar esta tarea?"
    );
    if (!confirmed) return;

    const success = await deleteTask(taskId);
    if (success) {
      onDeleted(taskId);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-3 py-1 rounded text-sm mt-2"
    >
      Eliminar
    </button>
  );
};

export default DeleteTaskButton;
