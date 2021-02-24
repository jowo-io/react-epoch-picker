/**
 * checks if a given value is a number
 *
 * @param {number} num
 */
export default function isNumber(num) {
    return typeof num === "number" && !isNaN(num) && num !== Math.abs(Infinity);
}
