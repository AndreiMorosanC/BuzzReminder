import React from "react";
import DeleteTaskButton from "./SubComponets/DeleteTaskButton";
const TaskForm = ({ taskData, onChange, onSubmit, submitLabel }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={taskData.title}
        onChange={onChange}
        placeholder="Título"
        className="w-full border px-2 py-1 rounded"
        required
      />

      <textarea
        name="description"
        value={taskData.description}
        onChange={onChange}
        placeholder="Descripción"
        className="w-full border px-2 py-1 rounded"
        rows={3}
      />
      <div className="mb-2">
        <label className="block text-sm text-gray-700">
          Recordatorio (min antes)
        </label>
        <select
          name="reminderOffsetMinutes"
          value={taskData.reminderOffsetMinutes}
          onChange={onChange}
          className="w-full border rounded px-2 py-1 text-sm"
        >
          <option value={10}>10</option>
          <option value={30}>30</option>
          <option value={60}>60</option>
          <option value={120}>120</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
