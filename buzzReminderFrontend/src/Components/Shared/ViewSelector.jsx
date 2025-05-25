import React from "react";


const views = [
  { id: 'dayGridMonth', label: 'Month' },
  { id: 'timeGridWeek', label: 'Week' },
  { id: 'timeGridDay', label: 'Day' },
];


const ViewSelector = ({ currentView, onChangeView }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {views.map((view) => (
        <button
          key={view.id}
          onClick={() => onChangeView(view.id)}
          style={{
            marginRight: '0.5rem',
            fontWeight: currentView === view.id ? 'bold' : 'normal',
          }}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
};

export default ViewSelector;