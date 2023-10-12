export function clockFormatter(time: Date) {
    return (
        time.getHours() +
        ":" +
        (time.getMinutes() < 10 ? "0" : "") +
        time.getMinutes()
    );
}
