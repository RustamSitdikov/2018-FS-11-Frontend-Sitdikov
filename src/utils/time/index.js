export default function getTime(date) {
    return [
        date.getHours(),
        date.getMinutes(),
    ].map(num => (num < 10 ? `0${num}` : num)).join(':');
}
