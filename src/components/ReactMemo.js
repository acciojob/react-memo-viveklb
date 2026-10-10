import React from "react";

function TaskItem({ task, number, onToggle }) {
  return (
    <label className={`task-item${task.completed ? " is-complete" : ""}`}>
      <span className="task-number">{number}</span>
      <input
        className="task-checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark ${task.title} ${task.completed ? "incomplete" : "complete"}`}
      />
      <span className="task-title">{task.title}</span>
      <span className="task-checkmark" aria-hidden="true">✓</span>
    </label>
  );
}

export default React.memo(TaskItem);