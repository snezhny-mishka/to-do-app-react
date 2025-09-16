import { useState, useEffect } from "react";
import List from "./List.jsx";
import Button from "./Button.jsx";

function ListsContainer() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ id: null, text: "", completed: false });

    function handleInputChange(e) {
        setNewTask((prev) => ({ ...prev, text: e.target.value }));
    }

    function addTask() {
        if (newTask.text.trim() === "") return;
        setTasks((prevTasks) => [...prevTasks, { ...newTask, id: crypto.randomUUID() }]);
        setNewTask({ id: null, text: "", completed: false });
    }

    function updateTask(id, newText) {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
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

    function moveUp(id) {
        setTasks((prev) => {
            const index = prev.findIndex((task) => task.id === id);
            if (index === -1) return prev;

            const updatedTask = [...prev];
            [updatedTask[index], updatedTask[index - 1]] = [
                updatedTask[index - 1],
                updatedTask[index],
            ];
            return updatedTask;
        });
    }

    function moveDown(id) {
        setTasks((prev) => {
            const index = prev.findIndex((task) => task.id === id);
            if (index === -1 || index >= prev.length - 1) return prev;

            const updatedTask = [...prev];
            [updatedTask[index], updatedTask[index + 1]] = [
                updatedTask[index + 1],
                updatedTask[index],
            ];
            return updatedTask;
        });
    }

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
        <div className="flex flex-col gap-4 bg-lime-300 p-8 rounded-2xl w-3/4">
            <div className="flex justify-center items-center">
                <label htmlFor="input" className="font-molengo text-xl">
                    New task:
                </label>
                <input
                    id="input"
                    type="text"
                    placeholder="Enter a task"
                    value={newTask.text}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") addTask();
                    }}
                    className="bg-gray-50 rounded-md h-10"
                />
                <Button text="Add" onClick={addTask} />
            </div>

            <div className="flex gap-4">
                <List
                    title="To Do:"
                    tasks={tasks.filter((task) => task.completed === false)}
                    onUpdate={updateTask}
                    onDelete={deleteTask}
                    onChecked={toggleChecked}
                    onMoveUp={moveUp}
                    onMoveDown={moveDown}
                />
                <List
                    title="Done:"
                    tasks={tasks.filter((task) => task.completed === true)}
                    onUpdate={updateTask}
                    onDelete={deleteTask}
                    onChecked={toggleChecked}
                />
            </div>
        </div>
    );
}

export default ListsContainer;
