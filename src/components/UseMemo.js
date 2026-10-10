import React, { useMemo } from "react";

export default function UseMemo({ total, completed }) {
  const remaining = useMemo(() => total - completed, [total, completed]);

  return (
    <p className="task-progress" aria-label={`${remaining} tasks remaining`}>
      <span>{String(remaining).padStart(2, "0")}</span>
      <span className="progress-divider" aria-hidden="true">/</span>
      <span className="progress-total">{String(total).padStart(2, "0")}</span>
      <span className="progress-label">remaining</span>
    </p>
  );
}