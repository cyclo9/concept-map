export function generateId(weight) {
    const n = Math.pow(2, 32);
    const timestamp = Date.now();

    const a = ((timestamp * weight) % n); // timestamp * seed mod(n)
    return timestamp.toString(16) + a.toString(16); // "timestamp" + "a"
}