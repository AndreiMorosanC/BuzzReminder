import { useAuth } from "../context/AuthContext";

const useTasks = () => {
  const BASE_URL = "http://localhost:3001/api/tasks";
  const { token } = useAuth();

  const getTasks = async () => {
    try {
      const res = await fetch(BASE_URL, {
        method: "GET",
        headers: {
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

      if (!res.ok) throw new Error("No se pudo crear la tarea");
      return await res.json();
    } catch (err) {
      console.error("❌ Error al crear tarea:", err.message);
      return null;
    }
  };

  return { getTasks, createTask };
};

export default useTasks;
