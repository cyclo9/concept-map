import { useEffect, useState, useRef } from "react";
import styles from "./taskitem.module.css";

export default function TaskItem(props) {
    const [status, setStatus] = useState(props.status);
    const [taskData, setTaskData] = useState(props.data);

    const [isSaved, setSaved] = useState(true);
    const boxRef = useRef(null)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    useEffect(() => {
        if (isSaved) boxRef.current.style.borderColor = 'black'
        if (!isSaved) boxRef.current.style.borderColor = '#87cefa'
    }, [isSaved])

    // handles local state change
    function updateInputValue(e) {
        setSaved(false)
        setTaskData(e.target.value);
    }

    function updateStatus(e) {
        props.updateTaskStatus(props.id)
    }
    

    // Task data will only be uploaded with the Enter key (keyCode = 13) is pressed
    function updateTaskData(e) {
        e.keyCode === 13 && props.updateTaskData(props.id, taskData)
        setSaved(true)
    }

    function deleteTask(e) {
        props.deleteTask(props.id);
    }

    return (
        <>
            <div className={styles.task}>
                <div ref={boxRef} className={styles.box}>
                    <div style={{display: "flex", alignContent: "center"}}>
                        <input
                            type="checkbox"
                            value={status}
                            checked={status == 1}
                            onChange={updateStatus}
                        />
                        <input
                            className={styles.taskName}
                            type="text"
                            value={taskData}
                            onChange={updateInputValue}
                            onKeyDown={updateTaskData}
                        />
                    </div>
                </div>
                <div className={styles.deleteWrapper}>
                    <button className={styles.delete} onClick={deleteTask}>
                        <svg width={24} height={24}>
                            <path xmlns="http://www.w3.org/2000/svg" d="M6.9 21.8q-1.125 0-1.887-.762-.763-.763-.763-1.888V5.9h-1V3.25h5.7v-1.2h6.15v1.2h5.7V5.9h-1v13.25q0 1.1-.775 1.875-.775.775-1.875.775ZM17.15 5.9H6.9v13.25h10.25ZM8.475 17.125h2.65v-9.2h-2.65Zm4.45 0h2.65v-9.2h-2.65ZM6.9 5.9v13.25Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}