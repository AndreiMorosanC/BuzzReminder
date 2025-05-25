import Task from "../models/Task.js";


export const createTask = async (req, res) =>{
    try{
        const {title, description, startDate, endDate} = req.blody

        const task = new Task({
            title,
            description,
            startDate,
            endDate,
            user: req.user.uid,
        });
        await task.save()

        res.status(201).json(task);
    }catch (err){
        res.status(500).json({error:"error creating task"});
    }
}

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({
      _id: id,
      user: req.user.uid
    });

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.json({ message: 'Task deleted', task });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.uid });
    res.json(tasks); // ✅ JSON real
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};



export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user.uid },
      { startDate, endDate },
      { new: true }
    );

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Error updating task' });
  }
};



