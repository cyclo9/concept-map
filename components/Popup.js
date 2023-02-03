import { useState, useEffect, useRef, useContext } from "react"
import styles from "../styles/popup.module.css"

import { NodeDataContext } from "../pages";

export default function Popup(props) {
    const background = useRef(null);
    const nodeData = useContext(NodeDataContext);

    const id = useRef("");
    const [label, setLabel] = useState("");
    const [entries, setEntries] = useState([]);
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        try {
            id.current = props.node.key;
            setLabel(props.node.label);
        } catch (e) { }
        
        retrieveTasks();
        handleBackground();
    }, [props])

    function handleBackground() {
        switch (props.status) {
            case 0:
                background.current.style.backgroundColor = "#00000099";
                break;
            case 1:
                background.current.style.backgroundColor = "#ffffff";
                break;
        }
    }

    function retrieveTasks() {
        for (let i = 0; i < nodeData.length; i++) {
            if (nodeData[i].id == id.current) {
                setTasks(nodeData[i].tasks);
            }
        }
    }
    
    return (
        <>
            <div ref={background} className={styles.superposition}>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}