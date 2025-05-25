const API_URL = "http://localhost:3000/api/tasks";

const useTaskAPI = (token) => {
  const createTask = async (taskData) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });

    if (!res.ok) throw new Error("Failed to create task");
    return await res.json();
  };

  const getTasks = async () => {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch tasks");
    return await res.json();
  };

  const updateTask = async (id, updateData) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) throw new Error("Failed to update task");
    return await res.json();
  };

  const deleteTask = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to delete task");
    return await res.json();
  };

  return { createTask, getTasks, updateTask, deleteTask };
};

export default useTaskAPI;
