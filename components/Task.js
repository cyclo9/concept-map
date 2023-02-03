import { useEffect, useState } from "react";
import styles from "../styles/task.module.css";

export default function Task(props) {
    const [checked, setChecked] = useState(props.status);
    const [taskName, setTaskName] = useState(props.data);

    function handleCheckboxChange(e) {
        switch (checked) {
            case 0:
                setChecked(1);
                break;
            case 1:
                setChecked(0);
                break;
        }
    }
    
    function handleInputChange(e) {
        setTaskName(e.target.value);
    }

    return (
        <>
            <div className={styles.box}>
                <div style={{display: "flex", alignContent: "center"}}>
                    <input
                        type="checkbox"
                        value={0}
                        checked={checked == 1}
                        onChange={handleCheckboxChange}
                    />
                    <input
                        className={styles.taskName}
                        type="text"
                        value={taskName}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </>
    )
}