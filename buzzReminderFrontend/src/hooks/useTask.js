import { useAuth } from "../context/AuthContext";

const useTasks = () => {
  const BASE_URL = "http://localhost:3001/api/tasks";
  const { token } = useAuth();

  const getTasks = async () => {
    try {
      const res = await fetch(BASE_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("No se pudieron obtener las tareas");
      return await res.json();
    } catch (err) {
      console.error("❌ Error al obtener tareas:", err.message);
      return [];
    }
  };

  const createTask = async (task) => {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "No se pudo crear la tarea");
      return data;
      if (!res.ok) throw new Error("No se pudo crear la tarea");
      return await res.json();
    } catch (err) {
      console.error("❌ Error al crear tarea:", err.message);
      return null;
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("can't delete the task");
      return true;
    } catch (err) {
      console.error("❌ Error al eliminar tarea:", err.message);
      return false;
    }
  };

  const editTask = async (id, updatedTask) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (!res.ok) throw new Error("No se pudo actualizar la tarea");
      return await res.json();
    } catch (err) {
      console.error("❌ Error al editar tarea:", err.message);
      return null;
    }
  };

  return { getTasks, createTask, deleteTask, editTask };
};

export default useTasks;
