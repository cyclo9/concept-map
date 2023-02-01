import { useState, useEffect, useContext } from "react"
import styles from "../styles/popup.module.css"
import { nodeKey } from "./Diagram";

export default function Popup(props) {
    const [id, setId] = useState("");
    const [label, setLabel] = useState("");

    useEffect(() => {
        try {
            setId(props.node.key)
            setLabel(props.node.label)
        } catch (e) {}
    }, [props.node])
    

    return (
        <>
            <div className={styles.superposition}>
                <div className={styles.popup}>
                    <button className={styles.close} type="button" onClick={props.handlePopup}>
                        <svg height="48" width="48">
                            <path d="M12.45 38.7 9.3 35.55 20.85 24 9.3 12.5l3.15-3.2L24 20.8 35.55 9.3l3.15 3.2L27.2 24l11.5 11.55-3.15 3.15L24 27.2Z" />
                        </svg>
                    </button>
                    
                    <div className={styles.node}>
                        {/* TODO: Name of the node */}
                        <h1>{props.node}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}