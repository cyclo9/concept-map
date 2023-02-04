import { useState, useEffect, useRef } from "react"
import styles from "../styles/popup.module.css"
import Task from "./Task";

export default function Popup(props) {
    const id = useRef("");
    const [label, setLabel] = useState("");
    const [tasks, setTasks] = useState([]);

    useEffect(
        () => {
            id.current = props.node.key;
            setLabel(props.node.label);
            setTasks(props.node.tasks);
        }, [props] // Runs only when props change
    )
    return (
        <>
            <div className={styles.superposition}>
                <div className={styles.popup}>
                    {/* // * ### Close Button ### */}
                    <button className={styles.close} type="button" onClick={props.handlePopup}>
                        <svg height="48" width="48">
                            <path d="M12.45 38.7 9.3 35.55 20.85 24 9.3 12.5l3.15-3.2L24 20.8 35.55 9.3l3.15 3.2L27.2 24l11.5 11.55-3.15 3.15L24 27.2Z" />
                        </svg>
                    </button>
                    
                    {/* // * ### Cool Node Label ### */}
                    <div className={styles.node}>
                        <h1>{label}</h1>
                    </div>

                    <div className={styles.grid}>
                        {/* // * ### Entries ### */}
                        <div className={styles.io} style={{borderRight: "2px solid black"}}>
                            <span>Entries</span>
                        </div>
                        {/* //* ### Tasks ### */}
                        <div className={styles.io} style={{borderLeft: "2px solid black"}}>
                            <span>Tasks</span>
                            {tasks.map((task) =>
                                <Task
                                    key={task.id}
                                    data={task.data}
                                    status={task.status}
                                />)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}