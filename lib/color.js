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