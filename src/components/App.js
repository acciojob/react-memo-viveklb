import React, { useEffect, useMemo, useState } from "react";
import ReactMemo from "./ReactMemo";
import UseMemo from "./UseMemo";
import "../styles/App.css";

function App() {
	const [tasks, setTasks] = useState([]);
	const [counter, setCounter] = useState(0);
	const [taskInput, setTaskInput] = useState("");
	const [inputError, setInputError] = useState("");
	const completedCount = useMemo(
		() => tasks.filter((task) => task.completed).length,
		[tasks]
	);

	useEffect(() => {
		document.title = `Task List${tasks.length ? ` (${tasks.length})` : ""}`;
	}, [tasks.length]);

	function addTask(title) {
		setTasks((currentTasks) => [
			...currentTasks,
			{ id: `${Date.now()}-${Math.random()}`, title, completed: false },
		]);
	}

	function handleCustomTaskSubmit(event) {
		event.preventDefault();
		const title = taskInput.trim();

		if (title.length <= 5) {
			setInputError("Please enter at least 6 characters.");
			return;
		}

		addTask(title);
		setTaskInput("");
		setInputError("");
	}

	function toggleTask(taskId) {
		setTasks((currentTasks) =>
			currentTasks.map((task) =>
				task.id === taskId ? { ...task, completed: !task.completed } : task
			)
		);
	}

	return (
		<main className="app-shell">
			<header className="topbar">
				<a className="wordmark" href="#tasks" aria-label="Daymark home">
					<span className="wordmark-icon" aria-hidden="true">D</span>
					<span>daymark</span>
				</a>
				<span className="topbar-note">A little more focus, every day</span>
			</header>

			<section className="workspace" id="tasks">
				<div className="intro">
					<p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
					<h1>Make room for<br /><span>what matters.</span></h1>
					<p className="intro-copy">One clear list. One step at a time.</p>
				</div>

				<section className="task-panel" aria-labelledby="task-heading">
					<div className="panel-heading">
						<div>
							<p className="section-label">TASKS</p>
							<h2 id="task-heading">Your list</h2>
						</div>
						<UseMemo total={tasks.length} completed={completedCount} />
					</div>

					<div className="task-list" aria-live="polite">
						{tasks.length === 0 ? (
							<p className="empty-state">Nothing on your list yet. Start with one small thing.</p>
						) : (
							tasks.map((task, index) => (
								<ReactMemo
									key={task.id}
									task={task}
									number={String(index + 1).padStart(2, "0")}
									onToggle={toggleTask}
								/>
							))
						)}
					</div>

					<div className="task-actions">
						<button className="button button-secondary" type="button" onClick={() => addTask("New todo")}>
							<span aria-hidden="true">+</span> Add Todo
						</button>
						<span className="action-hint">or write your own below</span>
					</div>

					<form className="custom-task-form" onSubmit={handleCustomTaskSubmit} noValidate>
						<label className="section-label" htmlFor="custom-task">NEW TASK</label>
						<div className="input-row">
							<input
								id="custom-task"
								type="text"
								value={taskInput}
								onChange={(event) => {
									setTaskInput(event.target.value);
									if (inputError) setInputError("");
								}}
								placeholder="e.g. Plan the week ahead"
								aria-describedby={inputError ? "task-error" : undefined}
								aria-invalid={Boolean(inputError)}
							/>
							<button className="button button-primary" type="submit">Add task <span aria-hidden="true">↗</span></button>
						</div>
						{inputError && <p className="input-error" id="task-error" role="alert">{inputError}</p>}
					</form>
				</section>

				<section className="counter-panel" aria-label="Focus counter">
					<div className="counter-copy">
						<span className="counter-mark" aria-hidden="true">✳</span>
						<div>
							<p className="section-label">KEEP YOUR MOMENTUM</p>
							<p className="counter-caption">Every small step counts.</p>
						</div>
					</div>
					<div className="counter-control">
						<output className="counter-value" aria-live="polite">{counter}</output>
						<button className="button button-counter" type="button" onClick={() => setCounter((value) => value + 1)}>
							Increment <span aria-hidden="true">+</span>
						</button>
					</div>
				</section>
				<footer className="page-footer">SHOW UP. START SMALL. KEEP GOING.</footer>
			</section>
		</main>
	);
}

export default App;

