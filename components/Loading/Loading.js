import ReactLoading from "react-loading";
import styles from "./loading.module.css"

const Loading = ({ color }) => {
    return (
        <>
            <div className={styles.centerbox}>
                <ReactLoading type={"spin"} color={color == "#ffffff" ? "#333333" : color} />
            </div>
        </>
    )
}
export default Loading