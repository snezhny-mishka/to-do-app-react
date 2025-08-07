import React, { useState, useEffect } from "react";
import ListType from "./ListType.jsx"
import Button from "./Button.jsx"

function List() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ id: null, text: "", completed: false });
    const [isEditing, setIsEditing] = useState(false);

    function handleInputChange(e) {
        setNewTask((prev) => ({ ...prev, text: e.target.value }));
    }

    function addTask() {
        if (newTask.text.trim() === "") return;
        if (isEditing) {
            setTasks(
                tasks.map((task) =>
                    task.id === newTask.id ? { ...task, text: newTask.text } : task
                )
            );
            setIsEditing(false);
        } else {
            setTasks((prevTasks) => [
                ...prevTasks,
                { ...newTask, id: Date.now().toString().slice(6) },
            ]);
        }
        setNewTask({ id: null, text: "", completed: false });
    }

    function toggleChecked(id) {
        setTasks(
            tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
        );
    }

    function deleteTask(id) {
        const currTasks = tasks.filter((task) => task.id !== id);
        setTasks(currTasks);
    }

    function editTask(id) {
        const taskToEdit = tasks.find((el) => el.id === id);
        setNewTask(taskToEdit);
        setIsEditing(true);
    }

    const tasksToDo = tasks.filter((task) => task.completed === false);
    const tasksDone = tasks.filter((task) => task.completed === true);

    // ---STORAGE---
    // Load tasks from local storage on startup
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    // Update local storage when a task is changed
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div>
            <h1>New task:</h1>
            <input
                type="text"
                placeholder="Enter a task"
                value={newTask.text}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                    if (e.key === "Enter") addTask();
                }}
            />
            {/* <button onClick={addTask}>{isEditing ? "Save" : "Add"}</button> */}
            <Button 
                text={isEditing ? "Save" : "Add"}
                onClick={addTask}
                variant="default"
            />
            {/* <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input type="checkbox" onChange={() => toggleChecked(task.id)} />
                        <span
                            className="task-text"
                            style={{ textDecoration: task.completed ? "line-through" : "none" }}
                        >
                            Id: {task.id} Text: {task.text}
                        </span>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                        <button onClick={() => editTask(task.id)}>Edit</button>
                    </li>
                ))}
            </ul> */}
            <ListType
                title="To Do:"
                tasks={tasksToDo}
                onDelete={deleteTask}
                onEdit={editTask}
                onChecked={toggleChecked}
                showEdit={true}
            />
            <ListType
                title="Done"
                tasks={tasksDone}
                onDelete={deleteTask}
                onChecked={toggleChecked}
                showEdit={false}
            />
        </div>
    );
}

export default List;

