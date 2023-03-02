export function calcMaxScrollTop(scrollHeight, clientHeight) {
    return scrollHeight - clientHeight
}

export function calcScaledScrollTop(scrollTop, maxScrollTopA, maxScrollTopB) {
    return scrollTop / maxScrollTopA * maxScrollTopB
}