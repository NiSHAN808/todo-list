
import React, { useState, useEffect, useRef } from "react";
import './TodoApp.css';
import dustbeen from './dustbeen.webp';
function TodoApp() {
    let inputref = useRef(null);
    let [tasks, setTask] = useState([{ tak: "Exercise", status: "true" }]);
    let ls = useRef(JSON.parse(localStorage.getItem("tasks")));





    useEffect(() => {
        if (ls.current != null) {
            setTask(ls.current);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);





    function handleAddBtn() {

        let x = inputref.current.value;
        let newtask = { tak: x, status: true };
        setTask(t => [...t, newtask]);
        inputref.current.value = "";
    }
    function handleDelBtn(i) {
        let x = 0;
        setTask(tasks.filter((_, index) => i !== index));

    }
    function handleStatusChange(i) {
        const updatedTasks = tasks.map((task, index) =>
            index === i ? { ...task, status: !task.status } : task
        );
        setTask(updatedTasks);
    }






    return (<>
        <div className="todo-app">
            <h1>Todo App</h1>
            <div className="input-area">
                <input ref={inputref} type="text" placeholder="Enter the task"></input>
                <button onClick={handleAddBtn}>add</button>
            </div>
            <div className="task-list">
                <ul>

                    {tasks.map((task, index) => (
                        <li className="list" key={index}>
                            <span className="parent-of-status-and-task">
                                <span className="status-box" onClick={() => handleStatusChange(index)}>{task.status ? "" : ("✓")}</span>
                                <span style={task.status ? {} : { textDecoration: "line-through" }} >  {task.tak}
                                </span>
                            </span>
                            <span className="delete-box" onClick={() => handleDelBtn(index)} ><img src={dustbeen} />
                            </span>
                        </li>
                    ))
                    }
                </ul>

            </div>
        </div>
    </>)
}
export default TodoApp