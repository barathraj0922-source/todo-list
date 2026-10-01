import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("todoTasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      "todoTasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setTask("");
  };

  const deleteTask = (id) => {
    setTasks(
      tasks.filter((item) => item.id !== id)
    );
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }

        return item;
      })
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  const remainingTasks =
    tasks.length - completedTasks;

  return (
    <div className="app">

      <div className="todo-container">

        <h1>📝 To-Do List</h1>

        <p className="subtitle">
          Manage your daily tasks
        </p>

        <div className="input-container">

          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(event) =>
              setTask(event.target.value)
            }
            onKeyDown={handleKeyDown}
          />

          <button
            className="add-button"
            onClick={addTask}
          >
            Add
          </button>

        </div>

        {tasks.length === 0 ? (

          <div className="empty-message">

            <p>No tasks available.</p>

            <span>
              Add your first task above!
            </span>

          </div>

        ) : (

          <ul className="todo-list">

            {tasks.map((item) => (

              <li
                key={item.id}
                className={
                  item.completed
                    ? "todo-item completed"
                    : "todo-item"
                }
              >

                <div className="task-content">

                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() =>
                      toggleTask(item.id)
                    }
                  />

                  <span
                    onClick={() =>
                      toggleTask(item.id)
                    }
                  >
                    {item.text}
                  </span>

                </div>

                <button
                  className="delete-button"
                  onClick={() =>
                    deleteTask(item.id)
                  }
                >
                  Delete
                </button>

              </li>

            ))}

          </ul>

        )}

        <div className="task-summary">

          <span>
            Total: {tasks.length}
          </span>

          <span>
            Completed: {completedTasks}
          </span>

          <span>
            Remaining: {remainingTasks}
          </span>

        </div>

      </div>

    </div>
  );
}

export default App;