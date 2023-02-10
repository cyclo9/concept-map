import ReactLoading from "react-loading";
import styles from "../styles/loading.module.css"

export default function Loading(props: any) {
    return (
        <>
            <div className={styles.centerbox}>
                <ReactLoading type={"spin"} color={props.color == "#ffffff" ? "#333333" : props.color} />
            </div>
        </>
    )
}