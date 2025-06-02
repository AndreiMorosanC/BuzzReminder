import React from "react";
import TaskForm from "./TaskForm";
import useTasks  from "../../hooks/useTask";

const CreateTaskModal = ({start, end , oncancel, onTaskCreated})=>{

    const {createTask} = useTasks()

    const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    startDate: start,
    endDate: end,
    });

    const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
        const newTask = await createTask(taskData);
        if(newTask){
            onTaskCreated(newTask)
            oncancel();
        }
    }catch(err){
        console.error("❌ Error al crear tarea:", err.message);
    }
  }
  return(
     <div className="absolute top-10 left-10 bg-white shadow-xl border rounded-lg p-4 z-50 w-72">
      <h2 className="font-semibold text-lg mb-2">Nueva Tarea</h2>
      <TaskForm
        taskData={taskData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Crear"
      />
      <div className="flex justify-end mt-2">
        <button onClick={onCancel} className="text-gray-600 text-sm">
          Cancelar
        </button>
      </div>
    </div>
  )

}



export default CreateTaskModal;