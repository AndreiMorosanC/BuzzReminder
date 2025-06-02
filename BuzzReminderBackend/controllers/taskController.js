import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      reminderOffsetMinutes,
    } = req.body;
    const uid = req.user?.uid;
    const email = req.user?.email;

    if (!title || !startDate || !endDate || !uid || !email) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const newTask = new Task({
      title,
      description,
      startDate,
      endDate,
      user: uid,
      email,
      reminderOffsetMinutes,
    });
    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error("❌ Error creando tarea:", error.message || error);
  res.status(500).json({ error: error.message || "error creating task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({
      _id: id,
      user: req.user.uid,
    });

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task deleted", task });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const uid = req.user?.uid;

    if (!uid) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const tasks = await Task.find({ user: uid }); // ✅ 'tasks', no 'task'
    res.status(200).json(tasks);
  } catch (error) {
    console.error("❌ Error al obtener tareas:", error.message);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, startDate, endDate,reminderOffsetMinutes } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user.uid },
      { title, description, startDate, endDate,reminderOffsetMinutes  },
      { new: true }
    );

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json(task);
  } catch (err) {
    console.error("❌ Error en updateTask:", err);
    res.status(500).json({ error: "Error updating task" });
  }
};
