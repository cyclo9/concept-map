import { useState, useEffect, useRef, forwardRef } from "react"

import styles from "./popup.module.css"
import Document from "@/components/Document/Document.js";
import Tasklist from "@/components/Task/Tasklist.js";

export default function Popup({ node, handlePopup }) {
    const id = node.key;
    const label = node.label;
    const color = node.color
    const colorRef = useRef(null);

    useEffect(() => {
        colorRef.current.style.backgroundColor = color;
    })

    const [tab, setTab] = useState('DATA')

    return (
        <>
            <Layout>
                <button className={styles.close} type="button" onClick={handlePopup}>
                    <svg width={40} height={40}>
                        <path d="m10.458 32.625-3.083-3.083L16.917 20l-9.542-9.542 3.083-3.083 9.542 9.5 9.542-9.5 3.083 3.083L23.083 20l9.542 9.542-3.083 3.083L20 23.083Z"/>
                    </svg>
                </button>

                <Label children={label} ref={colorRef} />

                <TabList
                    tab={tab}
                    setTab={setTab}
                    color={color}
                />

                {
                    tab == 'DATA' &&
                        <DocumentWrapper>
                            <Document nodeId={id} color={color} />
                        </DocumentWrapper>
                }

                {
                    tab == 'TASKS' &&
                        <TasksWrapper>
                            <Tasklist nodeId={id} color={color} />
                        </TasksWrapper>
                }
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

// * ##### TAB LIST #####
const TabList = ({ tab, setTab, color }) => {
    const data = useRef(null)
    const tasks = useRef(null)

    useEffect(() => {
        switch (tab) {
            case 'DATA':
                data.current.style.backgroundColor = color != '#ffffff' ? color : 'lightgray'
                tasks.current.style.backgroundColor = 'white'
                break
            
            case 'TASKS':
                data.current.style.backgroundColor = 'white'
                tasks.current.style.backgroundColor = color != '#ffffff' ? color : 'lightgray'
                break
        }
    }, [tab])
    
    function switchToData() {
        if (tab != 'DATA') setTab('DATA')
    }

    function switchToTasks() {
        if (tab != 'TASKS') setTab('TASKS')
    }

    return (
        <>
            <div className={styles.tablist}>
                <div ref={data} className={styles.tabs} onClick={switchToData}>
                    <h2>Data</h2>
                </div>
                <div ref={tasks} className={styles.tabs} onClick={switchToTasks}>
                    <h2>Tasks</h2>
                </div>
            </div>
        </>
    )
}

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