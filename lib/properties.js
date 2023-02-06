export const generateKey = (key) => {
        if (typeof (key) != "string") {
            return "axon" + key.toString()
        } else {
            return key
        }
    }

// * Converts hex code into string via percent encoding
export const colorToString = (color) => {
    let colorAsString = [];
    color.forEach(char => {
        if (char == "#") {
            colorAsString.push("%23") // '%23' is the percent encoding for a hash '#'
        } else {
            colorAsString.push(char)
        }
    });
    return colorAsString.join("")
}

// * Retrieves the most recent task id and increment it by 1
export const generateTaskId = (task) => {
    let taskId;
    task = task.split("");
    for (let i = 0; i < 5; i++) {
        task.splice(0, 1);
    }
    taskId = (parseInt(task.join("")) + 1).toString();
    return taskId;
}