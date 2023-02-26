import { useState, useEffect } from "react";

import TaskItem from './TaskItem'
import { updateTasks } from "../../lib/api";
import { generateId } from "../../lib/id";
import Loading from "@/components/Loading/Loading.js";
import styles from './tasklist.module.css'

const Tasklist = ({ nodeId, color }) => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/tasks?id=${nodeId}`, {
            method: 'GET',
            cache: 'default',
        })
            .then((res) => res.json())
            .then((data) => {
                setTasks(data)
                setLoading(false)
            })
    }, [])
    
    // * ### Create Tasks ###
    function createTask() {
        if (!isLoading) {
            const newId = generateId(Math.pow(2, 8));
            const newTask = {
                id: newId,
                data: "",
                status: 0
            }
            setTasks([newTask, ...tasks]);

            updateTasks(nodeId, [newTask, ...tasks]);
            console.log("+! T:", { id: newId });
        }
    }

    // * ### Update Task Data ###
    function updateTaskData(taskId, taskData) {
        const tasksCopy = tasks;
        for (let i = 0; i < tasksCopy.length; i++) {
            if (tasksCopy[i].id == taskId) {
                tasksCopy[i].data = taskData;
            }
        }
        setTasks([...tasksCopy]);

        updateTasks(nodeId, [...tasksCopy]);
        console.log("*! T:", { id: taskId })
    }

    // * ### Update Task Status ###
    function updateTaskStatus(taskId) {
        const tasksCopy = tasks;
        for (let i = 0; i < tasksCopy.length; i++) {
            if (tasksCopy[i].id == taskId) {
                switch (tasksCopy[i].status) {
                    case 0:
                        tasksCopy[i].status = 1
                        break;
                    case 1:
                        tasksCopy[i].status = 0
                        break;
                }
            }
        }
        setTasks([...tasksCopy]);

        updateTasks(nodeId, [...tasksCopy]);
        console.log("U-T:", { id: taskId });
    }

    // * ### Delete Tasks ###
    function deleteTask(taskId) {
        const tasksCopy = tasks;
        for (let i = 0; i < tasksCopy.length; i++) {
            if (tasksCopy[i].id == taskId) {
                tasksCopy.splice(i, 1);
            }
        }
        setTasks([...tasksCopy]);
        
        updateTasks(nodeId, [...tasksCopy]);
        console.log("-! T:", { id: taskId });
    }

    return (
        <>
            <div>
                <div className={styles.addWrapper}>
                    <button className={styles.add} type="button" onClick={createTask}>
                        <svg width={24} height={24}>
                            <path d="M10.425 19.575v-6h-6v-3.15h6v-6h3.15v6h6v3.15h-6v6Z"/>
                        </svg>
                    </button>
                </div>
                {!isLoading ? <div className={styles.tasksGrid}>
                    {
                        tasks.map((task) => <TaskItem
                            key={task.id}
                            id={task.id}
                            data={task.data}
                            status={task.status}
                            updateTaskData={updateTaskData}
                            updateTaskStatus={updateTaskStatus}
                            deleteTask={deleteTask}
                        />)
                    }
                </div> : <Loading color={color} />}
            </div>
        </>
    )
}
export default Tasklist