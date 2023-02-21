import { useEffect, useRef, forwardRef } from "react"

import styles from "./popup.module.css"
import Document from "@/components/Document/Document.js";
import Tasklist from "@/components/Task/Tasklist.js";

export default function Popup(props) {
    const id = props.node.key;
    const label = props.node.label;
    const color = useRef(null);

    useEffect(() => {
        color.current.style.backgroundColor = props.node.color;
    })

    return (
        <>
            <Layout>
                <button className={styles.close} type="button" onClick={props.handlePopup}>
                    <svg width={40} height={40}>
                        <path d="m10.458 32.625-3.083-3.083L16.917 20l-9.542-9.542 3.083-3.083 9.542 9.5 9.542-9.5 3.083 3.083L23.083 20l9.542 9.542-3.083 3.083L20 23.083Z"/>
                    </svg>
                </button>

                <Label children={label} ref={color} />

                <h2 style={{textAlign: 'center'}}>Data</h2>
                <h2 style={{ textAlign: 'center' }}>Tasks</h2>

                <DocumentWrapper>
                    <Document nodeId={id} color={props.node.color} />
                </DocumentWrapper>

                <TasksWrapper>
                    <Tasklist nodeId={id} color={props.node.color} />
                </TasksWrapper>
            </Layout>
        </>
    )
}

// * ##### POPUP LAYOUT #####
const Layout = ({ children } ) => {
    return (
        <>
            <div className={styles.superposition}>
                <div className={styles.popup}>
                    {children}
                </div>
            </div>
        </>
    )
}

// * ##### LABEL #####
const Label = forwardRef(({ children }, ref) => {
    return <h1 ref={ref} className={styles.label}>{children}</h1>
})

// * ##### DOCUMENT LAYOUT  #####
const DocumentWrapper = ({ children }) => {
    return (
        <>
            <div className={styles.documentWrapper}>
                {children}
            </div>
        </>
    )
}

// * ##### TASK LAYOUT #####
const TasksWrapper = ({ children }) => {
    return (
        <>
            <div className={styles.tasksWrapper}>
                {children}
            </div>
        </>
    )
}